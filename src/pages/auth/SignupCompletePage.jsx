import { useNavigate } from 'react-router-dom'

export default function SignupCompletePage() {
  const navigate = useNavigate()

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex justify-center">
      <div className="w-full max-w-md text-center">
        <h1 className="text-[32px] font-medium text-[#111111] mb-4">회원가입 완료</h1>
        <p className="text-base text-[#707072] mb-8">
          회원가입이 완료되었습니다.
        </p>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="w-full h-12 bg-[#111111] text-white text-base font-medium rounded-[30px]"
        >
          홈으로 이동
        </button>
      </div>
    </div>
  )
}
