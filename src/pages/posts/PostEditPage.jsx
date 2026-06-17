import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useParams, useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { useAuth } from '../../contexts/AuthContext'
import { getPost, updatePost } from '../../services/postService'

const schema = z.object({
  title: z.string().min(1, '제목을 입력하세요').max(100),
  content: z.string().min(1, '내용을 입력하세요'),
})

export default function PostEditPage() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    getPost(id).then((post) => {
      if (post.user_id !== user?.id) {
        navigate('/posts', { replace: true })
        return
      }
      reset({ title: post.title, content: post.content })
    })
  }, [id])

  async function onSubmit(data) {
    await updatePost(id, data)
    navigate(`/posts/${id}`, { replace: true })
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '커뮤니티', to: '/posts' }, { label: '글수정' }]} />
      <h1 className="text-[32px] font-medium text-[#111111] mb-8">글수정</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl space-y-4">
        <div>
          <input
            {...register('title')}
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full h-12 px-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111]"
          />
          {errors.title && <p className="mt-1 text-sm text-[#d30005]">{errors.title.message}</p>}
        </div>

        <div>
          <textarea
            {...register('content')}
            placeholder="내용을 입력하세요"
            rows={16}
            className="w-full p-4 border border-[#cacacb] text-base text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111] resize-none"
          />
          {errors.content && <p className="mt-1 text-sm text-[#d30005]">{errors.content.message}</p>}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
            className="px-8 py-3 bg-[#f5f5f5] text-[#111111] text-base font-medium rounded-[30px]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-[#111111] text-white text-base font-medium rounded-[30px] disabled:opacity-50"
          >
            {isSubmitting ? '저장 중...' : '수정'}
          </button>
        </div>
      </form>
    </div>
  )
}
