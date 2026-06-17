import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Breadcrumb from '../../components/layout/Breadcrumb'
import { useAuth } from '../../contexts/AuthContext'
import { getMyInquiries } from '../../services/inquiryService'

const STATUS_LABEL = {
  pending: '답변대기',
  answered: '답변완료',
  closed: '완료',
}

const STATUS_COLOR = {
  pending: 'text-[#707072]',
  answered: 'text-[#007d48]',
  closed: 'text-[#9e9ea0]',
}

export default function InquiryListPage() {
  const { user } = useAuth()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    getMyInquiries(user.id)
      .then(setInquiries)
      .finally(() => setLoading(false))
  }, [user.id])

  return (
    <div className="max-w-[1440px] mx-auto px-6 py-12">
      <Breadcrumb items={[{ label: '온라인문의', to: '/inquiry' }, { label: '문의내역' }]} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[32px] font-medium text-[#111111]">내 문의 내역</h1>
        <Link
          to="/inquiry"
          className="inline-block bg-[#111111] text-white text-sm font-medium px-6 py-2 rounded-[30px]"
        >
          문의하기
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-[#707072]">로딩 중...</p>
      ) : inquiries.length === 0 ? (
        <p className="text-sm text-[#707072]">문의 내역이 없습니다.</p>
      ) : (
        <div className="border-t border-[#111111]">
          {inquiries.map((inq) => (
            <div key={inq.id} className="border-b border-[#e5e5e5]">
              <button
                className="w-full flex items-center gap-4 py-4 px-2 text-left hover:bg-[#f5f5f5]"
                onClick={() => setSelected(selected === inq.id ? null : inq.id)}
              >
                <span className={`shrink-0 text-xs font-medium w-16 ${STATUS_COLOR[inq.status]}`}>
                  {STATUS_LABEL[inq.status]}
                </span>
                <span className="flex-1 text-base font-medium text-[#111111] truncate">{inq.title}</span>
                <span className="shrink-0 text-xs text-[#9e9ea0]">
                  {new Date(inq.created_at).toLocaleDateString('ko-KR')}
                </span>
                <span className="shrink-0 text-sm text-[#9e9ea0]">{selected === inq.id ? '▲' : '▼'}</span>
              </button>

              {selected === inq.id && (
                <div className="px-4 py-6 bg-[#f5f5f5]">
                  <div className="mb-4">
                    <p className="text-xs font-medium text-[#707072] mb-2">문의 내용</p>
                    <p className="text-sm text-[#111111] whitespace-pre-line">{inq.content}</p>
                  </div>
                  {inq.answer && (
                    <div className="border-t border-[#cacacb] pt-4">
                      <p className="text-xs font-medium text-[#007d48] mb-2">답변</p>
                      <p className="text-sm text-[#111111] whitespace-pre-line">{inq.answer}</p>
                      {inq.answered_at && (
                        <p className="text-xs text-[#9e9ea0] mt-2">
                          {new Date(inq.answered_at).toLocaleDateString('ko-KR')}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
