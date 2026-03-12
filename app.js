const MASTERED_KEY = "jlpt-kanji-lab-mastered";
const SUPABASE_CONFIG_KEY = "jlpt-kanji-lab-supabase-config";
const SEED_DATA_PATH = "./data/jlpt-kanji-lab.json";
const DEFAULT_SUPABASE_URL =
  (globalThis.APP_CONFIG?.supabaseUrl || "https://tseonpoefmpyzsrjklww.supabase.co").replace(/\/+$/, "");

const sceneListEl = document.getElementById("sceneList");
const kanjiListEl = document.getElementById("kanjiList");
const kanjiCountEl = document.getElementById("kanjiCount");
const statSummaryEl = document.getElementById("statSummary");
const meterFillEl = document.getElementById("meterFill");
const levelFilterEl = document.getElementById("levelFilter");
const searchInputEl = document.getElementById("searchInput");
const furiganaToggleEl = document.getElementById("furiganaToggle");
const translationToggleEl = document.getElementById("translationToggle");
const shuffleBtnEl = document.getElementById("shuffleBtn");
const newQuizBtnEl = document.getElementById("newQuizBtn");
const quizQuestionEl = document.getElementById("quizQuestion");
const quizOptionsEl = document.getElementById("quizOptions");
const quizFeedbackEl = document.getElementById("quizFeedback");
const projectUrlInputEl = document.getElementById("projectUrlInput");
const anonKeyInputEl = document.getElementById("anonKeyInput");
const connectBtnEl = document.getElementById("connectBtn");
const reloadDbBtnEl = document.getElementById("reloadDbBtn");
const clearKeyBtnEl = document.getElementById("clearKeyBtn");
const connectionStatusEl = document.getElementById("connectionStatus");

const state = {
  level: "ALL",
  search: "",
  showFurigana: true,
  showTranslation: true,
  focusSceneId: null,
  mastered: loadMasteredTerms(),
  quiz: null,
  dialogues: [],
  glossary: {},
  dataSource: "loading",
};

let loadSequence = 0;

