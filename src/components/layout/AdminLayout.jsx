import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const ADMIN_NAV = [
  { label: '대시보드', to: '/admin' },
  { label: '회원관리', to: '/admin/users' },
  { label: '제품관리', to: '/admin/products' },
  { label: '게시판관리', to: '/admin/posts' },
  { label: '문의관리', to: '/admin/inquiries' },
  { label: '사이트설정', to: '/admin/settings' },
]

export default function AdminLayout({ children }) {
  const { signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex bg-[#f5f5f5]">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111111] flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-[#333]">
          <Link to="/admin" className="text-base font-medium text-white">관리자</Link>
        </div>
        <nav className="flex-1 py-4">
          {ADMIN_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin'}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm font-medium ${
                  isActive ? 'bg-white text-[#111111]' : 'text-[#9e9ea0] hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-6 border-t border-[#333]">
          <Link to="/" className="block text-sm text-[#9e9ea0] hover:text-white mb-2">← 사이트로</Link>
          <button onClick={handleSignOut} className="text-sm text-[#9e9ea0] hover:text-white">로그아웃</button>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-[#cacacb] flex items-center px-8">
          <h1 className="text-base font-medium text-[#111111]">관리자 페이지</h1>
        </header>
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
