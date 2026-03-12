-- Run this in Supabase SQL Editor for project tseonpoefmpyzsrjklww

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


-- Generated from data/jlpt-kanji-lab.json
begin;

delete from dialogue_line_terms;
delete from dialogue_lines;
delete from dialogues;
delete from terms;

insert into terms (term, reading, meaning_ko, jlpt_level, example_jp, example_ko)
values
  ('市場', 'しじょう', '시장', 'N1', '市場の変動を見ながら販売戦略を調整する。', '시장 변화를 보면서 판매 전략을 조정한다.'),
  ('変動', 'へんどう', '변동', 'N1', '原材料の価格変動が大きい。', '원자재 가격 변동이 크다.'),
  ('供給', 'きょうきゅう', '공급', 'N1', '供給の安定が最優先だ。', '공급 안정이 최우선이다.'),
  ('見直し', 'みなおし', '재검토', 'N1', '契約内容の見直しが必要だ。', '계약 내용을 재검토할 필요가 있다.'),
  ('利益', 'りえき', '이익', 'N1', '短期的な利益だけを追わない。', '단기적인 이익만 쫓지 않는다.'),
  ('課題', 'かだい', '과제', 'N1', '今期の課題を共有する。', '이번 분기의 과제를 공유한다.'),
  ('根本的', 'こんぽんてき', '근본적', 'N1', '根本的な対策を考える。', '근본적인 대책을 생각한다.'),
  ('改善', 'かいぜん', '개선', 'N1', '改善案を来週までに出す。', '개선안을 다음 주까지 낸다.'),
  ('福祉', 'ふくし', '복지', 'N1', '福祉制度の見直しが議題になった。', '복지 제도 재검토가 의제가 되었다.'),
  ('物価', 'ぶっか', '물가', 'N1', '物価の上昇が家計を圧迫している。', '물가 상승이 가계를 압박하고 있다.'),
  ('雇用', 'こよう', '고용', 'N1', '地域の雇用を守る政策が必要だ。', '지역 고용을 지키는 정책이 필요하다.'),
  ('支援策', 'しえんさく', '지원책', 'N1', '中小企業向けの支援策を検討する。', '중소기업 대상 지원책을 검토한다.'),
  ('統計', 'とうけい', '통계', 'N1', '統計だけでは現場は見えない。', '통계만으로는 현장이 보이지 않는다.'),
  ('配分', 'はいぶん', '배분', 'N1', '予算の配分を再調整する。', '예산 배분을 다시 조정한다.'),
  ('財源', 'ざいげん', '재원', 'N1', '財源の確保が大きな課題だ。', '재원 확보가 큰 과제다.'),
  ('仮説', 'かせつ', '가설', 'N1', 'まず仮説を立ててから実験する。', '먼저 가설을 세우고 실험한다.'),
  ('検証', 'けんしょう', '검증', 'N1', '新モデルの検証が終わっていない。', '신규 모델 검증이 끝나지 않았다.'),
  ('誤差', 'ごさ', '오차', 'N1', '測定の誤差を最小限に抑える。', '측정 오차를 최소한으로 줄인다.'),
  ('再現性', 'さいげんせい', '재현성', 'N1', '再現性の低い実験結果は採用できない。', '재현성이 낮은 실험 결과는 채택할 수 없다.'),
  ('指標', 'しひょう', '지표', 'N1', '評価指標を統一する必要がある。', '평가 지표를 통일할 필요가 있다.'),
  ('導入', 'どうにゅう', '도입', 'N1', '新技術の導入には準備が要る。', '신기술 도입에는 준비가 필요하다.'),
  ('比較', 'ひかく', '비교', 'N1', '旧版と新版を比較してみよう。', '구버전과 신버전을 비교해 보자.'),
  ('結果', 'けっか', '결과', 'N1', '結果を見てから次の段階へ進む。', '결과를 보고 다음 단계로 간다.'),
  ('顧客', 'こきゃく', '고객', 'N2', '顧客の声を最初に確認する。', '고객의 목소리를 먼저 확인한다.'),
  ('提案', 'ていあん', '제안', 'N2', '改善案を提案としてまとめる。', '개선안을 제안으로 정리한다.'),
  ('優先順位', 'ゆうせんじゅんい', '우선순위', 'N2', '作業の優先順位を明確にする。', '작업 우선순위를 명확히 한다.'),
  ('納期', 'のうき', '납기', 'N2', '納期が短い案件ほど調整が重要だ。', '납기가 짧은 안건일수록 조정이 중요하다.'),
  ('担当', 'たんとう', '담당', 'N2', '担当を決めてから作業を始める。', '담당을 정한 뒤 작업을 시작한다.'),
  ('進捗', 'しんちょく', '진척', 'N2', '毎朝進捗を共有してください。', '매일 아침 진척 상황을 공유해 주세요.'),
  ('共有', 'きょうゆう', '공유', 'N2', '会議メモは全員に共有する。', '회의 메모는 전원에게 공유한다.'),
  ('調整', 'ちょうせい', '조정', 'N2', '日程の調整がまだ終わっていない。', '일정 조정이 아직 끝나지 않았다.'),
  ('志望動機', 'しぼうどうき', '지원 동기', 'N2', '志望動機は簡潔に説明したほうがよい。', '지원 동기는 간결하게 설명하는 편이 좋다.'),
  ('経験', 'けいけん', '경험', 'N2', '前職の経験を新しい仕事に生かす。', '전 직장의 경험을 새 일에 살린다.'),
  ('貢献', 'こうけん', '공헌', 'N2', 'チームにどう貢献できるかを考える。', '팀에 어떻게 공헌할 수 있을지 생각한다.'),
  ('対応', 'たいおう', '대응', 'N2', '緊急時の対応を事前に決めておく。', '긴급 시 대응을 사전에 정해 둔다.'),
  ('説明', 'せつめい', '설명', 'N2', '背景を具体的に説明する。', '배경을 구체적으로 설명한다.'),
  ('協力', 'きょうりょく', '협력', 'N2', '部署を越えた協力が必要だ。', '부서를 넘는 협력이 필요하다.'),
  ('出発', 'しゅっぱつ', '출발', 'N2', '出発時刻の変更に気をつける。', '출발 시각 변경에 주의한다.'),
  ('変更', 'へんこう', '변경', 'N2', '予定の変更は早めに知らせてほしい。', '일정 변경은 빨리 알려 주었으면 한다.'),
  ('手続き', 'てつづき', '절차', 'N2', '払い戻しの手続きを案内する。', '환불 절차를 안내한다.'),
  ('予約', 'よやく', '예약', 'N2', 'ホテルの予約を再確認する。', '호텔 예약을 다시 확인한다.'),
  ('連絡', 'れんらく', '연락', 'N2', '変更があればすぐに連絡してください。', '변경이 있으면 바로 연락해 주세요.'),
  ('遅延', 'ちえん', '지연', 'N2', '列車の遅延情報を確認する。', '열차 지연 정보를 확인한다.'),
  ('確認', 'かくにん', '확인', 'N2', '最終案を全員で確認する。', '최종안을 모두 함께 확인한다.'),
  ('必要', 'ひつよう', '필요', 'N2', '追加の連絡が必要になる場合もある。', '추가 연락이 필요해지는 경우도 있다.')
