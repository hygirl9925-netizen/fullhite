/* ▼ 시공사례·후기 데이터 — 모두 예시입니다. 실제 시공 건으로 바꿔 주세요.
   photo: 사진 파일 경로 (images/cases/파일명.jpg). 비워 두면 평면도 그림이 대신 표시됩니다. */
const CASES = [
  { no:128, frame:'white',  shelf:'latteOak', use:'드레스룸', shape:'ㄷ자', price:1380000, area:'경기 안산시', drawing:true,  photo:'', parts:'선반 6단 ×2, 서랍장 3단 ×2, 거울장 ×1, 행거봉 2단' },
  { no:127, frame:'black',  shelf:'espresso', use:'드레스룸', shape:'ㄱ자', price:890000,  area:'서울 송파구', drawing:true,  photo:'', parts:'선반 5단 ×1, 서랍장 4단 ×1, 바지걸이 ×1' },
  { no:126, frame:'silver', shelf:'milk',     use:'팬트리',   shape:'ㅡ자', price:420000,  area:'인천 연수구', drawing:false, photo:'', parts:'선반 7단 ×2, 공간박스 ×2' },
  { no:125, frame:'gold',   shelf:'maple',    use:'드레스룸', shape:'ㅁ자', price:2150000, area:'경기 수원시 영통구', drawing:true, photo:'', parts:'아일랜드장 ×1, 화장대 ×1, 서랍장 3단 ×3, 악세사리장 ×1' },
  { no:124, frame:'white',  shelf:'warmGray', use:'드레스룸', shape:'11자', price:1060000, area:'경기 화성시 동탄', drawing:true, photo:'', parts:'선반 6단 ×2, 서랍장 2단 ×2, 이불장 긴장 ×1' },
  { no:123, frame:'silver', shelf:'charcoal', use:'팬트리',   shape:'ㄱ자', price:640000,  area:'서울 마포구', drawing:false, photo:'', parts:'선반 6단 ×2, 코너 선반 세트 ×1' },
  { no:122, frame:'black',  shelf:'charcoal', use:'드레스룸', shape:'ㅡ자', price:480000,  area:'경기 시흥시', drawing:false, photo:'', parts:'선반 5단 ×1, 행거봉 2단, 공간박스 ×1' },
  { no:121, frame:'white',  shelf:'sage',     use:'드레스룸', shape:'ㄱ자', price:930000,  area:'경기 용인시 기흥구', drawing:true, photo:'', parts:'선반 5단 ×1, 서랍장 3단 ×1, 거울장 ×1' },
  { no:120, frame:'gold',   shelf:'latteOak', use:'드레스룸', shape:'ㄷ자', price:1640000, area:'서울 강남구', drawing:true, photo:'', parts:'선반 7단 ×2, 서랍장 4단 ×2, 화장대 ×1' },
  { no:119, frame:'silver', shelf:'latteOak', use:'팬트리',   shape:'11자', price:760000,  area:'경기 광명시', drawing:false, photo:'', parts:'선반 6단 ×3, 이불장 반장 ×1' },
  { no:118, frame:'white',  shelf:'milk',     use:'드레스룸', shape:'ㄱ자', price:820000,  area:'경기 안산시 단원구', drawing:true, photo:'', parts:'선반 5단 ×1, 서랍장 2단 ×1, 바지걸이 ×1' },
  { no:117, frame:'black',  shelf:'warmGray', use:'드레스룸', shape:'ㄷ자', price:1290000, area:'인천 서구 청라', drawing:true, photo:'', parts:'선반 6단 ×2, 서랍장 3단 ×2, 악세사리장 ×1' }
];

const REVIEWS = [
  { case:128, stars:5, name:'김**', date:'2026-10-28', title:'전셋집이라 걱정했는데 벽이 멀쩡해요', body:'타공을 안 한다고 해서 반신반의했는데 설치 끝나고 흔들어 봐도 꿈쩍 안 합니다. 겨울 패딩까지 다 걸었는데 처짐이 없어요.' },
  { case:125, stars:5, name:'이**', date:'2026-10-19', title:'아일랜드장 넣길 잘했어요', body:'방 가운데 아일랜드장을 두니 가방이랑 시계 정리가 한 번에 끝났습니다. 골드 프레임이 조명 받으면 예뻐요.' },
  { case:124, stars:4, name:'박**', date:'2026-10-11', title:'설치 기사님이 꼼꼼하셨어요', body:'천장이 조금 기울어 있었는데 하나하나 수평 맞춰 주셨어요. 일정이 하루 밀린 건 아쉬웠지만 결과물은 만족합니다.' },
  { case:121, stars:5, name:'최**', date:'2026-09-30', title:'세이지 그린 선반 색이 화면이랑 똑같아요', body:'색이 튀면 어쩌나 했는데 화이트 프레임이랑 잘 어울립니다. 거울장도 넉넉해요.' },
  { case:126, stars:5, name:'정**', date:'2026-09-22', title:'팬트리가 정리되니 주방이 넓어졌어요', body:'7단 선반 두 개로 라면 박스, 생수, 키친타월까지 다 들어갑니다. 높이 조절이 쉬워서 좋아요.' },
  { case:118, stars:4, name:'한**', date:'2026-09-14', title:'가격 대비 튼튼합니다', body:'다른 곳 견적보다 저렴했는데 기둥이 두꺼워서 놀랐어요. 바지걸이는 하나 더 할 걸 그랬네요.' }
];
