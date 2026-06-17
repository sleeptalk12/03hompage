import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { useAuth } from '../../contexts/AuthContext'
import { getPost, incrementViewCount, deletePost } from '../../services/postService'

export default function PostDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAdmin } = useAuth()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      getPost(id),
      incrementViewCount(id),
    ])
      .then(([data]) => setPost(data))
      .catch(() => navigate('/posts', { replace: true }))
      .finally(() => setLoading(false))
  }, [id])

  async function handleDelete() {
    if (!confirm('게시글을 삭제하시겠습니까?')) return
    await deletePost(id)
    navigate('/posts', { replace: true })
  }

  if (loading) return <div className="max-w-[1440px] mx-auto px-6 py-12 text-sm text-[#707072]">로딩 중...</div>
  if (!post) return null

  const isOwner = user?.id === post.user_id

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '커뮤니티', to: '/posts' }, { label: '게시글 상세' }]} />

      <div className="max-w-3xl">
        <div className="border-t border-[#111111] pb-4 mb-6">
          <div className="flex items-start gap-2 pt-6 mb-4">
            {post.is_notice && (
              <span className="shrink-0 text-xs font-medium bg-[#111111] text-white px-2 py-0.5 rounded-[30px]">
                공지
              </span>
            )}
            <h1 className="text-2xl font-medium text-[#111111]">{post.title}</h1>
          </div>
          <div className="flex gap-4 text-xs text-[#9e9ea0]">
            <span>{post.profiles?.name}</span>
            <span>{new Date(post.created_at).toLocaleDateString('ko-KR')}</span>
            <span>조회 {post.view_count}</span>
          </div>
        </div>

        <div className="border-t border-[#e5e5e5] py-8 mb-8">
          <p className="text-base text-[#111111] leading-relaxed whitespace-pre-line">{post.content}</p>
          {post.file_url && (
            <a
              href={post.file_url}
              className="inline-block mt-4 text-sm text-[#111111] underline"
              target="_blank"
              rel="noreferrer"
            >
              첨부파일 다운로드
            </a>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-[#e5e5e5] pt-6">
          <Link
            to="/posts"
            className="inline-block bg-[#f5f5f5] text-[#111111] text-sm font-medium px-6 py-2 rounded-[30px]"
          >
            목록
          </Link>
          {(isOwner || isAdmin) && (
            <div className="flex gap-2">
              {isOwner && (
                <Link
                  to={`/posts/${id}/edit`}
                  className="inline-block bg-[#f5f5f5] text-[#111111] text-sm font-medium px-6 py-2 rounded-[30px]"
                >
                  수정
                </Link>
              )}
              <button
                onClick={handleDelete}
                className="inline-block bg-[#111111] text-white text-sm font-medium px-6 py-2 rounded-[30px]"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
