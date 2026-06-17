import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getDashboardStats } from '../../services/adminService'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, products: 0, posts: 0, pendingInquiries: 0 })

  useEffect(() => {
    getDashboardStats().then(setStats)
  }, [])

  const CARDS = [
    { label: '전체 회원', value: stats.users, to: '/admin/users' },
    { label: '전체 제품', value: stats.products, to: '/admin/products' },
    { label: '전체 게시글', value: stats.posts, to: '/admin/posts' },
    { label: '답변 대기', value: stats.pendingInquiries, to: '/admin/inquiries' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-medium text-[#111111] mb-8">대시보드</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {CARDS.map((card) => (
          <Link key={card.label} to={card.to} className="bg-white border border-[#cacacb] p-6 hover:border-[#111111]">
            <p className="text-sm text-[#707072] mb-2">{card.label}</p>
            <p className="text-[32px] font-medium text-[#111111]">{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: '회원 관리', to: '/admin/users', desc: '회원 목록 조회 및 권한 변경' },
          { label: '제품 관리', to: '/admin/products', desc: '제품 등록, 수정, 삭제' },
          { label: '게시판 관리', to: '/admin/posts', desc: '게시글 관리 및 공지 설정' },
          { label: '문의 관리', to: '/admin/inquiries', desc: '문의 답변 및 상태 변경' },
        ].map((item) => (
          <Link
            key={item.label}
            to={item.to}
            className="bg-white border border-[#cacacb] p-6 hover:border-[#111111]"
          >
            <p className="text-base font-medium text-[#111111] mb-1">{item.label}</p>
            <p className="text-sm text-[#707072]">{item.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
