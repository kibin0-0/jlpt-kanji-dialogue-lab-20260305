const dialogues = [
  {
    id: "strategy-board",
    title: "経営戦略会議",
    level: "N1",
    context: "해외 확장 전략을 조정하는 임원 회의",
    lines: [
      {
        speaker: "部長",
        jp: "市場の変動を踏まえて、来期の施策を再構築しましょう。",
        ruby: "<ruby>市場<rt>しじょう</rt></ruby>の<ruby>変動<rt>へんどう</rt></ruby>を<ruby>踏<rt>ふ</rt></ruby>まえて、<ruby>来期<rt>らいき</rt></ruby>の<ruby>施策<rt>しさく</rt></ruby>を<ruby>再構築<rt>さいこうちく</rt></ruby>しましょう。",
        ko: "시장 변동을 고려해 다음 분기 시책을 재구성합시다.",
        terms: ["市場", "変動", "施策", "再構築"],
      },
      {
        speaker: "課長",
        jp: "現行案には収益性への懸念が残っており、抜本的な見直しが必要です。",
        ruby: "<ruby>現行案<rt>げんこうあん</rt></ruby>には<ruby>収益性<rt>しゅうえきせい</rt></ruby>への<ruby>懸念<rt>けねん</rt></ruby>が<ruby>残<rt>のこ</rt></ruby>っており、<ruby>抜本的<rt>ばっぽんてき</rt></ruby>な<ruby>見直<rt>みなお</rt></ruby>しが<ruby>必要<rt>ひつよう</rt></ruby>です。",
        ko: "현행안은 수익성 측면의 우려가 남아 있어 근본적인 재검토가 필요합니다.",
        terms: ["現行案", "収益性", "懸念", "抜本的", "見直"],
      },
      {
        speaker: "主任",
        jp: "競合分析の結果、東南アジア市場で突破口を見いだせる可能性があります。",
        ruby: "<ruby>競合分析<rt>きょうごうぶんせき</rt></ruby>の<ruby>結果<rt>けっか</rt></ruby>、<ruby>東南<rt>とうなん</rt></ruby>アジア<ruby>市場<rt>しじょう</rt></ruby>で<ruby>突破口<rt>とっぱこう</rt></ruby>を<ruby>見<rt>み</rt></ruby>いだせる<ruby>可能性<rt>かのうせい</rt></ruby>があります。",
        ko: "경쟁 분석 결과 동남아 시장에서 돌파구를 찾을 가능성이 있습니다.",
        terms: ["競合分析", "突破口", "可能性", "市場"],
      },
      {
        speaker: "部長",
        jp: "では、提携候補の選定基準を明確化し、来週までに合意形成を図りましょう。",
        ruby: "では、<ruby>提携候補<rt>ていけいこうほ</rt></ruby>の<ruby>選定基準<rt>せんていきじゅん</rt></ruby>を<ruby>明確化<rt>めいかくか</rt></ruby>し、<ruby>来週<rt>らいしゅう</rt></ruby>までに<ruby>合意形成<rt>ごういけいせい</rt></ruby>を<ruby>図<rt>はか</rt></ruby>りましょう。",
        ko: "그럼 제휴 후보 선정 기준을 명확히 하고 다음 주까지 합의를 이끌어냅시다.",
        terms: ["提携候補", "選定基準", "明確化", "合意形成"],
      },
    ],
  },
  {
    id: "policy-forum",
    title: "社会課題フォーラム",
    level: "N1",
    context: "도시 복지 정책을 논의하는 공개 토론",
    lines: [
      {
        speaker: "司会",
        jp: "本日の議題は、地域間格差の是正と雇用機会の拡充です。",
        ruby: "<ruby>本日<rt>ほんじつ</rt></ruby>の<ruby>議題<rt>ぎだい</rt></ruby>は、<ruby>地域間格差<rt>ちいきかんかくさ</rt></ruby>の<ruby>是正<rt>ぜせい</rt></ruby>と<ruby>雇用機会<rt>こようきかい</rt></ruby>の<ruby>拡充<rt>かくじゅう</rt></ruby>です。",
        ko: "오늘의 의제는 지역 간 격차 시정과 고용 기회 확대입니다.",
        terms: ["議題", "地域間格差", "是正", "雇用機会", "拡充"],
      },
      {
        speaker: "研究者",
        jp: "統計上、低所得層への支援策は短期より長期効果の方が顕著です。",
        ruby: "<ruby>統計上<rt>とうけいじょう</rt></ruby>、<ruby>低所得層<rt>ていしょとくそう</rt></ruby>への<ruby>支援策<rt>しえんさく</rt></ruby>は<ruby>短期<rt>たんき</rt></ruby>より<ruby>長期効果<rt>ちょうきこうか</rt></ruby>の<ruby>方<rt>ほう</rt></ruby>が<ruby>顕著<rt>けんちょ</rt></ruby>です。",
        ko: "통계상 저소득층 지원책은 단기보다 장기 효과가 더 두드러집니다.",
        terms: ["統計上", "低所得層", "支援策", "長期効果", "顕著"],
      },
      {
        speaker: "自治体職員",
        jp: "ただし、予算配分の妥当性を示す客観的指標が不足しています。",
        ruby: "ただし、<ruby>予算配分<rt>よさんはいぶん</rt></ruby>の<ruby>妥当性<rt>だとうせい</rt></ruby>を<ruby>示<rt>しめ</rt></ruby>す<ruby>客観的指標<rt>きゃっかんてきしひょう</rt></ruby>が<ruby>不足<rt>ふそく</rt></ruby>しています。",
        ko: "다만 예산 배분의 타당성을 보여줄 객관적 지표가 부족합니다.",
        terms: ["予算配分", "妥当性", "客観的指標", "不足"],
      },
      {
        speaker: "司会",
        jp: "次回は住民意見の収集方法を改善し、実効性の高い案を提示します。",
        ruby: "<ruby>次回<rt>じかい</rt></ruby>は<ruby>住民意見<rt>じゅうみんいけん</rt></ruby>の<ruby>収集方法<rt>しゅうしゅうほうほう</rt></ruby>を<ruby>改善<rt>かいぜん</rt></ruby>し、<ruby>実効性<rt>じっこうせい</rt></ruby>の<ruby>高<rt>たか</rt></ruby>い<ruby>案<rt>あん</rt></ruby>を<ruby>提示<rt>ていじ</rt></ruby>します。",
        ko: "다음 회차에는 주민 의견 수집 방식을 개선해 실효성 높은 안을 제시하겠습니다.",
        terms: ["住民意見", "収集方法", "改善", "実効性", "提示"],
      },
    ],
  },
  {
    id: "research-lab",
    title: "研究室ディスカッション",
    level: "N1",
    context: "실험 데이터와 논문 방향을 조율하는 연구실 회의",
    lines: [
      {
        speaker: "教授",
        jp: "この仮説は魅力的ですが、既存モデルとの乖離を説明する必要があります。",
        ruby: "この<ruby>仮説<rt>かせつ</rt></ruby>は<ruby>魅力的<rt>みりょくてき</rt></ruby>ですが、<ruby>既存<rt>きそん</rt></ruby>モデルとの<ruby>乖離<rt>かいり</rt></ruby>を<ruby>説明<rt>せつめい</rt></ruby>する<ruby>必要<rt>ひつよう</rt></ruby>があります。",
        ko: "이 가설은 매력적이지만 기존 모델과의 괴리를 설명해야 합니다.",
        terms: ["仮説", "既存", "乖離", "説明"],
      },
      {
        speaker: "院生",
        jp: "追加実験で再現性を検証したところ、条件依存の傾向が確認されました。",
        ruby: "<ruby>追加実験<rt>ついかじっけん</rt></ruby>で<ruby>再現性<rt>さいげんせい</rt></ruby>を<ruby>検証<rt>けんしょう</rt></ruby>したところ、<ruby>条件依存<rt>じょうけんいぞん</rt></ruby>の<ruby>傾向<rt>けいこう</rt></ruby>が<ruby>確認<rt>かくにん</rt></ruby>されました。",
        ko: "추가 실험으로 재현성을 검증한 결과, 조건 의존 경향이 확인됐습니다.",
        terms: ["追加実験", "再現性", "検証", "条件依存", "傾向"],
      },
      {
        speaker: "教授",
        jp: "有意差が示せるなら、理論的枠組みの修正も視野に入れましょう。",
        ruby: "<ruby>有意差<rt>ゆういさ</rt></ruby>が<ruby>示<rt>しめ</rt></ruby>せるなら、<ruby>理論的枠組<rt>りろんてきわくぐ</rt></ruby>みの<ruby>修正<rt>しゅうせい</rt></ruby>も<ruby>視野<rt>しや</rt></ruby>に<ruby>入<rt>い</rt></ruby>れましょう。",
        ko: "유의미한 차이를 보여줄 수 있다면 이론적 틀 수정도 고려합시다.",
        terms: ["有意差", "理論的枠組", "修正", "視野"],
      },
      {
        speaker: "院生",
        jp: "了解しました。査読前に論証の整合性を再点検します。",
        ruby: "<ruby>了解<rt>りょうかい</rt></ruby>しました。<ruby>査読前<rt>さどくまえ</rt></ruby>に<ruby>論証<rt>ろんしょう</rt></ruby>の<ruby>整合性<rt>せいごうせい</rt></ruby>を<ruby>再点検<rt>さいてんけん</rt></ruby>します。",
        ko: "알겠습니다. 심사 전에 논증의 정합성을 다시 점검하겠습니다.",
        terms: ["査読前", "論証", "整合性", "再点検"],
      },
    ],
  },
  {
    id: "project-kickoff",
    title: "新規プロジェクト打合せ",
    level: "N2",
    context: "신규 서비스 준비를 위한 실무 회의",
    lines: [
      {
        speaker: "先輩",
        jp: "今週中に企画書を完成させて、上司に提出してください。",
        ruby: "<ruby>今週中<rt>こんしゅうじゅう</rt></ruby>に<ruby>企画書<rt>きかくしょ</rt></ruby>を<ruby>完成<rt>かんせい</rt></ruby>させて、<ruby>上司<rt>じょうし</rt></ruby>に<ruby>提出<rt>ていしゅつ</rt></ruby>してください。",
        ko: "이번 주 안에 기획서를 완성해서 상사에게 제출해 주세요.",
        terms: ["企画書", "完成", "上司", "提出"],
      },
      {
        speaker: "後輩",
        jp: "承知しました。まず顧客の要望を整理してから、提案内容をまとめます。",
        ruby: "<ruby>承知<rt>しょうち</rt></ruby>しました。まず<ruby>顧客<rt>こきゃく</rt></ruby>の<ruby>要望<rt>ようぼう</rt></ruby>を<ruby>整理<rt>せいり</rt></ruby>してから、<ruby>提案内容<rt>ていあんないよう</rt></ruby>をまとめます。",
        ko: "알겠습니다. 먼저 고객 요구를 정리한 뒤 제안 내용을 정리하겠습니다.",
        terms: ["顧客", "要望", "整理", "提案内容"],
      },
      {
        speaker: "先輩",
        jp: "期限が短いので、優先順位を明確にして作業しましょう。",
        ruby: "<ruby>期限<rt>きげん</rt></ruby>が<ruby>短<rt>みじか</rt></ruby>いので、<ruby>優先順位<rt>ゆうせんじゅんい</rt></ruby>を<ruby>明確<rt>めいかく</rt></ruby>にして<ruby>作業<rt>さぎょう</rt></ruby>しましょう。",
        ko: "기한이 짧으니 우선순위를 명확히 해서 작업합시다.",
        terms: ["期限", "優先順位", "明確", "作業"],
      },
      {
        speaker: "後輩",
        jp: "はい、進捗を毎日共有して問題があればすぐ報告します。",
        ruby: "はい、<ruby>進捗<rt>しんちょく</rt></ruby>を<ruby>毎日<rt>まいにち</rt></ruby><ruby>共有<rt>きょうゆう</rt></ruby>して<ruby>問題<rt>もんだい</rt></ruby>があればすぐ<ruby>報告<rt>ほうこく</rt></ruby>します。",
        ko: "네, 진행 상황을 매일 공유하고 문제가 있으면 바로 보고하겠습니다.",
        terms: ["進捗", "共有", "問題", "報告"],
      },
    ],
  },
  {
    id: "job-interview",
    title: "就職面接",
    level: "N2",
    context: "지원자와 면접관의 질의응답",
    lines: [
      {
        speaker: "面接官",
        jp: "当社へ応募した理由を具体的に説明してください。",
        ruby: "<ruby>当社<rt>とうしゃ</rt></ruby>へ<ruby>応募<rt>おうぼ</rt></ruby>した<ruby>理由<rt>りゆう</rt></ruby>を<ruby>具体的<rt>ぐたいてき</rt></ruby>に<ruby>説明<rt>せつめい</rt></ruby>してください。",
        ko: "우리 회사에 지원한 이유를 구체적으로 설명해 주세요.",
        terms: ["当社", "応募", "理由", "具体的", "説明"],
      },
      {
        speaker: "応募者",
        jp: "大学での開発経験を生かし、貴社の製品改善に貢献したいからです。",
        ruby: "<ruby>大学<rt>だいがく</rt></ruby>での<ruby>開発経験<rt>かいはつけいけん</rt></ruby>を<ruby>生<rt>い</rt></ruby>かし、<ruby>貴社<rt>きしゃ</rt></ruby>の<ruby>製品改善<rt>せいひんかいぜん</rt></ruby>に<ruby>貢献<rt>こうけん</rt></ruby>したいからです。",
        ko: "대학에서의 개발 경험을 살려 귀사의 제품 개선에 기여하고 싶기 때문입니다.",
        terms: ["開発経験", "貴社", "製品改善", "貢献"],
      },
      {
        speaker: "面接官",
        jp: "チームで意見が対立したとき、どのように対応しますか。",
        ruby: "チームで<ruby>意見<rt>いけん</rt></ruby>が<ruby>対立<rt>たいりつ</rt></ruby>したとき、どのように<ruby>対応<rt>たいおう</rt></ruby>しますか。",
        ko: "팀에서 의견이 대립할 때 어떤 방식으로 대응합니까?",
        terms: ["意見", "対立", "対応"],
      },
      {
        speaker: "応募者",
        jp: "相手の立場を確認したうえで、目的に沿った妥協案を提案します。",
        ruby: "<ruby>相手<rt>あいて</rt></ruby>の<ruby>立場<rt>たちば</rt></ruby>を<ruby>確認<rt>かくにん</rt></ruby>したうえで、<ruby>目的<rt>もくてき</rt></ruby>に<ruby>沿<rt>そ</rt></ruby>った<ruby>妥協案<rt>だきょうあん</rt></ruby>を<ruby>提案<rt>ていあん</rt></ruby>します。",
        ko: "상대의 입장을 확인한 뒤 목표에 맞는 절충안을 제안합니다.",
        terms: ["立場", "確認", "目的", "妥協案", "提案"],
      },
    ],
  },
  {
    id: "travel-issue",
    title: "旅行トラブル対応",
    level: "N2",
    context: "항공편 변경 상황에서의 여행 대화",
    lines: [
      {
        speaker: "旅行者",
        jp: "台風の影響で出発予定が変更されたと聞きました。",
        ruby: "<ruby>台風<rt>たいふう</rt></ruby>の<ruby>影響<rt>えいきょう</rt></ruby>で<ruby>出発予定<rt>しゅっぱつよてい</rt></ruby>が<ruby>変更<rt>へんこう</rt></ruby>されたと<ruby>聞<rt>き</rt></ruby>きました。",
        ko: "태풍 영향으로 출발 예정이 변경됐다고 들었습니다.",
        terms: ["台風", "影響", "出発予定", "変更"],
      },
      {
        speaker: "係員",
        jp: "はい、別便への振替手続きが可能ですので、こちらで確認します。",
        ruby: "はい、<ruby>別便<rt>べつびん</rt></ruby>への<ruby>振替手続<rt>ふりかえてつづ</rt></ruby>きが<ruby>可能<rt>かのう</rt></ruby>ですので、こちらで<ruby>確認<rt>かくにん</rt></ruby>します。",
        ko: "네, 다른 편으로 변경 수속이 가능하니 여기서 확인해 드리겠습니다.",
        terms: ["別便", "振替手続", "可能", "確認"],
      },
      {
        speaker: "旅行者",
        jp: "到着時刻が遅れる場合、ホテルへ事前連絡した方がよいですか。",
        ruby: "<ruby>到着時刻<rt>とうちゃくじこく</rt></ruby>が<ruby>遅<rt>おく</rt></ruby>れる<ruby>場合<rt>ばあい</rt></ruby>、ホテルへ<ruby>事前連絡<rt>じぜんれんらく</rt></ruby>した<ruby>方<rt>ほう</rt></ruby>がよいですか。",
        ko: "도착 시간이 늦어질 경우 호텔에 사전 연락하는 것이 좋을까요?",
        terms: ["到着時刻", "場合", "事前連絡"],
      },
      {
        speaker: "係員",
        jp: "その方が安心です。必要であれば、連絡文の作成もお手伝いします。",
        ruby: "その<ruby>方<rt>ほう</rt></ruby>が<ruby>安心<rt>あんしん</rt></ruby>です。<ruby>必要<rt>ひつよう</rt></ruby>であれば、<ruby>連絡文<rt>れんらくぶん</rt></ruby>の<ruby>作成<rt>さくせい</rt></ruby>もお<ruby>手伝<rt>てつだ</rt></ruby>いします。",
        ko: "그렇게 하는 편이 안심됩니다. 필요하면 연락문 작성도 도와드리겠습니다.",
        terms: ["安心", "必要", "連絡文", "作成"],
      },
    ],
  },
];

