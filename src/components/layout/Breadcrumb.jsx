import { Link } from 'react-router-dom'

export default function Breadcrumb({ items }) {
  return (
    <nav className="flex items-center gap-1 text-sm font-medium text-[#707072] mb-6">
      <Link to="/" className="hover:text-[#111111]">홈</Link>
      {items.map((item, idx) => (
        <span key={idx} className="flex items-center gap-1">
          <span>/</span>
          {idx === items.length - 1 ? (
            <span className="text-[#111111]">{item.label}</span>
          ) : (
            <Link to={item.to} className="hover:text-[#111111]">{item.label}</Link>
          )}
        </span>
      ))}
    </nav>
  )
}
