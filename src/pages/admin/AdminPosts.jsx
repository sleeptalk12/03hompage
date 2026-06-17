import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPosts, deletePost, updatePost } from '../../services/postService'

export default function AdminPosts() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getPosts({ page: 1, search: '' }).then(({ data }) => setPosts(data)).finally(() => setLoading(false))
  }, [])

  async function handleDelete(id) {
    if (!confirm('게시글을 삭제하시겠습니까?')) return
    await deletePost(id)
    setPosts((prev) => prev.filter((p) => p.id !== id))
  }

  async function handleToggleNotice(post) {
    const updated = await updatePost(post.id, { is_notice: !post.is_notice })
    setPosts((prev) => prev.map((p) => (p.id === post.id ? { ...p, ...updated } : p)))
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-[#111111] mb-8">게시판 관리</h2>

      {loading ? (
        <p className="text-sm text-[#707072]">로딩 중...</p>
      ) : (
        <div className="bg-white border border-[#cacacb]">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f5f5] border-b border-[#cacacb]">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">제목</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">작성자</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">조회</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">공지</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">작성일</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">관리</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-b border-[#e5e5e5]">
                  <td className="px-4 py-3">
                    <Link to={`/posts/${p.id}`} className="text-[#111111] hover:underline truncate max-w-[200px] block">
                      {p.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#707072]">{p.profiles?.name || '-'}</td>
                  <td className="px-4 py-3 text-[#707072]">{p.view_count}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleToggleNotice(p)}
                      className={`text-xs font-medium px-2 py-0.5 rounded-[30px] ${
                        p.is_notice ? 'bg-[#111111] text-white' : 'bg-[#f5f5f5] text-[#707072]'
                      }`}
                    >
                      {p.is_notice ? '공지' : '일반'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-[#707072]">
                    {new Date(p.created_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-3">
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