on conflict (term) do update set reading = excluded.reading, meaning_ko = excluded.meaning_ko, jlpt_level = excluded.jlpt_level, example_jp = excluded.example_jp, example_ko = excluded.example_ko
;

insert into dialogues (slug, title, jlpt_level, context_ko, sort_order)
values
  ('strategy-board', '市場変動を読む会議', 'N1', '해외 진출 전략을 조정하는 임원 회의', '1'),
  ('policy-forum', '福祉政策を語る公開討論', 'N1', '복지 정책과 물가 문제를 다루는 공개 포럼', '2'),
  ('research-lab', '研究室の実験方針レビュー', 'N1', '실험 데이터 해석과 다음 단계 도입을 논의하는 회의', '3'),
  ('project-kickoff', '新サービス準備の初回会議', 'N2', '신규 서비스 출시 준비를 위한 실무 회의', '4'),
  ('job-interview', '面接で話す強み', 'N2', '지원자와 면접관 사이의 질의응답', '5'),
  ('travel-issue', '出発前の予定変更', 'N2', '항공편 변경 상황에서 직원과 여행자가 나누는 대화', '6')
on conflict (slug) do update set title = excluded.title, jlpt_level = excluded.jlpt_level, context_ko = excluded.context_ko, sort_order = excluded.sort_order
;