const glossary = {
  市場: { reading: "しじょう", meaning: "시장", level: "N1", example: "市場の変動を分析する" },
  変動: { reading: "へんどう", meaning: "변동", level: "N1", example: "需要の変動が激しい" },
  施策: { reading: "しさく", meaning: "시책, 정책", level: "N1", example: "施策を立案する" },
  再構築: { reading: "さいこうちく", meaning: "재구축", level: "N1", example: "制度を再構築する" },
  現行案: { reading: "げんこうあん", meaning: "현행안", level: "N1", example: "現行案を修正する" },
  収益性: { reading: "しゅうえきせい", meaning: "수익성", level: "N1", example: "収益性を評価する" },
  懸念: { reading: "けねん", meaning: "우려, 염려", level: "N1", example: "懸念が残る" },
  抜本的: { reading: "ばっぽんてき", meaning: "근본적인", level: "N1", example: "抜本的な改革" },
  見直: { reading: "みなおし", meaning: "재검토", level: "N1", example: "計画の見直し" },
  競合分析: { reading: "きょうごうぶんせき", meaning: "경쟁 분석", level: "N1", example: "競合分析を行う" },
  突破口: { reading: "とっぱこう", meaning: "돌파구", level: "N1", example: "突破口を探る" },
  可能性: { reading: "かのうせい", meaning: "가능성", level: "N2", example: "成功の可能性がある" },
  提携候補: { reading: "ていけいこうほ", meaning: "제휴 후보", level: "N1", example: "提携候補を選ぶ" },
  選定基準: { reading: "せんていきじゅん", meaning: "선정 기준", level: "N1", example: "選定基準を設ける" },
  明確化: { reading: "めいかくか", meaning: "명확화", level: "N1", example: "責任範囲を明確化する" },
  合意形成: { reading: "ごういけいせい", meaning: "합의 형성", level: "N1", example: "合意形成を図る" },
  議題: { reading: "ぎだい", meaning: "의제", level: "N1", example: "議題を共有する" },
  地域間格差: { reading: "ちいきかんかくさ", meaning: "지역 간 격차", level: "N1", example: "地域間格差を縮小する" },
  是正: { reading: "ぜせい", meaning: "시정", level: "N1", example: "偏りを是正する" },
  雇用機会: { reading: "こようきかい", meaning: "고용 기회", level: "N2", example: "雇用機会を増やす" },
  拡充: { reading: "かくじゅう", meaning: "확충", level: "N1", example: "制度を拡充する" },
  統計上: { reading: "とうけいじょう", meaning: "통계상", level: "N1", example: "統計上の傾向" },
  低所得層: { reading: "ていしょとくそう", meaning: "저소득층", level: "N1", example: "低所得層への支援" },
  支援策: { reading: "しえんさく", meaning: "지원책", level: "N2", example: "支援策を検討する" },
  長期効果: { reading: "ちょうきこうか", meaning: "장기 효과", level: "N1", example: "長期効果を測る" },
  顕著: { reading: "けんちょ", meaning: "현저함, 두드러짐", level: "N1", example: "顕著な変化" },
  予算配分: { reading: "よさんはいぶん", meaning: "예산 배분", level: "N2", example: "予算配分を調整する" },
  妥当性: { reading: "だとうせい", meaning: "타당성", level: "N1", example: "妥当性を示す" },
  客観的指標: { reading: "きゃっかんてきしひょう", meaning: "객관적 지표", level: "N1", example: "客観的指標を用いる" },
  不足: { reading: "ふそく", meaning: "부족", level: "N2", example: "人手が不足する" },
  住民意見: { reading: "じゅうみんいけん", meaning: "주민 의견", level: "N2", example: "住民意見を聴く" },
  収集方法: { reading: "しゅうしゅうほうほう", meaning: "수집 방법", level: "N1", example: "情報の収集方法" },
  改善: { reading: "かいぜん", meaning: "개선", level: "N2", example: "業務を改善する" },
  実効性: { reading: "じっこうせい", meaning: "실효성", level: "N1", example: "実効性が高い" },
  提示: { reading: "ていじ", meaning: "제시", level: "N2", example: "新案を提示する" },
  仮説: { reading: "かせつ", meaning: "가설", level: "N1", example: "仮説を立てる" },
  既存: { reading: "きそん", meaning: "기존", level: "N1", example: "既存モデルの比較" },
  乖離: { reading: "かいり", meaning: "괴리", level: "N1", example: "理論との乖離" },
  説明: { reading: "せつめい", meaning: "설명", level: "N2", example: "理由を説明する" },
  追加実験: { reading: "ついかじっけん", meaning: "추가 실험", level: "N1", example: "追加実験を行う" },
  再現性: { reading: "さいげんせい", meaning: "재현성", level: "N1", example: "再現性を確認する" },
  検証: { reading: "けんしょう", meaning: "검증", level: "N1", example: "結果を検証する" },
  条件依存: { reading: "じょうけんいぞん", meaning: "조건 의존", level: "N1", example: "条件依存の結果" },
  傾向: { reading: "けいこう", meaning: "경향", level: "N2", example: "傾向を把握する" },
  確認: { reading: "かくにん", meaning: "확인", level: "N2", example: "内容を確認する" },
  有意差: { reading: "ゆういさ", meaning: "유의미한 차이", level: "N1", example: "有意差がある" },
  理論的枠組: { reading: "りろんてきわくぐみ", meaning: "이론적 틀", level: "N1", example: "理論的枠組を修正する" },
  修正: { reading: "しゅうせい", meaning: "수정", level: "N2", example: "計画を修正する" },
  視野: { reading: "しや", meaning: "시야, 관점", level: "N1", example: "視野に入れる" },
  査読前: { reading: "さどくまえ", meaning: "심사 전", level: "N1", example: "査読前に確認する" },
  論証: { reading: "ろんしょう", meaning: "논증", level: "N1", example: "論証を強化する" },
  整合性: { reading: "せいごうせい", meaning: "정합성", level: "N1", example: "整合性を保つ" },
  再点検: { reading: "さいてんけん", meaning: "재점검", level: "N1", example: "資料を再点検する" },
  企画書: { reading: "きかくしょ", meaning: "기획서", level: "N2", example: "企画書を作成する" },
  完成: { reading: "かんせい", meaning: "완성", level: "N2", example: "資料を完成させる" },
  上司: { reading: "じょうし", meaning: "상사", level: "N2", example: "上司に報告する" },
  提出: { reading: "ていしゅつ", meaning: "제출", level: "N2", example: "書類を提出する" },
  顧客: { reading: "こきゃく", meaning: "고객", level: "N2", example: "顧客の要望を聞く" },
  要望: { reading: "ようぼう", meaning: "요구", level: "N2", example: "要望に対応する" },
  整理: { reading: "せいり", meaning: "정리", level: "N2", example: "情報を整理する" },
  提案内容: { reading: "ていあんないよう", meaning: "제안 내용", level: "N2", example: "提案内容を調整する" },
  期限: { reading: "きげん", meaning: "기한", level: "N2", example: "期限を守る" },
  優先順位: { reading: "ゆうせんじゅんい", meaning: "우선순위", level: "N2", example: "優先順位を決める" },
  明確: { reading: "めいかく", meaning: "명확함", level: "N2", example: "目的を明確にする" },
  作業: { reading: "さぎょう", meaning: "작업", level: "N2", example: "作業を分担する" },
  進捗: { reading: "しんちょく", meaning: "진척", level: "N2", example: "進捗を共有する" },
  共有: { reading: "きょうゆう", meaning: "공유", level: "N2", example: "情報を共有する" },
  問題: { reading: "もんだい", meaning: "문제", level: "N2", example: "問題を解決する" },
  報告: { reading: "ほうこく", meaning: "보고", level: "N2", example: "結果を報告する" },
  当社: { reading: "とうしゃ", meaning: "당사", level: "N2", example: "当社の方針" },
  応募: { reading: "おうぼ", meaning: "응모, 지원", level: "N2", example: "企業に応募する" },
  理由: { reading: "りゆう", meaning: "이유", level: "N2", example: "理由を説明する" },
  具体的: { reading: "ぐたいてき", meaning: "구체적", level: "N2", example: "具体的な計画" },
  開発経験: { reading: "かいはつけいけん", meaning: "개발 경험", level: "N2", example: "開発経験を積む" },
  貴社: { reading: "きしゃ", meaning: "귀사", level: "N2", example: "貴社で働く" },
  製品改善: { reading: "せいひんかいぜん", meaning: "제품 개선", level: "N2", example: "製品改善に取り組む" },
  貢献: { reading: "こうけん", meaning: "공헌", level: "N2", example: "社会に貢献する" },
  意見: { reading: "いけん", meaning: "의견", level: "N2", example: "意見を交換する" },
  対立: { reading: "たいりつ", meaning: "대립", level: "N2", example: "意見が対立する" },
  対応: { reading: "たいおう", meaning: "대응", level: "N2", example: "状況に対応する" },
  立場: { reading: "たちば", meaning: "입장", level: "N2", example: "相手の立場を理解する" },
  目的: { reading: "もくてき", meaning: "목적", level: "N2", example: "目的を共有する" },
  妥協案: { reading: "だきょうあん", meaning: "절충안", level: "N1", example: "妥協案を提示する" },
  提案: { reading: "ていあん", meaning: "제안", level: "N2", example: "改善案を提案する" },
  台風: { reading: "たいふう", meaning: "태풍", level: "N2", example: "台風の影響" },
  影響: { reading: "えいきょう", meaning: "영향", level: "N2", example: "天候の影響を受ける" },
  出発予定: { reading: "しゅっぱつよてい", meaning: "출발 예정", level: "N2", example: "出発予定を確認する" },
  変更: { reading: "へんこう", meaning: "변경", level: "N2", example: "予定を変更する" },
  別便: { reading: "べつびん", meaning: "다른 항공편", level: "N2", example: "別便を案内する" },
  振替手続: { reading: "ふりかえてつづき", meaning: "대체 수속", level: "N1", example: "振替手続きを進める" },
  可能: { reading: "かのう", meaning: "가능", level: "N2", example: "変更が可能だ" },
  到着時刻: { reading: "とうちゃくじこく", meaning: "도착 시각", level: "N2", example: "到着時刻を連絡する" },
  場合: { reading: "ばあい", meaning: "경우", level: "N2", example: "雨の場合は中止" },
  事前連絡: { reading: "じぜんれんらく", meaning: "사전 연락", level: "N2", example: "事前連絡を入れる" },
  安心: { reading: "あんしん", meaning: "안심", level: "N2", example: "その方が安心だ" },
  必要: { reading: "ひつよう", meaning: "필요", level: "N2", example: "準備が必要だ" },
  連絡文: { reading: "れんらくぶん", meaning: "연락문", level: "N1", example: "連絡文を作成する" },
  作成: { reading: "さくせい", meaning: "작성", level: "N2", example: "資料を作成する" },
};

