# SumDoku Fusion Web

`fusion_puzzle.py`의 규칙(6x6 스도쿠 + 케이지 합 조건)을 브라우저에서 동작하도록 옮긴 정적 웹앱입니다.

## 로컬 실행

아래 중 하나로 실행할 수 있습니다.

```powershell
node --version
npx --yes serve .
```

또는

```powershell
python -m http.server 5173
```

브라우저에서 `http://localhost:3000` 또는 `http://localhost:5173` 접속.

## Vercel 배포

정적 파일 배포이므로 루트 디렉터리 그대로 연결하면 됩니다.

1. GitHub 저장소에 푸시
2. Vercel에서 `Import Git Repository`
3. Framework Preset: `Other`
4. Build Command / Output Directory 비워둔 채 배포

## 조작 방법

- 숫자 입력: 셀 선택 후 `1~6` 또는 오른쪽 숫자 패드 클릭
- 삭제: `Delete`/`Backspace` 또는 `지우기`
- 검사: `검사`
- 힌트: `힌트`
- 초기화: `초기화`
- 정답 보기: `정답 보기`
