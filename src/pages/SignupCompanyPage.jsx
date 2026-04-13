import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../hooks/useAuth';
import { ROUTE_PATHS } from '../utils/routes';

export function SignupCompanyPage() {
  usePageTitle('기업 회원가입');
  const { signupCompany } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    managerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    companyName: '',
    businessNumber: '',
    department: '',
    position: '',
    postcode: '',
    address: '',
    detailAddress: '',
    termsAgree: false,
    policyAgree: false,
    marketingAgree: false,
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!formData.termsAgree || !formData.policyAgree) {
      setError('필수 약관에 동의해주세요.');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, termsAgree, policyAgree, marketingAgree, ...submitData } = formData;
      await signupCompany({
        ...submitData,
        termsAgree: true,
        policyAgree: true,
        marketingAgree
      });
      navigate(ROUTE_PATHS.signupCompanySetup);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressSearch = () => {
    console.log('Address search modal');
  };

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="login-container">
          <div className="login-card surface-card">
            <div className="login-header">
              <h1>기업 회원가입</h1>
              <p className="login-subtitle">기본 정보를 입력해주세요</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              {error && (
                <div className="form-error" style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem' }}>
                  {error}
                </div>
              )}

              <div className="form-section-title">담당자 정보</div>

              <div className="form-group">
                <label htmlFor="managerName">담당자 이름</label>
                <input
                  type="text"
                  id="managerName"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  placeholder="담당자 이름을 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">담당자 이메일</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="company@email.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">비밀번호</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="비밀번호를 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="비밀번호를 다시 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">담당자 휴대폰</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="01012345678"
                  required
                />
              </div>

              <div className="form-section-title">회사 정보</div>

              <div className="form-group">
                <label htmlFor="companyName">회사명</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="회사명을 입력하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="businessNumber">사업자등록번호</label>
                <input
                  type="text"
                  id="businessNumber"
                  name="businessNumber"
                  value={formData.businessNumber}
                  onChange={handleChange}
                  placeholder="000-00-00000"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">담당 부서</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="예: 인사팀"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="position">담당 직책</label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    placeholder="예: 채용 담당자"
                    required
                  />
                </div>
              </div>

              <div className="form-section-title">회사 주소</div>

              <div className="form-row">
                <div className="form-group form-group--flex">
                  <label htmlFor="postcode">우편번호</label>
                  <input
                    type="text"
                    id="postcode"
                    name="postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    placeholder="우편번호"
                    required
                  />
                </div>
                <button type="button" className="btn btn--outline btn--search" onClick={handleAddressSearch}>
                  검색
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="address">주소</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="회사 주소를 검색하세요"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="detailAddress">상세 주소</label>
                <input
                  type="text"
                  id="detailAddress"
                  name="detailAddress"
                  value={formData.detailAddress}
                  onChange={handleChange}
                  placeholder="상세 주소를 입력하세요"
                />
              </div>

              <label className="checkbox-label login-remember">
                <input
                  type="checkbox"
                  name="termsAgree"
                  checked={formData.termsAgree}
                  onChange={handleChange}
                  required
                />
                <span>
                  <Link to="/terms" className="text-link">이용약관</Link> 및{' '}
                  <Link to="/privacy" className="text-link">개인정보처리방침</Link>에 동의합니다
                </span>
              </label>

              <label className="checkbox-label login-remember">
                <input
                  type="checkbox"
                  name="policyAgree"
                  checked={formData.policyAgree}
                  onChange={handleChange}
                  required
                />
                <span>기업 인증 및 열람 정책에 동의합니다</span>
              </label>

              <label className="checkbox-label login-remember">
                <input
                  type="checkbox"
                  name="marketingAgree"
                  checked={formData.marketingAgree}
                  onChange={handleChange}
                />
                <span>마케팅 수신 동의 (선택)</span>
              </label>

              <button type="submit" className="btn btn--primary btn--full" disabled={loading}>
                {loading ? '가입 중...' : '다음'}
              </button>

              <div className="login-divider">
                <span>또는</span>
              </div>

              <p className="login-footer-text">
                이미 계정이 있으신가요?{' '}
                <Link to={ROUTE_PATHS.login} className="text-link">
                  로그인
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
