/* 견적 계산 로직 */
const state = {
  use: '드레스룸', shape: 'ㄱ자', unit: 'mm',
  walls: { A: 2400, B: 1800, C: 1800, D: 1200 },
  qty: { drawer3: 1, shelf5: 1 }
};
const WALLS_BY_SHAPE = { 'ㅡ자':['A'], '11자':['A','B'], 'ㄱ자':['A','B'], 'ㄷ자':['A','B','C'], 'ㅁ자':['A','B','C','D'] };
const WALL_NAMES = { A:'A면 (정면)', B:'B면', C:'C면', D:'D면' };
const $ = id => document.getElementById(id);

function chips(group, values){
  const el = document.querySelector(`[data-group="${group}"]`);
  el.innerHTML = values.map(v=>`<button type="button" class="chip" aria-pressed="${state[group]===v}" data-v="${v}">${v}</button>`).join('');
  el.onclick = e => {
    const b = e.target.closest('.chip'); if(!b) return;
    if(group==='unit') convertUnit(b.dataset.v);
    state[group] = b.dataset.v;
    chips(group, values); renderDims(); calc();
  };
}

function convertUnit(next){
  if(next===state.unit) return;
  const f = next==='cm' ? 0.1 : 10;
  for(const k in state.walls) state.walls[k] = Math.round(state.walls[k]*f);
  $('h').value = Math.round((+$('h').value||0)*f);
}

function renderDims(){
  const min = state.unit==='mm'?500:50, max = state.unit==='mm'?10000:1000;
  $('dims').innerHTML = WALLS_BY_SHAPE[state.shape].map(k=>`<label for="w${k}">${WALL_NAMES[k]} (${state.unit})
    <input id="w${k}" data-wall="${k}" type="number" inputmode="numeric" min="${min}" max="${max}" value="${state.walls[k]}"></label>`).join('');
  $('dimHint').textContent = `각 벽면 폭을 ${min.toLocaleString()}~${max.toLocaleString()}${state.unit} 범위로 입력하세요.`;
  $('dims').querySelectorAll('input').forEach(i=>i.oninput = ()=>{ state.walls[i.dataset.wall] = +i.value||0; calc(); });
}

function renderOptions(){
  $('optGroups').innerHTML = OPTIONS.map(g=>`<p class="sub-h" style="margin-top:8px">${g.group}</p><div class="opts">${
    g.items.map(o=>`<div class="opt"><span class="nm">${o.name}${o.desc?`<small>${o.desc}</small>`:''}<small>${won(o.price)}</small></span>
      <span class="qty"><button type="button" data-id="${o.id}" data-d="-1" aria-label="${o.name} 빼기">−</button><output id="q_${o.id}">${state.qty[o.id]||0}</output><button type="button" data-id="${o.id}" data-d="1" aria-label="${o.name} 더하기">+</button></span></div>`).join('')
  }</div>`).join('');
  $('optGroups').onclick = e => {
    const b = e.target.closest('button[data-id]'); if(!b) return;
    const id = b.dataset.id, n = Math.max(0, Math.min(10, (state.qty[id]||0) + +b.dataset.d));
    state.qty[id] = n; $('q_'+id).textContent = n; calc();
  };
}

function toMeters(v){ return state.unit==='mm' ? v/1000 : v/100; }

