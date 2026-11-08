/* 회원 로그인 — 카카오로 시작하기 + 전화번호·비밀번호 (db.js 다음에 로드) */

/* 전화번호 회원은 내부적으로 '전화번호@도메인' 형식의 아이디로 저장됩니다.
   실제로 메일을 보내지 않으므로, Supabase에서 'Confirm email'을 꺼 두어야 합니다. */
const PHONE_ID_DOMAIN = 'member.fullhite.app';
const onlyDigits = s => String(s || '').replace(/[^0-9]/g, '');
const phoneToId = p => `${onlyDigits(p)}@${PHONE_ID_DOMAIN}`;
const isPhoneUser = u => !!(u && u.email && u.email.endsWith('@' + PHONE_ID_DOMAIN));
const fmtPhone = p => onlyDigits(p).replace(/^(\d{3})(\d{3,4})(\d{4})$/, '$1-$2-$3');

async function currentUser(){
  const { data } = await sb.auth.getSession();
  return data.session ? data.session.user : null;
}
function displayName(u){
  if(!u) return '';
  const m = u.user_metadata || {};
  return m.name || m.nickname || m.full_name || m.preferred_username || (isPhoneUser(u) ? fmtPhone(m.phone || u.email) : (u.email ? u.email.split('@')[0] : '회원'));
}
function userPhone(u){ return u ? ((u.user_metadata || {}).phone || (isPhoneUser(u) ? u.email.split('@')[0] : '')) : ''; }

function authError(error){
  const m = (error && error.message) || '';
  if(/Invalid login credentials/i.test(m)) return new Error('전화번호 또는 비밀번호가 맞지 않습니다.');
  if(/already registered|already exists/i.test(m)) return new Error('이미 가입된 전화번호입니다. 로그인해 주세요.');
  if(/Password should be at least/i.test(m)) return new Error('비밀번호는 6자 이상으로 입력해 주세요.');
  if(/provider is not enabled/i.test(m)) return new Error('카카오 로그인 준비 중입니다. 전화번호로 로그인해 주세요.');
  if(/rate limit|too many/i.test(m)) return new Error('요청이 많습니다. 잠시 후 다시 시도해 주세요.');
  if(/Email not confirmed/i.test(m)) return new Error('가입 승인 대기 중입니다. 고객센터로 문의해 주세요.');
  return dbError(error);
}

/* 카카오 */
async function kakaoLogin(next){
  if(location.protocol === 'file:') throw new Error('카카오 로그인은 인터넷에 배포된 사이트에서만 사용할 수 있습니다.');
  const back = new URL(next || 'my.html', location.href).href;
  const { error } = await sb.auth.signInWithOAuth({ provider: 'kakao', options: { redirectTo: back } });
  if(error) throw authError(error);
}

/* 전화번호 회원가입 · 로그인 */
async function phoneSignUp({ name, phone, password, marketing }){
  const digits = onlyDigits(phone);
  if(!name.trim()) throw new Error('이름을 입력해 주세요.');
  if(!/^01[0-9]{8,9}$/.test(digits)) throw new Error('휴대폰 번호를 정확히 입력해 주세요.');
  if(password.length < 6) throw new Error('비밀번호는 6자 이상으로 입력해 주세요.');
  const { data, error } = await sb.auth.signUp({
    email: phoneToId(digits), password,
    options: { data: { name: name.trim(), phone: digits, marketing: !!marketing } }
  });
  if(error) throw authError(error);
  // 이미 가입된 번호면 Supabase는 빈 identities 를 돌려줍니다
  if(data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0)
    throw new Error('이미 가입된 전화번호입니다. 로그인해 주세요.');
  if(!data.session) throw new Error('가입은 접수됐지만 바로 로그인하지 못했습니다. 잠시 후 로그인해 주세요.');
  return data.user;
}
async function phoneLogin(phone, password){
  const digits = onlyDigits(phone);
  if(!/^01[0-9]{8,9}$/.test(digits)) throw new Error('휴대폰 번호를 정확히 입력해 주세요.');
  if(!password) throw new Error('비밀번호를 입력해 주세요.');
  const { data, error } = await sb.auth.signInWithPassword({ email: phoneToId(digits), password });
  if(error) throw authError(error);
  return data.user;
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
      : `<a href="login.html" class="btn sm-btn">로그인</a>`;
  };
  paint(await currentUser());
  sb.auth.onAuthStateChange((_e, session) => paint(session ? session.user : null));
})();
