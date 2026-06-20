import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const schema = z.object({
  name: z.string().min(2, '이름은 2자 이상이어야 합니다'),
  email: z.string().email('올바른 이메일을 입력하세요'),
  password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다'),
  passwordConfirm: z.string(),
}).refine((d) => d.password === d.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다',
  path: ['passwordConfirm'],
})

export default function SignupPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit({ name, email, password }) {
    try {
      await signUp({ name, email, password })
      navigate('/signup/complete', { replace: true })
    } catch (err) {
      setError('root', { message: err.message || '회원가입에 실패했습니다.' })
    }
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12 flex justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-[32px] font-medium text-[#111111] mb-8">회원가입</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#111111] mb-2">이름</label>
            <input
              {...register('name')}
              type="text"
              placeholder="이름을 입력하세요"
              className="w-full h-12 px-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111]"
            />
            {errors.name && <p className="mt-1 text-sm text-[#d30005]">{errors.name.message}</p>}
          </div>

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
              placeholder="비밀번호를 입력하세요 (6자 이상)"
              className="w-full h-12 px-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111]"
            />
            {errors.password && <p className="mt-1 text-sm text-[#d30005]">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#111111] mb-2">비밀번호 확인</label>
            <input
              {...register('passwordConfirm')}
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              className="w-full h-12 px-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111]"
            />
            {errors.passwordConfirm && <p className="mt-1 text-sm text-[#d30005]">{errors.passwordConfirm.message}</p>}
          </div>

          {errors.root && (
            <p className="text-sm text-[#d30005]">{errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 bg-[#111111] text-white text-base font-medium rounded-[30px] disabled:opacity-50"
          >
            {isSubmitting ? '가입 중...' : '회원가입'}
          </button>
        </form>

        <p className="mt-6 text-sm text-[#707072] text-center">
          이미 계정이 있으신가요?{' '}
          <Link to="/login" className="text-[#111111] font-medium underline">로그인</Link>
        </p>
      </div>
    </div>
  )
}
