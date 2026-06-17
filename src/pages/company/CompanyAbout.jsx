import Breadcrumb from '../../components/layout/Breadcrumb'

export default function CompanyAbout() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '회사소개', to: '/company/about' }, { label: '회사소개' }]} />

      <h1 className="text-[32px] font-medium text-[#111111] mb-12">회사소개</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div className="bg-[#f5f5f5] aspect-video flex items-center justify-center">
          <span className="text-[#9e9ea0] text-sm">회사 이미지</span>
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-medium text-[#111111] mb-4">혁신과 신뢰로 미래를 만들어 갑니다</h2>
          <p className="text-base text-[#707072] leading-relaxed mb-4">
            저희 회사는 2010년 설립 이후, 고객의 삶을 더욱 풍요롭게 만드는 혁신적인 제품과 서비스를 제공해 왔습니다.
            품질에 대한 끊임없는 투자와 고객 중심의 경영 철학을 바탕으로 지속적인 성장을 이루고 있습니다.
          </p>
          <p className="text-base text-[#707072] leading-relaxed">
            국내외 시장에서 인정받는 기술력과 서비스로, 고객과 함께 더 나은 미래를 만들어 가겠습니다.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-[#e5e5e5]">
        {[
          { label: '설립연도', value: '2010' },
          { label: '임직원', value: '500+' },
          { label: '거래처', value: '1,200+' },
          { label: '수출국', value: '30+' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-[32px] font-medium text-[#111111] mb-2">{stat.value}</p>
            <p className="text-sm text-[#707072]">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
