import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { getProduct } from '../../services/productService'

export default function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProduct(id)
      .then(setProduct)
      .catch(() => navigate('/products', { replace: true }))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="max-w-[1440px] mx-auto px-6 py-12 text-sm text-[#707072]">로딩 중...</div>
  if (!product) return null

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '제품소개', to: '/products' }, { label: product.name }]} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="bg-[#f5f5f5] aspect-square flex items-center justify-center">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[#9e9ea0] text-sm">이미지 없음</span>
          )}
        </div>

        <div className="flex flex-col justify-center">
          {product.category && (
            <p className="text-sm font-medium text-[#707072] mb-2">{product.category}</p>
          )}
          <h1 className="text-[32px] font-medium text-[#111111] mb-6">{product.name}</h1>
          {product.description && (
            <p className="text-base text-[#707072] leading-relaxed mb-8 whitespace-pre-line">
              {product.description}
            </p>
          )}
          <Link
            to="/inquiry"
            className="inline-block bg-[#111111] text-white text-base font-medium px-8 py-3 rounded-[30px] text-center"
          >
            제품 문의하기
          </Link>
        </div>
      </div>
    </div>
  )
}
