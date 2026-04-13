import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../hooks/useAuth';
import { ROUTE_PATHS } from '../utils/routes';
import { api } from '../services/api';

export function CompanyVerificationPage() {
  usePageTitle('기업 인증');
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  if (user?.verificationStatus === 'verified') {
    return (
      <section className="page-shell">
        <div className="container page-shell__inner">
          <div className="page-shell__hero">
            <p className="eyebrow">Company Verify</p>
            <h1>기업 인증 완료</h1>
            <p className="page-shell__copy">이미 인증 완료된 기업입니다. 탐색을 시작하세요.</p>
          </div>
          <button className="btn btn--primary" onClick={() => navigate(ROUTE_PATHS.talents)}>
            탐색하러 가기
          </button>
        </div>
      </section>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await api.company.requestVerification();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <section className="page-shell">
        <div className="container page-shell__inner">
          <div className="page-shell__hero">
            <p className="eyebrow">Company Verify</p>
            <h1>인증 요청 완료</h1>
            <p className="page-shell__copy">
              인증 요청이 완료되었습니다. 관리자의 검토 후 승인되면 탐색 기능이 열립니다.
            </p>
          </div>
          <p style={{ color: 'var(--color-text-muted)', marginTop: 'var(--space-4)' }}>
            通常 1~2 영업일 내에 검토됩니다.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="page-shell__hero">
          <p className="eyebrow">Company Verify</p>
          <h1>기업 인증</h1>
          <p className="page-shell__copy">
            기업 회원이시면 인증을 요청하세요. 관리자 검토 후 프로필 탐색과 제안 발송 기능이 열립니다.
          </p>
        </div>

        <div className="surface-card verification-card">
          <div className="verification-info">
            <h2>인증 절차</h2>
            <ol className="verification-steps">
              <li>아래 '인증 요청' 버튼을 클릭하세요</li>
              <li>관리자가 사업자 정보를 검토합니다</li>
              <li>검토 완료 후 탐색 기능이 자동 활성화됩니다</li>
            </ol>
          </div>

          <div className="verification-info">
            <h2>인증 시 제공되는 기능</h2>
            <ul className="verification-features">
              <li>구직자 프로필 탐색</li>
              <li>프로필 상세 열람</li>
              <li>구원 후보함 관리</li>
              <li>구원 제안 발송</li>
            </ul>
          </div>

          {error && (
            <div className="form-error" style={{ color: '#ef4444', marginBottom: 'var(--space-4)' }}>
              {error}
            </div>
          )}

          <button
            className="btn btn--primary btn--full"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? '요청 중...' : '인증 요청하기'}
          </button>

          <p className="verification-note">
            이미 가입 시 제출한 사업자 정보로 검토됩니다. 수정이 필요하면 관리자에게 문의하세요.
          </p>
        </div>
      </div>
    </section>
  );
}
