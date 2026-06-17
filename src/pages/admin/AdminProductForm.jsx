import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { getProduct, createProduct, updateProduct } from '../../services/productService'

const schema = z.object({
  name: z.string().min(1, '제품명을 입력하세요'),
  category: z.string().optional(),
  description: z.string().optional(),
  sort_order: z.coerce.number().default(0),
  is_active: z.boolean().default(true),
})

export default function AdminProductForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { sort_order: 0, is_active: true },
  })

  useEffect(() => {
    if (isEdit) {
      getProduct(id).then((p) => reset({
        name: p.name,
        category: p.category || '',
        description: p.description || '',
        sort_order: p.sort_order,
        is_active: p.is_active,
      }))
    }
  }, [id])

  async function onSubmit(data) {
    if (isEdit) {
      await updateProduct(id, data)
    } else {
      await createProduct(data)
    }
    navigate('/admin/products', { replace: true })
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-[#111111] mb-8">
        {isEdit ? '제품 수정' : '제품 등록'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg bg-white border border-[#cacacb] p-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">제품명 *</label>
          <input
            {...register('name')}
            className="w-full h-10 px-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111]"
          />
          {errors.name && <p className="mt-1 text-xs text-[#d30005]">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">카테고리</label>
          <input
            {...register('category')}
            className="w-full h-10 px-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">설명</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full p-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#111111] mb-2">정렬 순서</label>
          <input
            {...register('sort_order')}
            type="number"
            className="w-full h-10 px-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111]"
          />
        </div>

        <label className="flex items-center gap-2 cursor-pointer">
          <input {...register('is_active')} type="checkbox" />
          <span className="text-sm text-[#111111]">노출</span>
        </label>

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="px-6 py-2 bg-[#f5f5f5] text-[#111111] text-sm font-medium rounded-[30px]"
          >
            취소
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-[#111111] text-white text-sm font-medium rounded-[30px] disabled:opacity-50"
          >
            {isSubmitting ? '저장 중...' : isEdit ? '수정' : '등록'}
          </button>
        </div>
      </form>
    </div>
  )
}