const sceneListEl = document.getElementById("sceneList");
const kanjiListEl = document.getElementById("kanjiList");
const kanjiCountEl = document.getElementById("kanjiCount");
const statSummaryEl = document.getElementById("statSummary");
const meterFillEl = document.getElementById("meterFill");
const levelFilterEl = document.getElementById("levelFilter");
const searchInputEl = document.getElementById("searchInput");
const shuffleBtnEl = document.getElementById("shuffleBtn");
const furiganaToggleEl = document.getElementById("furiganaToggle");
const translationToggleEl = document.getElementById("translationToggle");
const newQuizBtnEl = document.getElementById("newQuizBtn");
const quizQuestionEl = document.getElementById("quizQuestion");
const quizOptionsEl = document.getElementById("quizOptions");
const quizFeedbackEl = document.getElementById("quizFeedback");

const MASTERED_KEY = "jlpt_dialogue_mastered_terms_v1";

const state = {
  level: "ALL",
  search: "",
  showFurigana: true,
  showTranslation: true,
  focusSceneId: null,
  mastered: loadMasteredTerms(),
  quiz: null,
};

function loadMasteredTerms() {
  try {
    const raw = localStorage.getItem(MASTERED_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed);
  } catch (error) {
    return new Set();
  }
}

function persistMasteredTerms() {
  localStorage.setItem(MASTERED_KEY, JSON.stringify([...state.mastered]));
}