function safeParseJson(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function loadMasteredTerms() {
  try {
    const raw = localStorage.getItem(MASTERED_KEY);
    const parsed = raw ? safeParseJson(raw, []) : [];
    return new Set(Array.isArray(parsed) ? parsed : []);
  } catch {
    return new Set();
  }
}

function persistMasteredTerms() {
  try {
    localStorage.setItem(MASTERED_KEY, JSON.stringify([...state.mastered]));
  } catch {
    // Local storage can fail in private contexts; the UI still works without persistence.
  }
}

function normalizeUrl(value) {
  return (value || DEFAULT_SUPABASE_URL).trim().replace(/\/+$/, "");
}

function loadConnectionConfig() {
  const fileConfig = globalThis.APP_CONFIG || {};
  let storedConfig = {};

  try {
    const raw = localStorage.getItem(SUPABASE_CONFIG_KEY);
    storedConfig = raw ? safeParseJson(raw, {}) : {};
  } catch {
    storedConfig = {};
  }

  return {
    supabaseUrl: normalizeUrl(fileConfig.supabaseUrl || DEFAULT_SUPABASE_URL),
    supabaseAnonKey: (storedConfig.supabaseAnonKey || fileConfig.supabaseAnonKey || "").trim(),
  };
}

function persistConnectionConfig(config) {
  try {
    localStorage.setItem(
      SUPABASE_CONFIG_KEY,
      JSON.stringify({
        supabaseAnonKey: (config.supabaseAnonKey || "").trim(),
      })
    );
  } catch {
    // Ignore storage failures and keep the in-memory session usable.
  }
}

function clearConnectionConfig() {
  try {
    localStorage.removeItem(SUPABASE_CONFIG_KEY);
  } catch {
    // Ignore storage failures.
  }
}

function updateConnectionFields(config) {
  projectUrlInputEl.value = config.supabaseUrl;
  anonKeyInputEl.value = config.supabaseAnonKey;
}

function setConnectionControlsDisabled(disabled) {
  connectBtnEl.disabled = disabled;
  reloadDbBtnEl.disabled = disabled;
  clearKeyBtnEl.disabled = disabled;
  anonKeyInputEl.disabled = disabled;
}

function setConnectionStatus(kind, message) {
  connectionStatusEl.dataset.state = kind;
  connectionStatusEl.textContent = message;
}

function buildGlossary(terms) {
  const glossary = {};

  for (const term of terms) {
    glossary[term.term] = {
      reading: term.reading,
      meaning: term.meaningKo ?? term.meaning_ko,
      level: term.level ?? term.jlpt_level,
      example: term.exampleJp ?? term.example_jp,
      exampleKo: term.exampleKo ?? term.example_ko,
    };
  }

  return glossary;
}

function normalizeSeedDataset(dataset) {
  return {
    dialogues: dataset.dialogues.map((dialogue) => ({
      id: dialogue.id,
      title: dialogue.title,
      level: dialogue.level,
      context: dialogue.context,
      lines: dialogue.lines.map((line) => ({
        speaker: line.speaker,
        jp: line.jp,
        ruby: line.ruby,
        ko: line.ko,
        terms: [...line.terms],
      })),
    })),
    glossary: buildGlossary(dataset.terms),
  };
}

function normalizeRemoteDataset(payload) {
  const glossary = buildGlossary(payload.terms);
  const termOrderByLine = new Map();
  const linesByDialogue = new Map();

  for (const row of payload.lineTerms) {
    const key = `${row.dialogue_slug}::${row.line_order}`;
    const terms = termOrderByLine.get(key) || [];
    terms.push(row);
    termOrderByLine.set(key, terms);
  }

  for (const row of payload.lines) {
    const grouped = linesByDialogue.get(row.dialogue_slug) || [];
    grouped.push(row);
    linesByDialogue.set(row.dialogue_slug, grouped);
  }

  const dialogues = [...payload.dialogues]
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((dialogue) => {
      const lineRows = [...(linesByDialogue.get(dialogue.slug) || [])].sort((a, b) => a.line_order - b.line_order);

      return {
        id: dialogue.slug,
        title: dialogue.title,
        level: dialogue.jlpt_level,
        context: dialogue.context_ko,
        lines: lineRows.map((line) => {
          const key = `${line.dialogue_slug}::${line.line_order}`;
          const termRows = [...(termOrderByLine.get(key) || [])].sort((a, b) => a.sort_order - b.sort_order);

          return {
            speaker: line.speaker,
            jp: line.jp,
            ruby: line.ruby_html,
            ko: line.ko,
            terms: termRows.map((item) => item.term).filter((term) => Boolean(glossary[term])),
          };
        }),
      };
    });

  return { dialogues, glossary };
}

async function fetchLocalSeedDataset() {
  const response = await fetch(SEED_DATA_PATH, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`로컬 시드 파일을 읽지 못했습니다. (${response.status})`);
  }

  return normalizeSeedDataset(await response.json());
}

async function fetchSupabaseTable(config, table, params) {
  const url = new URL(`${config.supabaseUrl}/rest/v1/${table}`);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url, {
    headers: {
      apikey: config.supabaseAnonKey,
      Authorization: `Bearer ${config.supabaseAnonKey}`,
      Accept: "application/json",
    },
    cache: "no-store",
  });

  const raw = await response.text();
  if (!response.ok) {
    let message = raw || `${response.status}`;
    try {
      const parsed = JSON.parse(raw);
      message = parsed.message || parsed.error_description || parsed.error || message;
    } catch {
      // Ignore JSON parsing errors and fall back to the raw response text.
    }

    throw new Error(`${table}: ${message}`);
  }

  return raw ? JSON.parse(raw) : [];
}

async function tryFetchSupabaseDataset(config) {
  if (!config.supabaseAnonKey) {
    return {
      kind: "missing-key",
      message: "Supabase anon key가 없어 로컬 시드 데이터를 표시 중입니다. 키를 저장하면 DB를 우선 사용합니다.",
    };
  }

  try {
    const [dialogues, lines, lineTerms, terms] = await Promise.all([
      fetchSupabaseTable(config, "dialogues", {
        select: "slug,title,jlpt_level,context_ko,sort_order",
        order: "sort_order.asc",
      }),
      fetchSupabaseTable(config, "dialogue_lines", {
        select: "dialogue_slug,line_order,speaker,jp,ruby_html,ko",
        order: "dialogue_slug.asc,line_order.asc",
      }),
      fetchSupabaseTable(config, "dialogue_line_terms", {
        select: "dialogue_slug,line_order,term,sort_order",
        order: "dialogue_slug.asc,line_order.asc,sort_order.asc",
      }),
      fetchSupabaseTable(config, "terms", {
        select: "term,reading,meaning_ko,jlpt_level,example_jp,example_ko",
        order: "jlpt_level.asc,term.asc",
      }),
    ]);

    if (!dialogues.length || !terms.length) {
      return {
        kind: "empty",
        message: "Supabase 연결은 되었지만 테이블이 비어 있습니다. schema.sql과 seed.sql을 먼저 적용하세요.",
      };
    }

    return {
      kind: "remote",
      message: `Supabase DB에서 ${dialogues.length}개 대화와 ${terms.length}개 단어를 불러왔습니다.`,
      data: normalizeRemoteDataset({ dialogues, lines, lineTerms, terms }),
    };
  } catch (error) {
    return {
      kind: "error",
      message: `Supabase 조회 실패: ${error.message}`,
    };
  }
}

