import { Link } from 'react-router-dom'

const FOOTER_COLS = [
  {
    title: '회사소개',
    links: [
      { label: '회사소개', to: '/company/about' },
      { label: 'CEO 인사말', to: '/company/ceo' },
      { label: '비전', to: '/company/vision' },
      { label: '연혁', to: '/company/history' },
      { label: '오시는 길', to: '/company/location' },
    ],
  },
  {
    title: '제품소개',
    links: [
      { label: '전체 제품', to: '/products' },
    ],
  },
  {
    title: '커뮤니티',
    links: [
      { label: '게시판', to: '/posts' },
    ],
  },
  {
    title: '고객지원',
    links: [
      { label: '온라인문의', to: '/inquiry' },
      { label: '문의내역', to: '/inquiry/list' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#cacacb] mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {FOOTER_COLS.map((col) => (
            <div key={col.title}>
              <p className="text-base font-medium text-[#111111] mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm font-medium text-[#707072] hover:text-[#111111]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-[#cacacb] pt-6">
          <p className="text-[9px] font-medium text-[#707072]">
            © 2026 COMPANY. All rights reserved. | 개인정보처리방침 | 이용약관
          </p>
        </div>
      </div>
    </footer>
  )
}
