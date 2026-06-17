import Breadcrumb from '../../components/layout/Breadcrumb'

const HISTORY = [
  { year: '2024', items: ['글로벌 파트너십 확대 (30개국)', '매출 5,000억 달성'] },
  { year: '2022', items: ['ISO 9001 인증 획득', '신규 공장 준공 (경기도 화성)'] },
  { year: '2020', items: ['코스닥 상장', '연구소 설립'] },
  { year: '2018', items: ['수출 1,000억 달성', '일본 법인 설립'] },
  { year: '2015', items: ['임직원 100명 돌파', '제2공장 설립'] },
  { year: '2010', items: ['회사 설립', '첫 제품 출시'] },
]

export default function CompanyHistory() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '회사소개', to: '/company/about' }, { label: '연혁' }]} />
      <h1 className="text-[32px] font-medium text-[#111111] mb-12">연혁</h1>

      <div className="max-w-2xl">
        {HISTORY.map((h, idx) => (
          <div key={h.year} className="flex gap-8 pb-8">
            <div className="shrink-0 w-16">
              <span className="text-xl font-medium text-[#111111]">{h.year}</span>
            </div>
            <div className="flex-1 border-l border-[#cacacb] pl-8 pb-8">
              <ul className="space-y-2">
                {h.items.map((item) => (
                  <li key={item} className="text-base text-[#707072]">· {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
