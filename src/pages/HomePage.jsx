import { Link } from 'react-router-dom'

export default function HomePage() {
  return (
    <div>
      {/* Hero Banner */}
      <section className="relative bg-[#111111] overflow-hidden" style={{ minHeight: '560px' }}>
        <div className="max-w-[1440px] mx-auto px-6 flex items-end pb-16" style={{ minHeight: '560px' }}>
          <div>
            <p className="text-sm font-medium text-[#9e9ea0] mb-4 uppercase tracking-widest">Welcome</p>
            <h1
              className="text-white uppercase mb-8 leading-[0.9]"
              style={{ fontSize: 'clamp(48px, 8vw, 96px)', fontWeight: 500 }}
            >
              INNOVATE<br />YOUR FUTURE
            </h1>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/products"
                className="inline-block bg-white text-[#111111] text-base font-medium px-8 py-3 rounded-[30px]"
              >
                제품 보기
              </Link>
              <Link
                to="/company/about"
                className="inline-block bg-[#f5f5f5] text-[#111111] text-base font-medium px-8 py-3 rounded-[30px]"
              >
                회사소개
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 회사소개 요약 */}
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-[32px] font-medium text-[#111111] mb-4">회사소개</h2>
          <p className="text-base text-[#707072] max-w-2xl mb-8">
            저희 회사는 혁신적인 제품과 서비스로 고객의 삶을 더욱 풍요롭게 만들어 갑니다.
            신뢰와 품질을 바탕으로 최고의 가치를 제공합니다.
          </p>
          <Link
            to="/company/about"
            className="inline-block bg-[#111111] text-white text-base font-medium px-8 py-3 rounded-[30px]"
          >
            자세히 보기
          </Link>
        </div>
      </section>

      {/* 대표 제품 */}
      <section className="py-12 bg-[#f5f5f5]">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-[32px] font-medium text-[#111111] mb-8">대표 제품</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#f5f5f5] aspect-square flex items-center justify-center">
                <span className="text-[#9e9ea0] text-sm">제품 이미지</span>
              </div>
            ))}
          </div>
          <Link
            to="/products"
            className="inline-block bg-[#111111] text-white text-base font-medium px-8 py-3 rounded-[30px]"
          >
            전체 제품 보기
          </Link>
        </div>
      </section>

      {/* 문의하기 CTA */}
      <section className="py-12 bg-[#111111]">
        <div className="max-w-[1440px] mx-auto px-6 text-center">
          <h2 className="text-[32px] font-medium text-white mb-4">궁금한 점이 있으신가요?</h2>
          <p className="text-base text-[#9e9ea0] mb-8">전문 상담원이 빠르게 답변드립니다.</p>
          <Link
            to="/inquiry"
            className="inline-block bg-white text-[#111111] text-base font-medium px-8 py-3 rounded-[30px]"
          >
            문의하기
          </Link>
        </div>
      </section>

      {/* 최신 게시글 */}
      <section className="py-12 bg-white">
        <div className="max-w-[1440px] mx-auto px-6">
          <h2 className="text-[32px] font-medium text-[#111111] mb-8">최신 게시글</h2>
          <div className="space-y-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-[#e5e5e5]">
                <span className="text-xs font-medium text-[#9e9ea0] w-24 shrink-0">2026-06-16</span>
                <span className="text-base font-medium text-[#111111]">게시글 제목 {i}</span>
              </div>
            ))}
          </div>
          <Link
            to="/posts"
            className="inline-block bg-[#111111] text-white text-base font-medium px-8 py-3 rounded-[30px]"
          >
            게시판 바로가기
          </Link>
        </div>
      </section>
    </div>
  )
}
