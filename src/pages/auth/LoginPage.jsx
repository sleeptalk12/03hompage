import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const schema = z.object({
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
})

export default function LoginPage() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data) {
    try {
      await signIn(data)
      navigate(from, { replace: true })
    } catch (err) {
      setError('root', { message: err.message || '로그인에 실패했습니다.' })
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-[32px] font-medium text-[#111111] mb-8">로그인</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-2">이메일</label>
            <input
              {...register('email')}
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full h-12 px-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111]"
            />
            {errors.email && <p className="mt-1 text-sm text-[#d30005]">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111111] mb-2">비밀번호</label>
            <input
              {...register('password')}
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full h-12 px-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111]"
            />
            {errors.password && <p className="mt-1 text-sm text-[#d30005]">{errors.password.message}</p>}
          </div>

          {errors.root && (
            <p className="text-sm text-[#d30005]">{errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#111111] text-white text-base font-medium rounded-[30px] disabled:opacity-50"
          >
            {isSubmitting ? '로그인 중...' : '로그인'}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#707072] text-center">
          계정이 없으신가요?{' '}
          <Link to="/signup" className="text-[#111111] font-medium underline">회원가입</Link>
        </p>
      </div>
    </div>
  )
}
