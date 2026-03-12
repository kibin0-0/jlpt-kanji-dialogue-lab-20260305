create extension if not exists pgcrypto;

create table if not exists public.terms (
  term text primary key,
  reading text not null,
  meaning_ko text not null,
  jlpt_level text not null check (jlpt_level in ('N1', 'N2')),
  example_jp text not null,
  example_ko text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.dialogues (
  slug text primary key,
  title text not null,
  jlpt_level text not null check (jlpt_level in ('N1', 'N2')),
  context_ko text not null,
  sort_order integer not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.dialogue_lines (
  id uuid primary key default gen_random_uuid(),
  dialogue_slug text not null references public.dialogues(slug) on delete cascade,
  line_order integer not null,
  speaker text not null,
  jp text not null,
  ruby_html text not null,
  ko text not null,
  created_at timestamptz not null default timezone('utc', now()),
  unique (dialogue_slug, line_order)
);

create table if not exists public.dialogue_line_terms (
  dialogue_slug text not null,
  line_order integer not null,
  term text not null references public.terms(term) on delete cascade,
  sort_order integer not null,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (dialogue_slug, line_order, term),
  constraint dialogue_line_terms_line_fkey
    foreign key (dialogue_slug, line_order)
    references public.dialogue_lines(dialogue_slug, line_order)
    on delete cascade
);

create index if not exists terms_level_idx on public.terms (jlpt_level);
create index if not exists dialogues_level_idx on public.dialogues (jlpt_level);
create index if not exists dialogue_lines_slug_idx on public.dialogue_lines (dialogue_slug, line_order);
create index if not exists dialogue_line_terms_lookup_idx on public.dialogue_line_terms (dialogue_slug, line_order, sort_order);

alter table public.terms enable row level security;
alter table public.dialogues enable row level security;
alter table public.dialogue_lines enable row level security;
alter table public.dialogue_line_terms enable row level security;

drop policy if exists "Public read terms" on public.terms;
create policy "Public read terms"
on public.terms
for select
using (true);

drop policy if exists "Public read dialogues" on public.dialogues;
create policy "Public read dialogues"
on public.dialogues
for select
using (true);

drop policy if exists "Public read dialogue lines" on public.dialogue_lines;
create policy "Public read dialogue lines"
on public.dialogue_lines
for select
using (true);

drop policy if exists "Public read dialogue line terms" on public.dialogue_line_terms;
create policy "Public read dialogue line terms"
on public.dialogue_line_terms
for select
using (true);
