import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { useAuth } from '../../contexts/AuthContext'
import { getPosts } from '../../services/postService'

export default function PostListPage() {
  const { user } = useAuth()
  const [posts, setPosts] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const PAGE_SIZE = 10

  useEffect(() => {
    load()
  }, [page, search])

  async function load() {
    setLoading(true)
    try {
      const { data, count } = await getPosts({ page, search })
      setPosts(data)
      setCount(count)
    } finally {
      setLoading(false)
    }
  }

  function handleSearch(e) {
    e.preventDefault()
    setPage(1)
    setSearch(inputSearch)
  }

  const totalPages = Math.ceil(count / PAGE_SIZE)

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '커뮤니티' }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[32px] font-medium text-[#111111]">게시판</h1>
        {user && (
          <Link
            to="/posts/create"
            className="inline-block bg-[#111111] text-white text-sm font-medium px-6 py-2 rounded-[30px]"
          >
            글쓰기
          </Link>
        )}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={inputSearch}
          onChange={(e) => setInputSearch(e.target.value)}
          placeholder="제목 검색"
          className="h-10 px-4 border border-[#cacacb] text-sm text-[#111111] placeholder:text-[#9e9ea0] focus:outline-none focus:border-[#111111] rounded-[24px]"
        />
        <button type="submit" className="h-10 px-6 bg-[#111111] text-white text-sm font-medium rounded-[30px]">
          검색
        </button>
      </form>

      {/* List */}
      {loading ? (
        <p className="text-sm text-[#707072]">로딩 중...</p>
      ) : (
        <>
          <div className="border-t border-[#111111]">
            {posts.length === 0 ? (
              <p className="py-8 text-center text-sm text-[#707072]">게시글이 없습니다.</p>
            ) : (
              posts.map((post) => (
                <Link
                  key={post.id}
                  to={`/posts/${post.id}`}
                  className="flex items-center gap-4 py-4 border-b border-[#e5e5e5] hover:bg-[#f5f5f5] px-2"
                >
                  {post.is_notice && (
                    <span className="shrink-0 text-xs font-medium bg-[#111111] text-white px-2 py-0.5 rounded-[30px]">
                      공지
                    </span>
                  )}
                  <span className="flex-1 text-base font-medium text-[#111111] truncate">{post.title}</span>
                  <span className="shrink-0 text-xs text-[#9e9ea0]">{post.profiles?.name}</span>
                  <span className="shrink-0 text-xs text-[#9e9ea0]">
                    {new Date(post.created_at).toLocaleDateString('ko-KR')}
                  </span>
                  <span className="shrink-0 text-xs text-[#9e9ea0]">조회 {post.view_count}</span>
                </Link>
              ))
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-1 mt-8">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className={`w-10 h-10 text-sm font-medium rounded-[30px] ${
                    p === page
                      ? 'bg-[#111111] text-white'
                      : 'text-[#111111] hover:bg-[#f5f5f5]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