function applyDataset(dataset, source) {
  state.dialogues = dataset.dialogues;
  state.glossary = dataset.glossary;
  state.dataSource = source;
  state.focusSceneId = null;
  state.quiz = null;
  updateUI();
}

function getSourceLabel() {
  return state.dataSource === "remote" ? "Supabase DB" : "로컬 시드";
}

function uniqueTermsFromScenes(scenes) {
  const bucket = new Set();

  for (const scene of scenes) {
    for (const line of scene.lines) {
      for (const term of line.terms) {
        if (state.glossary[term]) {
          bucket.add(term);
        }
      }
    }
  }

  return [...bucket];
}

function shuffleArray(input) {
  const copy = [...input];

  for (let i = copy.length - 1; i > 0; i -= 1) {
    const pick = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[pick]] = [copy[pick], copy[i]];
  }

  return copy;
}

function termMatchesQuery(term, query) {
  const info = state.glossary[term];
  const target = [term, info?.reading, info?.meaning, info?.example, info?.exampleKo]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return target.includes(query);
}

function getFilteredScenes() {
  const query = state.search.trim().toLowerCase();
  let scenes = state.dialogues.filter((scene) => {
    if (state.level === "ALL") return true;
    return scene.level === state.level;
  });

  if (query) {
    scenes = scenes.filter((scene) => {
      const sceneTarget = `${scene.title} ${scene.context}`.toLowerCase();
      if (sceneTarget.includes(query)) return true;

      return scene.lines.some((line) => {
        const lineTarget = `${line.speaker} ${line.jp} ${line.ko}`.toLowerCase();
        if (lineTarget.includes(query)) return true;
        return line.terms.some((term) => termMatchesQuery(term, query));
      });
    });
  }

  if (state.focusSceneId) {
    const index = scenes.findIndex((scene) => scene.id === state.focusSceneId);
    if (index >= 0) {
      const [focused] = scenes.splice(index, 1);
      scenes.unshift(focused);
    }
  }

  return scenes;
}

function renderScenes(scenes) {
  sceneListEl.innerHTML = "";

  if (scenes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "조건에 맞는 대화가 없습니다.";
    sceneListEl.appendChild(empty);
    return;
  }

  for (const scene of scenes) {
    const card = document.createElement("article");
    card.className = "scene-card";

    const head = document.createElement("div");
    head.className = "scene-head";

    const title = document.createElement("h2");
    title.className = "scene-title";
    title.textContent = scene.title;

    const badge = document.createElement("span");
    badge.className = `badge ${scene.level.toLowerCase()}`;
    badge.textContent = scene.level;

    head.append(title, badge);

    const context = document.createElement("p");
    context.className = "scene-context";
    context.textContent = scene.context;

    card.append(head, context);

    for (const line of scene.lines) {
      const row = document.createElement("div");
      row.className = "line-item";

      const speaker = document.createElement("div");
      speaker.className = "speaker";
      speaker.textContent = line.speaker;

      const jp = document.createElement("div");
      jp.className = "jp";
      if (state.showFurigana) {
        jp.innerHTML = line.ruby;
      } else {
        jp.textContent = line.jp;
      }

      row.append(speaker, jp);

      if (state.showTranslation) {
        const kr = document.createElement("div");
        kr.className = "kr";
        kr.textContent = line.ko;
        row.appendChild(kr);
      }

      const chips = document.createElement("div");
      chips.className = "term-chips";

      for (const term of line.terms) {
        const info = state.glossary[term];
        if (!info) continue;

        const chip = document.createElement("span");
        chip.className = `term-chip ${info.level.toLowerCase()}`;
        chip.textContent = `${term} (${info.reading})`;
        chips.appendChild(chip);
      }

      row.appendChild(chips);
      card.appendChild(row);
    }

    sceneListEl.appendChild(card);
  }
}

