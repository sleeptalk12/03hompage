import Breadcrumb from '../../components/layout/Breadcrumb'

const VISIONS = [
  { title: '고객 중심', desc: '고객의 니즈를 최우선으로 생각하고 최고의 가치를 제공합니다.' },
  { title: '기술 혁신', desc: '끊임없는 R&D 투자로 업계를 선도하는 기술력을 확보합니다.' },
  { title: '글로벌 도약', desc: '세계 시장에서 인정받는 글로벌 브랜드로 성장합니다.' },
  { title: '지속 가능성', desc: '환경과 사회적 책임을 다하며 지속 가능한 미래를 만들어 갑니다.' },
]

export default function CompanyVision() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '회사소개', to: '/company/about' }, { label: '비전' }]} />
      <h1 className="text-[32px] font-medium text-[#111111] mb-4">비전</h1>
      <p className="text-base text-[#707072] mb-12">혁신과 신뢰로 세계를 선도하는 기업</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {VISIONS.map((v) => (
          <div key={v.title} className="bg-[#f5f5f5] p-8">
            <h2 className="text-xl font-medium text-[#111111] mb-3">{v.title}</h2>
            <p className="text-base text-[#707072]">{v.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#111111] p-12 text-center">
        <h2 className="text-2xl font-medium text-white mb-4">2030 목표</h2>
        <p className="text-base text-[#9e9ea0]">글로벌 Top 10 기업 달성 · 매출 1조 돌파 · ESG 경영 선도</p>
      </div>
    </div>
  )
}
