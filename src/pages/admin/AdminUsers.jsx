import { useState, useEffect } from 'react'
import { getAllUsers, updateUserRole } from '../../services/adminService'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllUsers().then(setUsers).finally(() => setLoading(false))
  }, [])

  async function handleRoleChange(id, role) {
    if (!confirm(`권한을 '${role}'으로 변경하시겠습니까?`)) return
    const updated = await updateUserRole(id, role)
    setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)))
  }

  return (
    <div>
      <h2 className="text-2xl font-medium text-[#111111] mb-8">회원 관리</h2>

      {loading ? (
        <p className="text-sm text-[#707072]">로딩 중...</p>
      ) : (
        <div className="bg-white border border-[#cacacb]">
          <table className="w-full text-sm">
            <thead className="bg-[#f5f5f5] border-b border-[#cacacb]">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">이름</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">이메일</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">권한</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">가입일</th>
                <th className="text-left px-4 py-3 font-medium text-[#111111]">변경</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-[#e5e5e5]">
                  <td className="px-4 py-3 text-[#111111]">{u.name || '-'}</td>
                  <td className="px-4 py-3 text-[#707072]">{u.email}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-[30px] ${
                      u.role === 'admin' ? 'bg-[#111111] text-white' : 'bg-[#f5f5f5] text-[#111111]'
                    }`}>
                      {u.role === 'admin' ? '관리자' : '일반'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#707072]">
                    {new Date(u.created_at).toLocaleDateString('ko-KR')}
                  </td>
                  <td className="px-4 py-3">
                    {u.role === 'admin' ? (
                      <button
                        onClick={() => handleRoleChange(u.id, 'user')}
                        className="text-xs text-[#707072] underline"
                      >
                        일반으로
                      </button>
                    ) : (
                      <button
                        onClick={() => handleRoleChange(u.id, 'admin')}
                        className="text-xs text-[#111111] underline"
                      >
                        관리자로
                      </button>
                    )}
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
