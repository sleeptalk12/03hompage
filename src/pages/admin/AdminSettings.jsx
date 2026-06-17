export default function AdminSettings() {
  return (
    <div>
      <h2 className="text-2xl font-medium text-[#111111] mb-8">사이트 설정</h2>

      <div className="max-w-lg bg-white border border-[#cacacb] p-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">사이트명</label>
          <input
            type="text"
            defaultValue="COMPANY"
            className="w-full h-10 px-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">회사명</label>
          <input
            type="text"
            defaultValue="주식회사 컴퍼니"
            className="w-full h-10 px-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">대표 전화</label>
          <input
            type="text"
            defaultValue="02-1234-5678"
            className="w-full h-10 px-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">이메일</label>
          <input
            type="email"
            defaultValue="info@company.com"
            className="w-full h-10 px-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">주소</label>
          <input
            type="text"
            defaultValue="서울특별시 강남구 테헤란로 123"
            className="w-full h-10 px-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111]"
          />
        </div>

        <button className="px-8 py-3 bg-[#111111] text-white text-sm font-medium rounded-[30px]">
          저장
        </button>
      </div>
    </div>
  )
}
