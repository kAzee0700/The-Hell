import { useState, useEffect } from 'react';
import { usePageTitle } from '../hooks/usePageTitle';
import { api } from '../services/api';

const VERIFICATION_LABELS = {
  pending: '미인증',
  verified: '인증완료',
  rejected: '거절',
};

export function AdminCompaniesPage() {
  usePageTitle('기업 관리');

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [processing, setProcessing] = useState(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    try {
      setLoading(true);
      const data = await api.admin.getCompanies();
      setCompanies(data.companies || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(userId, status) {
    try {
      setProcessing(userId);
      await api.admin.verifyCompany(userId, status);
      await loadCompanies();
    } catch (err) {
      setError(err.message);
    } finally {
      setProcessing(null);
    }
  }

  const filteredCompanies = companies.filter(company => {
    if (filter === 'all') return true;
    return company.verificationStatus === filter;
  });

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="page-shell__hero">
          <p className="eyebrow">Admin</p>
          <h1>기업 관리</h1>
          <p className="page-shell__copy">기업 회원 목록과 인증 상태를 관리할 수 있습니다.</p>
        </div>

        <div className="admin-filters">
          {['all', 'pending', 'verified', 'rejected'].map(f => (
            <button
              key={f}
              className={`btn btn--sm ${filter === f ? 'btn--primary' : 'btn--ghost'}`}
              onClick={() => setFilter(f)}
            >
              {f === 'all' ? '전체' : VERIFICATION_LABELS[f]}
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
                  <th>회사명</th>
                  <th>담당자</th>
                  <th>이메일</th>
                  <th>사업자번호</th>
                  <th>부서/직책</th>
                  <th>인증상태</th>
                  <th>관리</th>
                </tr>
              </thead>
              <tbody>
                {filteredCompanies.map(company => (
                  <tr key={company.id}>
                    <td>{company.companyName || '-'}</td>
                    <td>{company.name || '-'}</td>
                    <td>{company.email}</td>
                    <td>{company.businessNumber || '-'}</td>
                    <td>{[company.department, company.position].filter(Boolean).join(' / ') || '-'}</td>
                    <td>
                      <span className={`badge badge--${company.verificationStatus}`}>
                        {VERIFICATION_LABELS[company.verificationStatus] || company.verificationStatus}
                      </span>
                    </td>
                    <td>
                      {company.verificationStatus === 'pending' && (
                        <div className="admin-actions">
                          <button
                            className="btn btn--sm btn--primary"
                            onClick={() => handleVerify(company.id, 'verified')}
                            disabled={processing === company.id}
                          >
                            {processing === company.id ? '...' : '승인'}
                          </button>
                          <button
                            className="btn btn--sm btn--ghost"
                            onClick={() => handleVerify(company.id, 'rejected')}
                            disabled={processing === company.id}
                          >
                            거절
                          </button>
                        </div>
                      )}
                      {company.verificationStatus !== 'pending' && (
                        <span className="admin-actions__text">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="admin-summary">
          <p>전체 기업: {companies.length}개 | 미인증: {companies.filter(c => c.verificationStatus === 'pending').length}개</p>
        </div>
      </div>
    </section>
  );
}
