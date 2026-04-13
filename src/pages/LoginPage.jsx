import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../hooks/useAuth';
import { ROUTE_PATHS } from '../utils/routes';

export function LoginPage() {
  usePageTitle('로그인');
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState('individual');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      console.log('Login success:', user);
      navigate(ROUTE_PATHS.home);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="login-container">
          <div className="login-card surface-card">
            <div className="login-header">
              <h1>로그인</h1>
              <p className="login-subtitle">지옥에서 당신을 기다리고 있습니다</p>
            </div>

            <div className="login-type-toggle">
              <div
                className="login-type-indicator"
                style={{ transform: `translateX(${loginType === 'individual' ? '0%' : '100%'})` }}
              />
              <button
                type="button"
                className={`login-type-btn ${loginType === 'individual' ? 'active' : ''}`}
                onClick={() => setLoginType('individual')}
              >
                개인
              </button>
              <button
                type="button"
                className={`login-type-btn ${loginType === 'company' ? 'active' : ''}`}
                onClick={() => setLoginType('company')}
              >
                기업
              </button>
            </div>

            <form className="login-form">
              {error && (
                <div className="form-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {error}
                </div>
              )}

              <div className="form-group">
                <label htmlFor="email">이메일</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>

              <label className="checkbox-label checkbox-label--right login-remember">
                <input type="checkbox" />
                <span>로그인 상태 유지</span>
              </label>

              <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
                {loading ? '로그인 중...' : '로그인'}
              </button>

              <div className="login-divider">
                <span>또는</span>
              </div>

              <Link to="/signup" className="btn btn--outline btn--full">
                회원가입
              </Link>

              <p className="login-footer-text">
                비밀번호를 잊으셨나요?{' '}
                <Link to="/find-password" className="text-link">
                  비밀번호 찾기
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
