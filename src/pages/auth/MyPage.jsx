import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import Breadcrumb from '../../components/layout/Breadcrumb'

export default function MyPage() {
  const { profile } = useAuth()

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '마이페이지' }]} />
      <h1 className="text-[32px] font-medium text-[#111111] mb-8">마이페이지</h1>

      <div className="max-w-md space-y-6">
        <div className="border border-[#cacacb] p-6">
          <h2 className="text-base font-medium text-[#111111] mb-4">내 정보</h2>
          <dl className="space-y-3">
            <div className="flex gap-4">
              <dt className="text-sm text-[#707072] w-20 shrink-0">이름</dt>
              <dd className="text-sm text-[#111111]">{profile?.name || '-'}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-sm text-[#707072] w-20 shrink-0">이메일</dt>
              <dd className="text-sm text-[#111111]">{profile?.email || '-'}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="text-sm text-[#707072] w-20 shrink-0">권한</dt>
              <dd className="text-sm text-[#111111]">{profile?.role === 'admin' ? '관리자' : '일반회원'}</dd>
            </div>
          </dl>
        </div>

        <div className="border border-[#cacacb] p-6">
          <h2 className="text-base font-medium text-[#111111] mb-4">바로가기</h2>
          <div className="space-y-2">
            <Link
              to="/inquiry/list"
              className="block text-sm font-medium text-[#111111] hover:underline"
            >
              내 문의 내역 →
            </Link>
            <Link
              to="/posts"
              className="block text-sm font-medium text-[#111111] hover:underline"
            >
              게시판 →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
