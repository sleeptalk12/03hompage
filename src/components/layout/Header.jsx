import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const NAV_ITEMS = [
  {
    label: '회사소개',
    to: '/company',
    children: [
      { label: '회사소개', to: '/company/about' },
      { label: 'CEO 인사말', to: '/company/ceo' },
      { label: '비전', to: '/company/vision' },
      { label: '연혁', to: '/company/history' },
      { label: '오시는 길', to: '/company/location' },
    ],
  },
  { label: '제품소개', to: '/products' },
  { label: '커뮤니티', to: '/posts' },
  { label: '온라인문의', to: '/inquiry' },
]

export default function Header() {
  const { user, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  async function handleSignOut() {
    await signOut()
    navigate('/')
  }

  return (
    <header className="bg-white border-b border-[#cacacb] sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-[#f5f5f5] border-b border-[#cacacb]">
        <div className="max-w-[1440px] mx-auto px-6 flex justify-end items-center h-9 gap-4">
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="text-xs font-medium text-[#111111] hover:underline">관리자</Link>
              )}
              <Link to="/mypage" className="text-xs font-medium text-[#111111] hover:underline">마이페이지</Link>
              <button onClick={handleSignOut} className="text-xs font-medium text-[#707072] hover:underline">로그아웃</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-xs font-medium text-[#111111] hover:underline">로그인</Link>
              <Link to="/signup" className="text-xs font-medium text-[#111111] hover:underline">회원가입</Link>
            </>
          )}
        </div>
      </div>

      {/* Primary nav */}
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-medium text-[#111111] tracking-tight">COMPANY</Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.to}
              className="relative"
              onMouseEnter={() => item.children && setActiveDropdown(item.to)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `text-base font-medium text-[#111111] pb-1 ${isActive ? 'border-b-2 border-[#111111]' : ''}`
                }
              >
                {item.label}
              </NavLink>
              {item.children && activeDropdown === item.to && (
                <div className="absolute top-full left-0 bg-white border border-[#cacacb] shadow-sm min-w-[140px] z-50">
                  {item.children.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="block px-4 py-2 text-sm font-medium text-[#111111] hover:bg-[#f5f5f5]"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="메뉴"
        >
          <div className="w-5 h-0.5 bg-[#111111] mb-1" />
          <div className="w-5 h-0.5 bg-[#111111] mb-1" />
          <div className="w-5 h-0.5 bg-[#111111]" />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-[#cacacb]">
          {NAV_ITEMS.map((item) => (
            <div key={item.to}>
              <Link
                to={item.to}
                className="block px-6 py-4 text-base font-medium text-[#111111] border-b border-[#e5e5e5]"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && item.children.map((child) => (
                <Link
                  key={child.to}
                  to={child.to}
                  className="block px-10 py-3 text-sm text-[#707072] border-b border-[#e5e5e5]"
                  onClick={() => setMenuOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </div>
      )}
    </header>
  )
}
