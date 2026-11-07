/* 회원 로그인 (카카오로 시작하기) — db.js 다음에 로드 */

const KAKAO_LOGIN_ON = true;   // 카카오 설정 전에 버튼을 숨기려면 false

async function currentUser(){
  const { data } = await sb.auth.getSession();
  return data.session ? data.session.user : null;
}
function displayName(u){
  if(!u) return '';
  const m = u.user_metadata || {};
  return m.name || m.nickname || m.full_name || m.preferred_username || (u.email ? u.email.split('@')[0] : '회원');
}

async function kakaoLogin(next){
  if(location.protocol === 'file:'){
    throw new Error('카카오 로그인은 사이트를 인터넷에 배포한 뒤(예: Netlify 주소) 사용할 수 있습니다.');
  }
  const back = new URL(next || 'my.html', location.href).href;
  const { error } = await sb.auth.signInWithOAuth({ provider: 'kakao', options: { redirectTo: back } });
  if(error) throw dbError(error);
}
async function logout(){
  await sb.auth.signOut();
  location.href = 'index.html';
}

/* 헤더 오른쪽 로그인 상태 표시 */
(async function headerUser(){
  const nav = document.querySelector('.site-header .nav');
  if(!nav) return;
  const box = document.createElement('div');
  box.className = 'user-box';
  nav.append(box);
  const paint = u => {
    box.innerHTML = u
      ? `<a href="my.html" class="user-chip">${displayName(u)}님</a>`
      : `<a href="login.html" class="btn kakao-btn sm"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7l-1 3.6c-.1.4.3.7.6.5l4.3-2.8c.5.1 1 .1 1.4.1 5.5 0 10-3.6 10-8S17.5 3 12 3z"/></svg>로그인</a>`;
  };
  paint(await currentUser());
  sb.auth.onAuthStateChange((_e, session) => paint(session ? session.user : null));
})();
