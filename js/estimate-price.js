/* ▼ 단가표 — 모두 예시 값입니다. 실제 판매가로 바꿔 주세요. (단위: 원) */
const PRICE = {
  // 벽면 폭 1m 당 기본 구성(기둥 + 상단 선반 + 행거봉) 단가
  perMeter: { '드레스룸': 160000, '팬트리': 140000 },
  // 형태별 코너 부자재 비용
  corner: { 'ㅡ자':0, '11자':0, 'ㄱ자':45000, 'ㄷ자':90000, 'ㅁ자':135000 },
  // 천장 높이 2,500mm 초과 시 추가 비율
  highCeilingRate: 0.08,
  // 기본 설치비
  install: 50000,
  // 신축아파트 추가비 (보양·신고 대행)
  newApt: 30000,
  // 최소 주문 금액
  minimum: 300000
};

/* 옵션 그룹 — 이름, 설명, 단가 */
const OPTIONS = [
  { group:'서랍', items:[
    { id:'drawer2', name:'서랍장 2단', price:75000 },
    { id:'drawer3', name:'서랍장 3단', price:98000 },
    { id:'drawer4', name:'서랍장 4단', price:120000 }
  ]},
  { group:'수납장', items:[
    { id:'mirror',  name:'거울장', desc:'전신거울 + 수납', price:110000 },
    { id:'acc',     name:'악세사리장', desc:'유리 상판 칸막이 트레이', price:95000 },
    { id:'island',  name:'아일랜드장', desc:'방 가운데 놓는 양면 서랍장', price:280000 },
    { id:'vanity',  name:'화장대', desc:'상판 + 서랍 1단', price:150000 },
    { id:'box',     name:'공간박스', desc:'하부 오픈 수납', price:40000 }
  ]},
  { group:'선반', items:[
    { id:'shelf4',  name:'선반 4단', price:60000 },
    { id:'shelf5',  name:'선반 5단', price:72000 },
    { id:'shelf6',  name:'선반 6단', price:84000 },
    { id:'shelf7',  name:'선반 7단', price:96000 },
    { id:'cshelf',  name:'코너 선반 세트', desc:'ㄱ·ㄷ자 모서리용', price:70000 }
  ]},
  { group:'걸이 · 수납', items:[
    { id:'pants',   name:'바지걸이', desc:'슬라이딩 레일형', price:55000 },
    { id:'quiltS',  name:'이불장 (반장)', price:65000 },
    { id:'quiltL',  name:'이불장 (긴장)', price:85000 }
  ]}
];

/* 배송 지역별 추가 요금 (null = 배송 불가) */
const REGIONS = [
  ['서울', 0], ['경기', 0], ['인천', 0],
  ['강원', 50000], ['충북', 30000], ['충남', 30000], ['대전', 30000], ['세종', 30000],
  ['전북', 50000], ['전남', 70000], ['광주', 50000],
  ['경북', 50000], ['경남', 70000], ['대구', 50000], ['울산', 70000], ['부산', 70000],
  ['제주', null], ['울릉·독도', null]
];
