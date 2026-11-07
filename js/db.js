/* Supabase 연결 — 주문·회원·관리자 공용
   공개용(publishable) 키라 홈페이지에 넣어도 됩니다.
   누가 무엇을 볼 수 있는지는 데이터베이스 권한(RLS)이 막고 있습니다.
   이 파일 앞에 supabase-js 스크립트가 먼저 로드되어야 합니다. */
const DB = {
  url: 'https://ddyysnljrmlsetuwznph.supabase.co',
  key: 'sb_publishable_CZooVU3J9zelX3B4_bmQ9A_CKNh04Nv'
};
const sb = window.supabase.createClient(DB.url, DB.key, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce' }
});

function dbError(error){
  if(!error) return null;
  const m = error.message || '';
  if(/Failed to fetch|NetworkError/i.test(m)) return new Error('서버에 연결하지 못했습니다. 인터넷 연결을 확인해 주세요.');
  return new Error(m || '처리하지 못했습니다. 잠시 후 다시 시도해 주세요.');
}

async function createOrder(o){
  const { data, error } = await sb.rpc('create_order', {
    p_name: o.name, p_phone: o.phone, p_address: o.addr || null,
    p_wish_date: o.date || null, p_memo: o.memo || null, p_estimate: o.estimate || {}
  });
  if(error) throw dbError(error);
  return data;
}
async function lookupOrder(no, phone){
  const { data, error } = await sb.rpc('lookup_order', { p_no: no, p_phone: phone });
  if(error) throw dbError(error);
  return data || [];
}
async function myOrders(){
  const { data, error } = await sb.from('orders')
    .select('order_no,status,created_at,wish_date,estimate,total').order('created_at', { ascending:false });
  if(error) throw dbError(error);
  return data || [];
}
