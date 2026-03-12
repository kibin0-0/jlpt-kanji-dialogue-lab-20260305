import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const rootDir = resolve(import.meta.dirname, "..");
const datasetPath = resolve(rootDir, "data", "jlpt-kanji-lab.json");
const outputPath = resolve(rootDir, "supabase", "seed.sql");

const dataset = JSON.parse(readFileSync(datasetPath, "utf8"));

function quote(value) {
  if (value === null || value === undefined) {
    return "null";
  }

  return `'${String(value).replaceAll("'", "''")}'`;
}

function buildInsert(table, columns, rows, conflictClause) {
  const valueRows = rows.map((row) => {
    const values = columns.map((column) => quote(row[column]));
    return `  (${values.join(", ")})`;
  });

  return [
    `insert into ${table} (${columns.join(", ")})`,
    "values",
    `${valueRows.join(",\n")}`,
    conflictClause,
    ";",
  ].join("\n");
}

const dialogueRows = dataset.dialogues.map((dialogue, index) => ({
  slug: dialogue.id,
  title: dialogue.title,
  jlpt_level: dialogue.level,
  context_ko: dialogue.context,
  sort_order: index + 1,
}));

const termRows = dataset.terms.map((term) => ({
  term: term.term,
  reading: term.reading,
  meaning_ko: term.meaningKo,
  jlpt_level: term.level,
  example_jp: term.exampleJp,
  example_ko: term.exampleKo,
}));

const lineRows = [];
const lineTermRows = [];

for (const dialogue of dataset.dialogues) {
  dialogue.lines.forEach((line, lineIndex) => {
    lineRows.push({
      dialogue_slug: dialogue.id,
      line_order: lineIndex + 1,
      speaker: line.speaker,
      jp: line.jp,
      ruby_html: line.ruby,
      ko: line.ko,
    });

    line.terms.forEach((term, termIndex) => {
      lineTermRows.push({
        dialogue_slug: dialogue.id,
        line_order: lineIndex + 1,
        term,
        sort_order: termIndex + 1,
      });
    });
  });
}

const sql = [
  "-- Generated from data/jlpt-kanji-lab.json",
  "begin;",
  "",
  "delete from dialogue_line_terms;",
  "delete from dialogue_lines;",
  "delete from dialogues;",
  "delete from terms;",
  "",
  buildInsert(
    "terms",
    ["term", "reading", "meaning_ko", "jlpt_level", "example_jp", "example_ko"],
    termRows,
    "on conflict (term) do update set reading = excluded.reading, meaning_ko = excluded.meaning_ko, jlpt_level = excluded.jlpt_level, example_jp = excluded.example_jp, example_ko = excluded.example_ko"
  ),
  "",
  buildInsert(
    "dialogues",
    ["slug", "title", "jlpt_level", "context_ko", "sort_order"],
    dialogueRows,
    "on conflict (slug) do update set title = excluded.title, jlpt_level = excluded.jlpt_level, context_ko = excluded.context_ko, sort_order = excluded.sort_order"
  ),
  "",
  buildInsert(
    "dialogue_lines",
    ["dialogue_slug", "line_order", "speaker", "jp", "ruby_html", "ko"],
    lineRows,
    "on conflict (dialogue_slug, line_order) do update set speaker = excluded.speaker, jp = excluded.jp, ruby_html = excluded.ruby_html, ko = excluded.ko"
  ),
  "",
  buildInsert(
    "dialogue_line_terms",
    ["dialogue_slug", "line_order", "term", "sort_order"],
    lineTermRows,
    "on conflict (dialogue_slug, line_order, term) do update set sort_order = excluded.sort_order"
  ),
  "",
  "commit;",
  "",
].join("\n");

writeFileSync(outputPath, sql, "utf8");