function renderKanjiList(terms) {
  kanjiListEl.innerHTML = "";

  const sorted = [...terms].sort((left, right) => {
    const leftLevel = state.glossary[left]?.level || "Z";
    const rightLevel = state.glossary[right]?.level || "Z";
    const levelDiff = leftLevel.localeCompare(rightLevel);
    if (levelDiff !== 0) return levelDiff;
    return left.localeCompare(right, "ja");
  });

  kanjiCountEl.textContent = `${sorted.length}개`;

  if (!sorted.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "표시 중인 단어가 없습니다.";
    kanjiListEl.appendChild(empty);
    return;
  }

  for (const term of sorted) {
    const info = state.glossary[term];
    if (!info) continue;

    const wrap = document.createElement("article");
    wrap.className = "kanji-item";

    const main = document.createElement("div");
    main.className = "kanji-main";

    const char = document.createElement("span");
    char.className = "kanji-char";
    char.textContent = term;

    const level = document.createElement("span");
    level.className = `kanji-level ${info.level.toLowerCase()}`;
    level.textContent = info.level;
    main.append(char, level);

    const meta = document.createElement("div");
    meta.className = "kanji-meta";
    meta.textContent = `${info.reading} · ${info.meaning}`;

    const example = document.createElement("div");
    example.className = "kanji-example";
    example.textContent = `예문: ${info.example}`;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "master-btn";
    const done = state.mastered.has(term);
    if (done) button.classList.add("done");
    button.textContent = done ? "학습 완료됨" : "학습 완료로 체크";
    button.addEventListener("click", () => {
      if (state.mastered.has(term)) {
        state.mastered.delete(term);
      } else {
        state.mastered.add(term);
      }
      persistMasteredTerms();
      updateUI();
    });

    wrap.append(main, meta, example, button);
    kanjiListEl.appendChild(wrap);
  }
}

function renderStats(visibleTerms) {
  if (!visibleTerms.length) {
    statSummaryEl.textContent = `표시 중인 단어가 없습니다. · ${getSourceLabel()}`;
    meterFillEl.style.width = "0%";
    return;
  }

  const masteredCount = visibleTerms.filter((term) => state.mastered.has(term)).length;
  const percent = Math.round((masteredCount / visibleTerms.length) * 100);
  statSummaryEl.textContent = `완료 ${masteredCount} / ${visibleTerms.length} (${percent}%) · ${getSourceLabel()}`;
  meterFillEl.style.width = `${percent}%`;
}

function buildQuiz(visibleTerms) {
  const pool = visibleTerms.length >= 4 ? visibleTerms : Object.keys(state.glossary);
  if (pool.length < 4) {
    state.quiz = null;
    return;
  }

  const answerTerm = pool[Math.floor(Math.random() * pool.length)];
  const answerInfo = state.glossary[answerTerm];
  const distractors = shuffleArray(pool.filter((term) => term !== answerTerm))
    .filter((term) => state.glossary[term])
    .slice(0, 3)
    .map((term) => state.glossary[term].meaning);
  const options = shuffleArray([answerInfo.meaning, ...distractors]);

  state.quiz = {
    term: answerTerm,
    reading: answerInfo.reading,
    answer: answerInfo.meaning,
    options,
    example: answerInfo.example,
    chosen: null,
  };
}

function renderQuiz() {
  quizOptionsEl.innerHTML = "";
  quizFeedbackEl.textContent = "";
  quizFeedbackEl.className = "quiz-feedback";

  if (!state.quiz) {
    quizQuestionEl.textContent = "퀴즈를 만들 수 있는 단어가 아직 충분하지 않습니다.";
    return;
  }

  quizQuestionEl.textContent = `「${state.quiz.term}」 (${state.quiz.reading})의 뜻은?`;

  for (const option of state.quiz.options) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.disabled = state.quiz.chosen !== null;
    button.addEventListener("click", () => handleQuizAnswer(option));
    quizOptionsEl.appendChild(button);
  }
}

