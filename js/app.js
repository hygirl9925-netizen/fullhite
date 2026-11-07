/* 라떼드레스룸 공통 스크립트: 헤더·하단탭·푸터·카카오 버튼 자동 삽입 */

// ▼ 사업자 정보 — 실제 정보로 바꿔 주세요
const SITE = {
  name: '라떼드레스룸',
  tel: '010-0000-0000',
  kakao: '#',               // 카카오톡 채널 채팅 주소 (예: https://pf.kakao.com/_xxxx/chat)
  company: '(상호 입력)',
  ceo: '(대표자 입력)',
  bizNo: '(사업자등록번호 입력)',
  saleNo: '(통신판매업 신고번호 입력)',
  address: '(주소 입력)',
  email: '(이메일 입력)',
  privacyOfficer: '(개인정보 보호책임자 입력)'
};

const NAV = [
  { href: 'index.html', label: '홈', icon: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z' },
  { href: 'estimate.html', label: '견적·도면', icon: 'M4 3h12l4 4v14H4z M8 11h8 M8 15h8 M8 7h4' },
  { href: 'cases.html', label: '갤러리', icon: 'M3 5h18v14H3z M3 15l5-5 4 4 3-3 6 6', sub: [
    { href: 'cases.html', label: '시공사례' },
    { href: 'reviews.html', label: '시공후기' }
  ]},
  { href: 'qa.html', label: 'Q&A', icon: 'M12 21a9 9 0 1 0-9-9c0 1.6.4 3 1.1 4.3L3 21l4.7-1.1A9 9 0 0 0 12 21z M9.5 9.5a2.5 2.5 0 1 1 3.3 2.4c-.5.2-.8.7-.8 1.2V14 M12 17h.01' },
  { href: 'my.html', label: '마이', icon: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21c0-4 4-6 8-6s8 2 8 6' }
];

(function layout(){
  const page = location.pathname.split('/').pop() || 'index.html';
  const isOn = n => n.href === page || (n.sub && n.sub.some(s => s.href === page));

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `<div class="wrap nav">
    <a class="logo" href="index.html"><i aria-hidden="true"></i>${SITE.name}</a>
    <ul class="menu">${NAV.map(n => `<li><a href="${n.href}" class="${isOn(n)?'on':''}">${n.label}</a>${
      n.sub ? `<ul class="sub">${n.sub.map(s=>`<li><a href="${s.href}">${s.label}</a></li>`).join('')}</ul>` : ''}</li>`).join('')}</ul>
  </div>`;
  document.body.prepend(header);

  const tab = document.createElement('nav');
  tab.className = 'tabbar';
  tab.setAttribute('aria-label','하단 메뉴');
  tab.innerHTML = `<ul>${NAV.map(n=>`<li><a href="${n.href}" class="${isOn(n)?'on':''}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${n.icon}"/></svg>${n.label}</a></li>`).join('')}</ul>`;
  document.body.append(tab);

  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `<div class="wrap">
    <div class="top">
      <div><div>고객센터</div><div class="tel">${SITE.tel}</div><div class="small">평일 09:00–18:00 · 주말·공휴일 휴무</div></div>
      <div class="links"><a href="terms.html">이용약관</a><span>|</span><a href="privacy.html"><b>개인정보처리방침</b></a></div>
    </div>
    <dl>
      <div><dt>상호</dt><dd>${SITE.company}</dd></div>
      <div><dt>대표</dt><dd>${SITE.ceo}</dd></div>
      <div><dt>사업자등록번호</dt><dd>${SITE.bizNo}</dd></div>
      <div><dt>통신판매업 신고번호</dt><dd>${SITE.saleNo}</dd></div>
      <div><dt>주소</dt><dd>${SITE.address}</dd></div>
      <div><dt>이메일</dt><dd>${SITE.email}</dd></div>
      <div><dt>개인정보 보호책임자</dt><dd>${SITE.privacyOfficer}</dd></div>
    </dl>
    <p class="small" style="margin-top:14px">© ${new Date().getFullYear()} ${SITE.name}. All rights reserved.</p>
  </div>`;
  document.body.append(footer);

  const k = document.createElement('a');
  k.className = 'kakao'; k.href = SITE.kakao; k.target = '_blank'; k.rel = 'noopener';
  k.textContent = '카카오 상담';
  document.body.append(k);
})();

/* 공통 도우미 */
const won = n => Math.round(n).toLocaleString('ko-KR') + '원';
const store = {
  get(k, d){ try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

/* 색상 정의 (갤러리·견적·홈에서 공용) */
const FRAME_COLORS = [
  { id:'silver', name:'실버', hex:'#c4c8cc' },
  { id:'white',  name:'화이트', hex:'#f4f4f2' },
  { id:'black',  name:'블랙', hex:'#262626' },
  { id:'gold',   name:'샴페인 골드', hex:'#c9b48a' }
];
const SHELF_COLORS = [
  { id:'latteOak',  name:'라떼 오크', hex:'#d9c3a1' },
  { id:'milk',      name:'밀크 화이트', hex:'#f3f1ec' },
  { id:'maple',     name:'메이플', hex:'#e3c48f' },
  { id:'espresso',  name:'에스프레소', hex:'#5a3d2b' },
  { id:'charcoal',  name:'차콜', hex:'#3d3f42' },
  { id:'warmGray',  name:'웜 그레이', hex:'#8f8a84' },
  { id:'sage',      name:'세이지 그린', hex:'#a7b8a1' }
];
const colorName = (list,id) => (list.find(c=>c.id===id)||{}).name || id;
const colorHex  = (list,id) => (list.find(c=>c.id===id)||{}).hex || '#ccc';

/* 행거 미니 도면 SVG (갤러리 카드·견적 결과 공용) */
function hangerSVG(shape, frameHex, shelfHex){
  const walls = { '11자':[[20,20,180,20],[20,100,180,100]], 'ㅡ자':[[20,20,180,20]],
    'ㄱ자':[[20,20,180,20],[20,20,20,100]], 'ㄷ자':[[20,20,180,20],[20,20,20,100],[180,20,180,100]],
    'ㅁ자':[[20,20,180,20],[20,20,20,100],[180,20,180,100],[20,100,120,100]] }[shape] || [[20,20,180,20]];
  const lines = walls.map(([x1,y1,x2,y2]) => {
    const horiz = y1===y2, off = (y1>50 && horiz) ? -10 : (x1>100 && !horiz) ? -10 : 10;
    const sx1 = horiz?x1:x1+off, sx2 = horiz?x2:x2+off, sy1 = horiz?y1+off:y1, sy2 = horiz?y2+off:y2;
    return `<line x1="${sx1}" y1="${sy1}" x2="${sx2}" y2="${sy2}" stroke="${shelfHex}" stroke-width="14"/>
      <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${frameHex}" stroke-width="4"/>`;
  }).join('');
  return `<svg viewBox="0 0 200 120" role="img" aria-label="${shape} 평면도"><rect x="4" y="4" width="192" height="112" rx="6" fill="none" stroke="currentColor" stroke-opacity=".15"/>${lines}</svg>`;
}
