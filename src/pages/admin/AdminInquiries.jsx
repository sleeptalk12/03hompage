import { useState, useEffect } from 'react'
import { getAllInquiries, answerInquiry, updateInquiryStatus } from '../../services/inquiryService'

const STATUS_LABEL = { pending: '답변대기', answered: '답변완료', closed: '완료' }

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [answerText, setAnswerText] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAllInquiries().then(setInquiries).finally(() => setLoading(false))
  }, [])

  function openAnswer(inq) {
    setSelected(inq.id)
    setAnswerText(inq.answer || '')
  }

  async function handleAnswer(id) {
    if (!answerText.trim()) return
    setSaving(true)
    const updated = await answerInquiry(id, answerText)
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, ...updated } : i)))
    setSelected(null)
    setSaving(false)
  }

  async function handleStatusChange(id, status) {
    const updated = await updateInquiryStatus(id, status)
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, ...updated } : i)))
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-[#111111] mb-8">문의 관리</h2>

      {loading ? (
        <p className="text-sm text-[#707072]">로딩 중...</p>
      ) : (
        <div className="space-y-2">
          {inquiries.map((inq) => (
            <div key={inq.id} className="bg-white border border-[#cacacb]">
              <div className="flex items-center gap-4 p-4">
                <span className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-[30px] ${
                  inq.status === 'answered' ? 'bg-[#007d48] text-white' :
                  inq.status === 'closed' ? 'bg-[#f5f5f5] text-[#9e9ea0]' :
                  'bg-[#f5f5f5] text-[#707072]'
                }`}>
                  {STATUS_LABEL[inq.status]}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#111111] truncate">{inq.title}</p>
                  <p className="text-xs text-[#707072]">
                    {inq.profiles?.name} · {inq.profiles?.email} · {new Date(inq.created_at).toLocaleDateString('ko-KR')}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <select
                    value={inq.status}
                    onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                    className="h-8 px-2 border border-[#cacacb] text-xs text-[#111111] focus:outline-none"
                  >
                    <option value="pending">답변대기</option>
                    <option value="answered">답변완료</option>
                    <option value="closed">완료</option>
                  </select>
                  <button
                    onClick={() => selected === inq.id ? setSelected(null) : openAnswer(inq)}
                    className="text-xs font-medium text-[#111111] underline"
                  >
                    {selected === inq.id ? '닫기' : '답변'}
                  </button>
                </div>
              </div>

              {selected === inq.id && (
                <div className="border-t border-[#e5e5e5] p-4 bg-[#f5f5f5]">
                  <div className="mb-4">
                    <p className="text-xs font-medium text-[#707072] mb-1">문의 내용</p>
                    <p className="text-sm text-[#111111] whitespace-pre-line">{inq.content}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-[#111111] mb-2">답변 작성</p>
                    <textarea
                      value={answerText}
                      onChange={(e) => setAnswerText(e.target.value)}
                      rows={4}
                      placeholder="답변을 입력하세요"
                      className="w-full p-3 border border-[#cacacb] text-sm focus:outline-none focus:border-[#111111] resize-none mb-2"
                    />
                    <button
                      onClick={() => handleAnswer(inq.id)}
                      disabled={saving}
                      className="px-6 py-2 bg-[#111111] text-white text-sm font-medium rounded-[30px] disabled:opacity-50"
                    >
                      {saving ? '저장 중...' : '답변 등록'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