insert into dialogue_lines (dialogue_slug, line_order, speaker, jp, ruby_html, ko)
values
  ('strategy-board', '1', '部長', '市場の変動を考慮して、来期の供給計画を見直しましょう。', '<ruby>市場<rt>しじょう</rt></ruby>の<ruby>変動<rt>へんどう</rt></ruby>を考慮して、来期の<ruby>供給<rt>きょうきゅう</rt></ruby>計画を<ruby>見直<rt>みなお</rt></ruby>しましょう。', '시장 변동을 고려해서 다음 분기 공급 계획을 재검토합시다.'),
  ('strategy-board', '2', '課長', '利益だけでなく、品質面の課題も整理する必要があります。', '<ruby>利益<rt>りえき</rt></ruby>だけでなく、品質面の<ruby>課題<rt>かだい</rt></ruby>も整理する必要があります。', '이익뿐 아니라 품질 측면의 과제도 정리할 필요가 있습니다.'),
  ('strategy-board', '3', '分析官', '根本的な原因を特定しないと、同じ問題が再発します。', '<ruby>根本的<rt>こんぽんてき</rt></ruby>な原因を特定しないと、同じ問題が再発します。', '근본적인 원인을 특정하지 않으면 같은 문제가 다시 발생합니다.'),
  ('strategy-board', '4', '部長', 'では、改善案を明日までに共有してください。', 'では、<ruby>改善<rt>かいぜん</rt></ruby>案を明日までに<ruby>共有<rt>きょうゆう</rt></ruby>してください。', '그럼 개선안을 내일까지 공유해 주세요.'),
  ('policy-forum', '1', '司会', '今日のテーマは福祉政策と物価上昇への対応です。', '今日のテーマは<ruby>福祉<rt>ふくし</rt></ruby>政策と<ruby>物価<rt>ぶっか</rt></ruby>上昇への<ruby>対応<rt>たいおう</rt></ruby>です。', '오늘의 주제는 복지 정책과 물가 상승 대응입니다.'),
  ('policy-forum', '2', '研究員', '雇用の安定には、短期より持続的な支援策が重要です。', '<ruby>雇用<rt>こよう</rt></ruby>の安定には、短期より持続的な<ruby>支援策<rt>しえんさく</rt></ruby>が重要です。', '고용 안정에는 단기 대책보다 지속적인 지원책이 중요합니다.'),
  ('policy-forum', '3', '市民代表', '統計だけでなく、現場の声も政策に反映してください。', '<ruby>統計<rt>とうけい</rt></ruby>だけでなく、現場の声も政策に反映してください。', '통계뿐 아니라 현장의 목소리도 정책에 반영해 주세요.'),
  ('policy-forum', '4', '司会', '予算の配分と財源の透明性も議論が必要です。', '予算の<ruby>配分<rt>はいぶん</rt></ruby>と<ruby>財源<rt>ざいげん</rt></ruby>の透明性も議論が<ruby>必要<rt>ひつよう</rt></ruby>です。', '예산 배분과 재원의 투명성도 논의가 필요합니다.'),
  ('research-lab', '1', '主任', '新しい仮説を検証する前に、既存モデルとの比較条件を決めましょう。', '新しい<ruby>仮説<rt>かせつ</rt></ruby>を<ruby>検証<rt>けんしょう</rt></ruby>する前に、既存モデルとの<ruby>比較<rt>ひかく</rt></ruby>条件を決めましょう。', '새 가설을 검증하기 전에 기존 모델과의 비교 조건을 정합시다.'),
  ('research-lab', '2', '研究員', '誤差を減らすには、測定の指標を統一する必要があります。', '<ruby>誤差<rt>ごさ</rt></ruby>を減らすには、測定の<ruby>指標<rt>しひょう</rt></ruby>を統一する必要があります。', '오차를 줄이려면 측정 지표를 통일할 필요가 있습니다.'),
  ('research-lab', '3', '主任', '再現性が低い結果は、そのまま導入できません。', '<ruby>再現性<rt>さいげんせい</rt></ruby>が低い<ruby>結果<rt>けっか</rt></ruby>は、そのまま<ruby>導入<rt>どうにゅう</rt></ruby>できません。', '재현성이 낮은 결과는 그대로 도입할 수 없습니다.'),
  ('research-lab', '4', '研究員', '追加実験の結果を来週までに共有します。', '追加実験の<ruby>結果<rt>けっか</rt></ruby>を来週までに<ruby>共有<rt>きょうゆう</rt></ruby>します。', '추가 실험 결과를 다음 주까지 공유하겠습니다.'),
  ('project-kickoff', '1', 'PM', '今週中に顧客向けの提案書をまとめてください。', '今週中に<ruby>顧客<rt>こきゃく</rt></ruby>向けの<ruby>提案<rt>ていあん</rt></ruby>書をまとめてください。', '이번 주 안에 고객용 제안서를 정리해 주세요.'),
  ('project-kickoff', '2', '企画担当', 'まずは要件を整理して、優先順位を決めます。', 'まずは要件を整理して、<ruby>優先順位<rt>ゆうせんじゅんい</rt></ruby>を決めます。', '우선 요구사항을 정리하고 우선순위를 정하겠습니다.'),
  ('project-kickoff', '3', 'PM', '納期が短いので、担当ごとの進捗を毎日共有しましょう。', '<ruby>納期<rt>のうき</rt></ruby>が短いので、<ruby>担当<rt>たんとう</rt></ruby>ごとの<ruby>進捗<rt>しんちょく</rt></ruby>を毎日<ruby>共有<rt>きょうゆう</rt></ruby>しましょう。', '납기가 짧으니 담당별 진척 상황을 매일 공유합시다.'),
  ('project-kickoff', '4', '企画担当', '必要ならデザイン側とも日程を調整します。', '<ruby>必要<rt>ひつよう</rt></ruby>ならデザイン側とも日程を<ruby>調整<rt>ちょうせい</rt></ruby>します。', '필요하면 디자인 팀과도 일정을 조정하겠습니다.'),
  ('job-interview', '1', '面接官', '当社への志望動機を具体的に説明してください。', '当社への<ruby>志望動機<rt>しぼうどうき</rt></ruby>を具体的に<ruby>説明<rt>せつめい</rt></ruby>してください。', '당사를 지원한 동기를 구체적으로 설명해 주세요.'),
  ('job-interview', '2', '応募者', '前職で得た経験を生かして、御社のサービス改善に貢献したいです。', '前職で得た<ruby>経験<rt>けいけん</rt></ruby>を生かして、御社のサービス<ruby>改善<rt>かいぜん</rt></ruby>に<ruby>貢献<rt>こうけん</rt></ruby>したいです。', '전 직장에서 얻은 경험을 살려 귀사의 서비스 개선에 공헌하고 싶습니다.'),
  ('job-interview', '3', '面接官', '困難な状況にはどのように対応しましたか。', '困難な状況にはどのように<ruby>対応<rt>たいおう</rt></ruby>しましたか。', '어려운 상황에는 어떻게 대응했습니까?'),
  ('job-interview', '4', '応募者', '周囲と協力しながら課題を分担し、期限内に解決しました。', '周囲と<ruby>協力<rt>きょうりょく</rt></ruby>しながら<ruby>課題<rt>かだい</rt></ruby>を分担し、期限内に解決しました。', '주변과 협력하면서 과제를 분담하고 기한 내에 해결했습니다.'),
  ('travel-issue', '1', '旅行者', '台風の影響で出発時刻が変更になったと聞きました。', '台風の影響で<ruby>出発<rt>しゅっぱつ</rt></ruby>時刻が<ruby>変更<rt>へんこう</rt></ruby>になったと聞きました。', '태풍 영향으로 출발 시각이 변경되었다고 들었습니다.'),
  ('travel-issue', '2', '空港スタッフ', '代替便の予約と払い戻し手続きを確認します。', '代替便の<ruby>予約<rt>よやく</rt></ruby>と払い戻し<ruby>手続<rt>てつづ</rt></ruby>きを<ruby>確認<rt>かくにん</rt></ruby>します。', '대체편 예약과 환불 절차를 확인하겠습니다.'),
  ('travel-issue', '3', '旅行者', '宿泊先には先に連絡したほうがいいですか。', '宿泊先には先に<ruby>連絡<rt>れんらく</rt></ruby>したほうがいいですか。', '숙소에는 먼저 연락하는 편이 좋을까요?'),
  ('travel-issue', '4', '空港スタッフ', '到着が大きく遅延する場合は、その連絡が必要です。', '到着が大きく<ruby>遅延<rt>ちえん</rt></ruby>する場合は、その<ruby>連絡<rt>れんらく</rt></ruby>が<ruby>必要<rt>ひつよう</rt></ruby>です。', '도착이 크게 지연되는 경우에는 그 연락이 필요합니다.')
