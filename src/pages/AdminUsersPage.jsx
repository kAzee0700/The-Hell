import { useState, useEffect } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { api } from '../services/api';

const ROLE_LABELS = {
  admin: '관리자',
  individual: '개인',
  company: '기업',
};

const VERIFICATION_LABELS = {
  pending: '미인증',
  verified: '인증완료',
  rejected: '거절',
};

export function AdminUsersPage() {
  usePageTitle('회원 관리');

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await api.admin.getUsers();
      setUsers(data.users || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = users.filter(user => {
    if (filter === 'all') return true;
    if (filter === 'individual') return user.role === 'individual';
    if (filter === 'company') return user.role === 'company';
    if (filter === 'admin') return user.role === 'admin';
    return true;
  });

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="page-shell__hero">
          <p className="eyebrow">Admin</p>
          <h1>회원 관리</h1>
          <p className="page-shell__copy">전체 회원 목록을 확인하고 관리할 수 있습니다.</p>
        </div>

        <div className="admin-filters">
          {['all', 'individual', 'company', 'admin'].map(f => (
            <button
              key={f}
              className={`btn btn--sm ${filter === f ? 'btn--primary' : 'btn--ghost'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '전체' : f === 'individual' ? '개인' : f === 'company' ? '기업' : '관리자'}
            </button>
          ))}
        </div>

        {error && (
          <div className="admin-error">
            {error}
          </div>
        )}

        {loading ? (
          <div className="admin-loading">로딩 중...</div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>이름</th>
                  <th>이메일</th>
                  <th>유형</th>
                  <th>인증상태</th>
                  <th>가입일</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.name || '-'}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge badge--${user.role}`}>
                        {ROLE_LABELS[user.role] || user.role}
                      </span>
                    </td>
                    <td>
                      {user.role === 'company' ? (
                        <span className={`badge badge--${user.verificationStatus}`}>
                          {VERIFICATION_LABELS[user.verificationStatus] || user.verificationStatus}
                        </span>
                      ) : '-'}
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="admin-summary">
          <p>전체 회원: {users.length}명</p>
        </div>
      </div>
    </section>
  );
}
