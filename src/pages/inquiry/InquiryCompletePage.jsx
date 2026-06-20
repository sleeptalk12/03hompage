import { useNavigate } from 'react-router-dom'

export default function InquiryCompletePage() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex justify-center">
      <div className="w-full max-w-md text-center">
        <h1 className="text-[32px] font-medium text-[#111111] mb-4">문의 등록 완료</h1>
        <p className="text-base text-[#707072] mb-8">
          문의가 정상적으로 등록되었습니다.
        </p>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full h-12 bg-[#111111] text-white text-base font-medium rounded-[30px]"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  )
}
