import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { getProducts } from '../../services/productService'

export default function ProductListPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState([])

  useEffect(() => {
    load()
  }, [category])

  async function load() {
    setLoading(true)
    try {
      const data = await getProducts({ category, search })
      setProducts(data)
      const cats = [...new Set(data.map((p) => p.category).filter(Boolean))]
      setCategories(cats)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e) {
    e.preventDefault()
    load()
  }

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '제품소개' }]} />
      <h1 className="text-[32px] font-medium text-[#111111] mb-8">제품소개</h1>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="제품명 검색"
            className="h-10 px-4 border border-[#cacacb] text-sm text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111] rounded-[24px]"
          />
          <button
            type="submit"
            className="h-10 px-6 bg-[#111111] text-white text-sm font-medium rounded-[30px]"
          >
            검색
          </button>
        </form>

        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setCategory('')}
            className={`h-10 px-4 text-sm font-medium rounded-[30px] border ${
              category === ''
                ? 'bg-[#111111] text-white border-[#111111]'
                : 'bg-white text-[#111111] border-[#cacacb]'
            }`}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`h-10 px-4 text-sm font-medium rounded-[30px] border ${
                category === cat
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#111111] border-[#cacacb]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-[#707072]">로딩 중...</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-[#707072]">등록된 제품이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.id}`} className="block group">
              <div className="bg-[#f5f5f5] aspect-square flex items-center justify-center overflow-hidden">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-[#9e9ea0] text-sm">이미지 없음</span>
                )}
              </div>
              <div className="pt-2">
                {product.category && (
                  <p className="text-xs font-medium text-[#707072] mb-1">{product.category}</p>
                )}
                <p className="text-base font-medium text-[#111111] group-hover:underline">{product.name}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
