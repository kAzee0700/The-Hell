import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { ROUTE_PATHS } from '../utils/routes';

export function SignupTypePage() {
  usePageTitle('회원가입');

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="login-container">
          <div className="login-card surface-card">
            <div className="login-header">
              <h1>회원가입</h1>
              <p className="login-subtitle">어떤 목적으로 가입하시겠어요?</p>
            </div>

            <div className="signup-type-grid">
              <Link to={ROUTE_PATHS.signupIndividual} className="signup-type-card">
                <div className="signup-type-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="8" r="4"/>
                    <path d="M4 20c0-4 4-6 8-6s8 2 8 6"/>
                  </svg>
                </div>
                <h2>개인</h2>
                <p>구직자 프로필을 등록하고<br/>기업의 제안을 받아보세요</p>
              </Link>

              <Link to={ROUTE_PATHS.signupCompany} className="signup-type-card">
                <div className="signup-type-card__icon">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="8" width="18" height="12" rx="2"/>
                    <path d="M8 8V6a4 4 0 018 0v2"/>
                    <path d="M12 12v4"/>
                  </svg>
                </div>
                <h2>기업</h2>
                <p>인재를 탐색하고<br/>구원 제안을 보내보세요</p>
              </Link>
            </div>

            <p className="login-footer-text">
              이미 계정이 있으신가요?{' '}
              <Link to={ROUTE_PATHS.login} className="text-link">
                로그인
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
