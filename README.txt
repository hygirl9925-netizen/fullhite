라떼드레스룸 홈페이지 (풀하이트 폴더)

[여는 방법]
index.html 을 더블클릭하면 브라우저에서 열립니다.

[페이지 구성]
index.html     홈
estimate.html  견적·도면 (5단계 계산기 → 주문 신청 → 신청번호 발급)
cases.html     갤러리 > 시공사례 (필터 + 상세)
reviews.html   갤러리 > 시공후기
qa.html        Q&A (카테고리 + 검색)
my.html        마이 (회원: 내 주문 / 비회원: 신청번호로 조회)
login.html     카카오로 시작하기
admin.html     관리자 (주문 관리·상태 변경·메모·회원 목록·CSV)
terms.html     이용약관
privacy.html   개인정보처리방침

[꼭 바꿔야 할 파일]
js/app.js             맨 위 SITE 부분: 전화번호, 카카오 채널 주소, 사업자 정보
js/estimate-price.js  단가표, 옵션 가격, 지역별 배송비 (지금은 예시 값)
js/data.js            시공사례·후기 (지금은 예시 데이터)
                      사진은 images/cases 폴더에 넣고 photo 칸에 경로를 적으면 됩니다.
qa.html               자주 묻는 질문 내용
terms.html, privacy.html  약관 양식

[주문 데이터베이스 (Supabase)]
주문 신청은 Supabase 프로젝트 'latte-dressroom' 의 orders 테이블에 저장됩니다.
- 주문 확인: supabase.com 로그인 → latte-dressroom → Table Editor → orders
- 진행 상태 바꾸기: status 칸을 '신청 접수 / 도면 확정·결제 / 일정 확정 / 설치 완료 / 취소' 중 하나로 수정
  → 고객이 마이 페이지에서 바뀐 상태를 바로 확인합니다.
- 연결 설정: js/db.js

[카카오 로그인 설정 — 한 번만 하면 됩니다]
1) developers.kakao.com → 내 애플리케이션 → 애플리케이션 추가 (앱 이름: 라떼드레스룸)
2) 앱 키에서 'REST API 키' 복사
3) 카카오 로그인 → 활성화 ON
   Redirect URI 에 https://ddyysnljrmlsetuwznph.supabase.co/auth/v1/callback 등록
4) 카카오 로그인 → 보안 → Client Secret 코드 생성, 활성화 → 코드 복사
5) 동의항목: 닉네임(필수), 프로필 사진(선택), 카카오계정(이메일)(필수 또는 선택)
   ※ 이메일 항목은 '비즈 앱'으로 전환해야 켜집니다 (앱 설정 → 비즈니스 → 사업자 정보 등록)
6) supabase.com → latte-dressroom → Authentication → Sign In / Providers → Kakao
   Enabled ON, REST API Key 와 Client Secret 붙여넣기 → Save
7) Authentication → URL Configuration
   Site URL 과 Redirect URLs 에 사이트 주소 등록 (예: https://latte-dressroom.netlify.app/**)
※ 카카오 로그인은 사이트를 인터넷에 배포한 뒤에 동작합니다 (파일을 더블클릭해 연 상태에선 안 됨).

[관리자 등록]
사장님이 사이트에서 카카오로 한 번 로그인한 뒤 admin.html 에 들어가면 '회원 번호'가 보입니다.
그 번호를 Claude에게 알려 주면 관리자로 등록해 드립니다.
