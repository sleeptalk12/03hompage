import Breadcrumb from '../../components/layout/Breadcrumb'

export default function CompanyLocation() {
  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '회사소개', to: '/company/about' }, { label: '오시는 길' }]} />
      <h1 className="text-[32px] font-medium text-[#111111] mb-12">오시는 길</h1>

      <div className="bg-[#f5f5f5] h-80 flex items-center justify-center mb-12">
        <span className="text-[#9e9ea0] text-sm">지도 영역 (Google Maps 또는 카카오 지도)</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-xl font-medium text-[#111111] mb-4">본사</h2>
          <dl className="space-y-3">
            {[
              { label: '주소', value: '서울특별시 강남구 테헤란로 123, 12층' },
              { label: '전화', value: '02-1234-5678' },
              { label: '팩스', value: '02-1234-5679' },
              { label: '이메일', value: 'info@company.com' },
              { label: '업무시간', value: '월~금 09:00 – 18:00 (공휴일 제외)' },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-4">
                <dt className="text-sm text-[#707072] w-20 shrink-0">{label}</dt>
                <dd className="text-sm text-[#111111]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <h2 className="text-xl font-medium text-[#111111] mb-4">교통편</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#111111] mb-1">지하철</p>
              <p className="text-sm text-[#707072]">2호선 강남역 3번 출구 도보 5분</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#111111] mb-1">버스</p>
              <p className="text-sm text-[#707072]">강남역 정류장 하차 (140, 144, 145번)</p>
            </div>
            <div>
              <p className="text-sm font-medium text-[#111111] mb-1">주차</p>
              <p className="text-sm text-[#707072]">건물 지하주차장 이용 가능 (2시간 무료)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