function handleQuizAnswer(chosen) {
  if (!state.quiz || state.quiz.chosen !== null) return;

  state.quiz.chosen = chosen;
  const isCorrect = chosen === state.quiz.answer;
  const optionButtons = [...quizOptionsEl.querySelectorAll(".quiz-option")];

  for (const button of optionButtons) {
    if (button.textContent === state.quiz.answer) {
      button.classList.add("correct");
    } else if (button.textContent === chosen) {
      button.classList.add("wrong");
    }
    button.disabled = true;
  }

  if (isCorrect) {
    quizFeedbackEl.textContent = `정답입니다. 예문: ${state.quiz.example}`;
    quizFeedbackEl.classList.add("ok");
  } else {
    quizFeedbackEl.textContent = `오답입니다. 정답은 "${state.quiz.answer}"입니다. 예문: ${state.quiz.example}`;
    quizFeedbackEl.classList.add("bad");
  }
}

function updateLevelFilterUi() {
  const buttons = levelFilterEl.querySelectorAll("button[data-level]");
  buttons.forEach((button) => {
    button.classList.toggle("active", button.dataset.level === state.level);
  });
}

function updateUI() {
  const scenes = getFilteredScenes();
  renderScenes(scenes);

  const visibleTerms = uniqueTermsFromScenes(scenes);
  renderKanjiList(visibleTerms);
  renderStats(visibleTerms);

  if (!state.quiz || !visibleTerms.includes(state.quiz.term)) {
    buildQuiz(visibleTerms);
  }

  renderQuiz();
  updateLevelFilterUi();
}

async function hydrateData() {
  const requestId = ++loadSequence;
  const config = loadConnectionConfig();
  updateConnectionFields(config);
  setConnectionControlsDisabled(true);
  setConnectionStatus("loading", "데이터 소스를 확인하는 중입니다.");

  try {
    const remote = await tryFetchSupabaseDataset(config);
    if (requestId !== loadSequence) return;

    if (remote.kind === "remote") {
      applyDataset(remote.data, "remote");
      setConnectionStatus("connected", remote.message);
      return;
    }

    const local = await fetchLocalSeedDataset();
    if (requestId !== loadSequence) return;

    applyDataset(local, "local");
    setConnectionStatus(remote.kind === "error" ? "error" : "warning", remote.message);
  } catch (error) {
    if (requestId !== loadSequence) return;

    state.dialogues = [];
    state.glossary = {};
    state.dataSource = "local";
    updateUI();
    setConnectionStatus("error", `데이터 로드 실패: ${error.message}`);
  } finally {
    if (requestId === loadSequence) {
      setConnectionControlsDisabled(false);
    }
  }
}

function handleConnectClick() {
  persistConnectionConfig({
    supabaseUrl: projectUrlInputEl.value || DEFAULT_SUPABASE_URL,
    supabaseAnonKey: anonKeyInputEl.value,
  });
  hydrateData();
}

function handleClearClick() {
  clearConnectionConfig();
  updateConnectionFields(loadConnectionConfig());
  hydrateData();
}

function attachEvents() {
  levelFilterEl.addEventListener("click", (event) => {
    const target = event.target.closest("button[data-level]");
    if (!target) return;
    state.level = target.dataset.level;
    state.focusSceneId = null;
    updateUI();
  });

  searchInputEl.addEventListener("input", (event) => {
    state.search = event.target.value;
    state.focusSceneId = null;
    updateUI();
  });

  furiganaToggleEl.addEventListener("change", (event) => {
    state.showFurigana = event.target.checked;
    updateUI();
  });

  translationToggleEl.addEventListener("change", (event) => {
    state.showTranslation = event.target.checked;
    updateUI();
  });

  shuffleBtnEl.addEventListener("click", () => {
    const scenes = getFilteredScenes();
    if (!scenes.length) return;
    const picked = scenes[Math.floor(Math.random() * scenes.length)];
    state.focusSceneId = picked.id;
    updateUI();
  });

  newQuizBtnEl.addEventListener("click", () => {
    const scenes = getFilteredScenes();
    buildQuiz(uniqueTermsFromScenes(scenes));
    renderQuiz();
  });

  connectBtnEl.addEventListener("click", handleConnectClick);
  reloadDbBtnEl.addEventListener("click", hydrateData);
  clearKeyBtnEl.addEventListener("click", handleClearClick);
  anonKeyInputEl.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleConnectClick();
    }
  });
}

function init() {
  attachEvents();
  hydrateData();
}

init();