on conflict (dialogue_slug, line_order) do update set speaker = excluded.speaker, jp = excluded.jp, ruby_html = excluded.ruby_html, ko = excluded.ko
;

insert into dialogue_line_terms (dialogue_slug, line_order, term, sort_order)
values
  ('strategy-board', '1', '市場', '1'),
  ('strategy-board', '1', '変動', '2'),
  ('strategy-board', '1', '供給', '3'),
  ('strategy-board', '1', '見直し', '4'),
  ('strategy-board', '2', '利益', '1'),
  ('strategy-board', '2', '課題', '2'),
  ('strategy-board', '2', '必要', '3'),
  ('strategy-board', '3', '根本的', '1'),
  ('strategy-board', '4', '改善', '1'),
  ('strategy-board', '4', '共有', '2'),
  ('policy-forum', '1', '福祉', '1'),
  ('policy-forum', '1', '物価', '2'),
  ('policy-forum', '1', '対応', '3'),
  ('policy-forum', '2', '雇用', '1'),
  ('policy-forum', '2', '支援策', '2'),
  ('policy-forum', '3', '統計', '1'),
  ('policy-forum', '4', '配分', '1'),
  ('policy-forum', '4', '財源', '2'),
  ('policy-forum', '4', '必要', '3'),
  ('research-lab', '1', '仮説', '1'),
  ('research-lab', '1', '検証', '2'),
  ('research-lab', '1', '比較', '3'),
  ('research-lab', '2', '誤差', '1'),
  ('research-lab', '2', '指標', '2'),
  ('research-lab', '2', '必要', '3'),
  ('research-lab', '3', '再現性', '1'),
  ('research-lab', '3', '結果', '2'),
  ('research-lab', '3', '導入', '3'),
  ('research-lab', '4', '結果', '1'),
  ('research-lab', '4', '共有', '2'),
  ('project-kickoff', '1', '顧客', '1'),
  ('project-kickoff', '1', '提案', '2'),
  ('project-kickoff', '2', '優先順位', '1'),
  ('project-kickoff', '3', '納期', '1'),
  ('project-kickoff', '3', '担当', '2'),
  ('project-kickoff', '3', '進捗', '3'),
  ('project-kickoff', '3', '共有', '4'),
  ('project-kickoff', '4', '必要', '1'),
  ('project-kickoff', '4', '調整', '2'),
  ('job-interview', '1', '志望動機', '1'),
  ('job-interview', '1', '説明', '2'),
  ('job-interview', '2', '経験', '1'),
  ('job-interview', '2', '改善', '2'),
  ('job-interview', '2', '貢献', '3'),
  ('job-interview', '3', '対応', '1'),
  ('job-interview', '4', '協力', '1'),
  ('job-interview', '4', '課題', '2'),
  ('travel-issue', '1', '出発', '1'),
  ('travel-issue', '1', '変更', '2'),
  ('travel-issue', '2', '予約', '1'),
  ('travel-issue', '2', '手続き', '2'),
  ('travel-issue', '2', '確認', '3'),
  ('travel-issue', '3', '連絡', '1'),
  ('travel-issue', '4', '遅延', '1'),
  ('travel-issue', '4', '連絡', '2'),
  ('travel-issue', '4', '必要', '3')
on conflict (dialogue_slug, line_order, term) do update set sort_order = excluded.sort_order
;

commit;

