# JLPT Kanji Dialogue Lab

JLPT N1/N2 한자 어휘를 일본어 대화, 후리가나, 한국어 번역, 단어장, 퀴즈로 학습하는 정적 웹 앱입니다.

현재 구조는 `Supabase DB 우선 + 로컬 시드 fallback` 입니다.

## 포함된 파일

- `supabase/schema.sql`
  - `dialogues`, `dialogue_lines`, `terms`, `dialogue_line_terms` 테이블과 공개 읽기 정책
- `supabase/seed.sql`
  - 앱과 동일한 샘플 대화/단어 데이터
- `supabase/bootstrap.sql`
  - SQL Editor에서 한 번에 실행할 수 있는 통합 파일
- `data/jlpt-kanji-lab.json`
  - 로컬 fallback 및 시드 원본 데이터
- `scripts/generate-supabase-seed.mjs`
  - JSON에서 `supabase/seed.sql`을 다시 생성하는 스크립트

## Supabase 설정

프로젝트 ID는 `tseonpoefmpyzsrjklww`로 고정되어 있으며 기본 URL은 아래와 같습니다.

```text
https://tseonpoefmpyzsrjklww.supabase.co
```

### 1. DB 스키마 적용

Supabase SQL Editor에서 아래 순서로 실행합니다.

1. 가장 간단한 방법: `supabase/bootstrap.sql` 전체 실행
2. 또는 순서대로 `supabase/schema.sql` 다음 `supabase/seed.sql` 실행

### 2. anon key 입력

브라우저에서 아래 둘 중 하나로 설정합니다.

1. `config.js`의 `supabaseAnonKey`에 값을 넣기
2. 앱 상단의 `Anon Key` 입력창에 붙여넣고 `키 저장` 누르기

`anon key`는 브라우저에서 읽기 전용으로 사용하는 공개 키입니다.

## 로컬 실행

정적 서버만 있으면 됩니다.

```powershell
python -m http.server 5173
```

또는

```powershell
npx --yes serve .
```

실행 후 `http://localhost:5173` 또는 `http://localhost:3000`에서 확인합니다.

## Vercel 배포

이 프로젝트는 GitHub 연동 배포 시 `npm run build`로 `dist/config.js`를 생성하도록 구성되어 있습니다.

Vercel 프로젝트 `jlpt-kanji-dialogue-lab`에 아래 환경변수를 등록하면 배포본이 Supabase DB를 바로 읽습니다.

```text
SUPABASE_URL=https://tseonpoefmpyzsrjklww.supabase.co
SUPABASE_ANON_KEY=...your anon key...
```

빌드 결과물은 `dist/`에 생성되며, Vercel은 그 디렉터리를 정적 출력으로 사용합니다.

## 시드 데이터 수정

`data/jlpt-kanji-lab.json`을 수정한 뒤 아래 명령으로 SQL 시드를 다시 생성합니다.

```powershell
node scripts/generate-supabase-seed.mjs
```
