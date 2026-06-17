import Breadcrumb from '../../components/layout/Breadcrumb'

export default function CompanyCeo() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '회사소개', to: '/company/about' }, { label: 'CEO 인사말' }]} />
      <h1 className="text-[32px] font-medium text-[#111111] mb-12">CEO 인사말</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1">
          <div className="bg-[#f5f5f5] aspect-square flex items-center justify-center mb-4">
            <span className="text-[#9e9ea0] text-sm">CEO 사진</span>
          </div>
          <p className="text-base font-medium text-[#111111]">홍길동</p>
          <p className="text-sm text-[#707072]">대표이사 CEO</p>
        </div>
        <div className="md:col-span-2 flex flex-col justify-center">
          <p className="text-base text-[#707072] leading-relaxed mb-6">
            안녕하십니까, 저희 회사를 방문해 주신 여러분께 진심으로 감사드립니다.
          </p>
          <p className="text-base text-[#707072] leading-relaxed mb-6">
            저희 회사는 "혁신과 신뢰"를 핵심 가치로 삼아, 고객 여러분께 최고의 제품과 서비스를 제공하기 위해 끊임없이 노력하고 있습니다.
            설립 이래 지속적인 연구개발 투자와 우수한 인재 확보를 통해 글로벌 경쟁력을 갖춘 기업으로 성장해 왔습니다.
          </p>
          <p className="text-base text-[#707072] leading-relaxed mb-8">
            앞으로도 고객의 신뢰에 보답하기 위해 더욱 품질 높은 제품과 서비스로 찾아뵙겠습니다.
            감사합니다.
          </p>
          <p className="text-base font-medium text-[#111111]">대표이사 홍길동</p>
        </div>
      </div>
    </div>
  )
}