function uniqueTermsFromScenes(scenes) {
  const termSet = new Set();
  for (const scene of scenes) {
    for (const line of scene.lines) {
      for (const term of line.terms) {
        if (glossary[term]) {
          termSet.add(term);
        }
      }
    }
  }
  return [...termSet];
}

function shuffleArray(input) {
  const arr = [...input];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getFilteredScenes() {
  const query = state.search.trim().toLowerCase();
  let scenes = dialogues.filter((scene) => {
    if (state.level === "ALL") return true;
    return scene.level === state.level;
  });

  if (query) {
    scenes = scenes.filter((scene) => {
      const sceneTarget = `${scene.title} ${scene.context}`.toLowerCase();
      if (sceneTarget.includes(query)) return true;
      return scene.lines.some((line) => {
        if (line.jp.toLowerCase().includes(query)) return true;
        return line.terms.some((term) => term.toLowerCase().includes(query));
      });
    });
  }

  if (state.focusSceneId) {
    const idx = scenes.findIndex((scene) => scene.id === state.focusSceneId);
    if (idx > 0) {
      const [picked] = scenes.splice(idx, 1);
      scenes.unshift(picked);
    }
  }

  return scenes;
}

function renderScenes(scenes) {
  sceneListEl.innerHTML = "";
  if (scenes.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "조건에 맞는 대화가 없습니다. 검색어나 레벨 필터를 바꿔보세요.";
    sceneListEl.appendChild(empty);
    return;
  }

  for (const scene of scenes) {
    const card = document.createElement("article");
    card.className = "scene-card";

    const head = document.createElement("div");
    head.className = "scene-head";

    const title = document.createElement("h3");
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
        const item = glossary[term];
        if (!item) continue;
        const chip = document.createElement("span");
        chip.className = `term-chip ${item.level.toLowerCase()}`;
        chip.textContent = `${term}(${item.reading})`;
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
  const sorted = [...terms].sort((a, b) => {
    const levelDiff = glossary[a].level.localeCompare(glossary[b].level);
    if (levelDiff !== 0) return levelDiff;
    return a.localeCompare(b, "ja");
  });

  kanjiCountEl.textContent = `${sorted.length}개`;

  for (const term of sorted) {
    const info = glossary[term];
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
    meta.textContent = `${info.reading} | ${info.meaning}`;

    const example = document.createElement("div");
    example.className = "kanji-example";
    example.textContent = `例) ${info.example}`;

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
  if (visibleTerms.length === 0) {
    statSummaryEl.textContent = "표시 중인 한자가 없습니다.";
    meterFillEl.style.width = "0%";
    return;
  }
  const masteredCount = visibleTerms.filter((term) => state.mastered.has(term)).length;
  const percent = Math.round((masteredCount / visibleTerms.length) * 100);
  statSummaryEl.textContent = `완료 ${masteredCount} / ${visibleTerms.length} (${percent}%)`;
  meterFillEl.style.width = `${percent}%`;
}

function buildQuiz(visibleTerms) {
  const pool = visibleTerms.length >= 4 ? visibleTerms : Object.keys(glossary);
  if (pool.length < 4) {
    state.quiz = null;
    return;
  }

  const answerTerm = pool[Math.floor(Math.random() * pool.length)];
  const answerInfo = glossary[answerTerm];
  const distractors = shuffleArray(pool.filter((term) => term !== answerTerm))
    .slice(0, 3)
    .map((term) => glossary[term].meaning);
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
    quizQuestionEl.textContent = "문제를 만들 수 없습니다.";
    return;
  }

  quizQuestionEl.textContent = `「${state.quiz.term}」 (${state.quiz.reading}) 의 뜻은?`;

  for (const option of state.quiz.options) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "quiz-option";
    btn.textContent = option;
    btn.disabled = state.quiz.chosen !== null;
    btn.addEventListener("click", () => handleQuizAnswer(option));
    quizOptionsEl.appendChild(btn);
  }
}

function handleQuizAnswer(chosen) {
  if (!state.quiz || state.quiz.chosen !== null) return;

  state.quiz.chosen = chosen;
  const isCorrect = chosen === state.quiz.answer;
  const optionButtons = [...quizOptionsEl.querySelectorAll(".quiz-option")];

  for (const btn of optionButtons) {
    if (btn.textContent === state.quiz.answer) {
      btn.classList.add("correct");
    } else if (btn.textContent === chosen) {
      btn.classList.add("wrong");
    }
    btn.disabled = true;
  }

  if (isCorrect) {
    quizFeedbackEl.textContent = `정답! 예문: ${state.quiz.example}`;
    quizFeedbackEl.classList.add("ok");
  } else {
    quizFeedbackEl.textContent = `오답. 정답은 "${state.quiz.answer}" 입니다. 예문: ${state.quiz.example}`;
    quizFeedbackEl.classList.add("bad");
  }
}

function updateLevelFilterUi() {
  const buttons = levelFilterEl.querySelectorAll("button[data-level]");
  buttons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.level === state.level);
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
    if (scenes.length === 0) return;
    const picked = scenes[Math.floor(Math.random() * scenes.length)];
    state.focusSceneId = picked.id;
    updateUI();
  });

  newQuizBtnEl.addEventListener("click", () => {
    const scenes = getFilteredScenes();
    buildQuiz(uniqueTermsFromScenes(scenes));
    renderQuiz();
  });
}

function init() {
  attachEvents();
  updateUI();
}

init();