let last = null;
function calc(){
  const walls = WALLS_BY_SHAPE[state.shape].map(k=>({ k, m: toMeters(state.walls[k]||0) }));
  const totalM = walls.reduce((s,w)=>s+w.m,0);
  const rows = [];
  let sum = 0;
  const base = totalM * PRICE.perMeter[state.use];
  rows.push([`기본 구성 ${totalM.toFixed(2)}m`, base]); sum += base;
  const corner = PRICE.corner[state.shape];
  if(corner){ rows.push([`${state.shape} 코너 부자재`, corner]); sum += corner; }
  const hMm = state.unit==='mm' ? +$('h').value : +$('h').value*10;
  if(hMm > 2500){ const x = base*PRICE.highCeilingRate; rows.push(['높은 천장 추가', x]); sum += x; }
  OPTIONS.forEach(g=>g.items.forEach(o=>{ const q = state.qty[o.id]||0; if(q){ rows.push([`${o.name} × ${q}`, o.price*q]); sum += o.price*q; }}));
  rows.push(['기본 설치비', PRICE.install]); sum += PRICE.install;

  const reg = REGIONS.find(r=>r[0]===$('region').value);
  let blocked = false;
  if(reg){ if(reg[1]===null) blocked = true; else if(reg[1]) { rows.push([`${reg[0]} 배송비`, reg[1]]); sum += reg[1]; } }
  if($('newApt').checked){ rows.push(['신축아파트 보양·신고', PRICE.newApt]); sum += PRICE.newApt; }
  if(sum < PRICE.minimum){ rows.push(['최소 주문 금액 적용', PRICE.minimum - sum]); sum = PRICE.minimum; }
  sum = Math.round(sum/1000)*1000;

  $('total').textContent = blocked ? '배송 불가 지역' : won(sum);
  $('breakdown').innerHTML = rows.map(([n,v])=>`<tr><td>${n}</td><td>${won(v)}</td></tr>`).join('');
  $('plan').innerHTML = hangerSVG(state.shape, colorHex(FRAME_COLORS,$('frame').value), colorHex(SHELF_COLORS,$('shelf').value))
    + `<div class="small" style="text-align:center">${walls.map(w=>`${w.k} ${state.walls[w.k].toLocaleString()}${state.unit}`).join(' · ')}</div>`;
  const regionMissing = !$('region').value;
  $('orderBtn').disabled = blocked || regionMissing;
  $('orderBtn').textContent = regionMissing ? '배송 지역을 선택하세요' : blocked ? '배송 불가 지역입니다' : '주문 신청하기';
  last = { use:state.use, shape:state.shape, unit:state.unit, walls:walls.map(w=>[w.k,state.walls[w.k]]),
    height:+$('h').value, frame:$('frame').value, shelf:$('shelf').value, qty:{...state.qty},
    region:$('region').value, newApt:$('newApt').checked, total:sum, rows };
}

/* 초기화 */
chips('use', ['드레스룸','팬트리']);
chips('shape', ['ㅡ자','ㄱ자','ㄷ자','ㅁ자','11자']);
chips('unit', ['mm','cm']);
$('frame').innerHTML = FRAME_COLORS.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
$('shelf').innerHTML = SHELF_COLORS.map(c=>`<option value="${c.id}">${c.name}</option>`).join('');
$('region').innerHTML = '<option value="">지역 미선택</option>' + REGIONS.map(([n,v])=>`<option value="${n}">${n}${v===null?' (배송 불가)':v?` (+${won(v)})`:''}</option>`).join('');
$('regionList').innerHTML = REGIONS.map(([n,v])=>`<li>${n}: ${v===null?'배송 불가':v?'+'+won(v):'무료'}</li>`).join('');
renderDims(); renderOptions();
['h','frame','shelf','region','newApt'].forEach(id=>$(id).addEventListener('input', calc));
$('newApt').addEventListener('change', calc);
$('kakaoBtn').href = SITE.kakao; $('kakaoAfter').href = SITE.kakao;
calc();

/* 주문 신청 */
const modal = $('orderModal');
$('orderBtn').onclick = () => { $('orderForm').hidden = false; $('orderDone').hidden = true; modal.hidden = false; };
modal.addEventListener('click', e => { if(e.target===modal || e.target.hasAttribute('data-close')) modal.hidden = true; });
document.addEventListener('keydown', e => { if(e.key==='Escape') modal.hidden = true; });

$('submitOrder').onclick = async () => {
  const name = $('oName').value.trim(), phone = $('oPhone').value.replace(/[^0-9]/g,'');
  if(!name) return $('oErr').textContent = '이름을 입력해 주세요.';
  if(phone.length < 10) return $('oErr').textContent = '연락처를 숫자 10~11자리로 입력해 주세요.';
  if(!$('oAgree').checked) return $('oErr').textContent = '개인정보 수집·이용에 동의해 주세요.';
  $('oErr').textContent = '';
  const btn = $('submitOrder');
  btn.disabled = true; btn.textContent = '접수 중…';
  try {
    const no = await createOrder({ name, phone, addr:$('oAddr').value, date:$('oDate').value, memo:$('oMemo').value, estimate:last });
    $('orderNo').textContent = no;
    $('orderForm').hidden = true; $('orderDone').hidden = false;
  } catch(err) {
    $('oErr').textContent = err.message;
  } finally {
    btn.disabled = false; btn.textContent = '신청하기';
  }
};
