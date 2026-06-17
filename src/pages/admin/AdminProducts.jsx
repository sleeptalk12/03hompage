import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProductsForAdmin, deleteProduct, updateProduct } from '../../services/productService'

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllProductsForAdmin().then(setProducts).finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    if (!confirm('제품을 삭제하시겠습니까?')) return
    await deleteProduct(id)
    setProducts((prev) => prev.filter((p) => p.id !== id))
  }

  async function handleToggleActive(product) {
    const updated = await updateProduct(product.id, { is_active: !product.is_active })
    setProducts((prev) => prev.map((p) => (p.id === product.id ? updated : p)))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-medium text-[#111111]">제품 관리</h2>
        <Link
          to="/admin/products/create"
          className="inline-block bg-[#111111] text-white text-sm font-medium px-6 py-2 rounded-[30px]"
        >
          + 제품 등록
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[#707072]">로딩 중...</p>
      ) : (
        <div className="bg-white border border-[#cacacb]">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f5f5] border-b border-[#cacacb]">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">제품명</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">카테고리</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">정렬</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">노출</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">관리</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[#e5e5e5]">
                  <td className="px-4 py-3 text-[#111111]">{p.name}</td>
                  <td className="px-4 py-3 text-[#707072]">{p.category || '-'}</td>
                  <td className="px-4 py-3 text-[#707072]">{p.sort_order}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleActive(p)}
                      className={`text-xs font-medium px-2 py-0.5 rounded-[30px] ${
                        p.is_active ? 'bg-[#007d48] text-white' : 'bg-[#f5f5f5] text-[#707072]'
                      }`}
                    >
                      {p.is_active ? '노출' : '숨김'}
                    </button>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <Link
                      to={`/admin/products/${p.id}/edit`}
                      className="text-xs text-[#111111] underline"
                    >
                      수정
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-xs text-[#d30005] underline"
                    >
                      삭제
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
