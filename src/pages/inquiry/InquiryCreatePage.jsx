import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, Link } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { useAuth } from '../../contexts/AuthContext'
import { createInquiry } from '../../services/inquiryService'

const schema = z.object({
  title: z.string().min(1, '제목을 입력하세요').max(100),
  content: z.string().min(10, '내용을 10자 이상 입력하세요'),
})

export default function InquiryCreatePage() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data) {
    await createInquiry({ ...data, user_id: user.id })
    navigate('/inquiry/complete', { replace: true })
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '온라인문의' }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[32px] font-medium text-[#111111]">온라인문의</h1>
        <Link
          to="/inquiry/list"
          className="text-sm font-medium text-[#111111] underline"
        >
          내 문의 내역
        </Link>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">제목</label>
          <input
            {...register('title')}
            type="text"
            placeholder="문의 제목을 입력하세요"
            className="w-full h-12 px-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111]"
          />
          {errors.title && <p className="mt-1 text-sm text-[#d30005]">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">내용</label>
          <textarea
            {...register('content')}
            placeholder="문의 내용을 입력하세요"
            rows={10}
            className="w-full p-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111] resize-none"
          />
          {errors.content && <p className="mt-1 text-sm text-[#d30005]">{errors.content.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 bg-[#111111] text-white text-base font-medium rounded-[30px] disabled:opacity-50"
        >
          {isSubmitting ? '등록 중...' : '문의 등록'}
        </button>
      </form>
    </div>
  )
}
