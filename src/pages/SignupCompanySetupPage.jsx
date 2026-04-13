import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { ROUTE_PATHS } from '../utils/routes';

const jobScopes = [
  { value: 'development', label: '개발' },
  { value: 'design', label: '디자인' },
  { value: 'marketing', label: '마케팅' },
  { value: 'planning', label: '기획' },
  { value: 'operation', label: '운영' },
  { value: 'sales', label: '영업' },
  { value: 'hr', label: '인사' },
  { value: 'finance', label: '재무' },
  { value: 'etc', label: '기타' },
];

export function SignupCompanySetupPage() {
  usePageTitle('기업 인증');

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    selectedScopes: [],
    businessDocUploaded: false,
    purposeConfirmed: false,
  });

  const handleCheckboxChange = (value) => {
    setFormData(prev => {
      const newScopes = prev.selectedScopes.includes(value)
        ? prev.selectedScopes.filter(s => s !== value)
        : [...prev.selectedScopes, value];
      return { ...prev, selectedScopes: newScopes };
    });
  };

  const handleFileUpload = () => {
    console.log('File upload modal');
    setFormData(prev => ({ ...prev, businessDocUploaded: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company signup step 2:', formData);
    navigate(ROUTE_PATHS.talents);
  };

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="login-container">
          <div className="login-card surface-card">
            <div className="login-header">
              <h1>기업 인증</h1>
              <p className="login-subtitle">인재 탐색을 위한 인증을 완료해주세요</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-section-title">사업자등록증</div>

              <div className="upload-area">
                <div className="upload-area__icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="17,8 12,3 7,8"/>
                    <line x1="12" y1="3" x2="12" y2="15"/>
                  </svg>
                </div>
                {formData.businessDocUploaded ? (
                  <p className="upload-area__text upload-area__text--success">사업자등록증이 업로드되었습니다</p>
                ) : (
                  <>
                    <p className="upload-area__text">사업자등록증을 업로드해주세요</p>
                    <button type="button" className="btn btn--outline" onClick={handleFileUpload}>
                      파일 선택
                    </button>
                  </>
                )}
              </div>

              <div className="form-section-title">채용 직무 범위</div>

              <p className="form-hint">인재 탐색 시 제한할 직무 범위를 선택해주세요</p>

              <div className="checkbox-group">
                {jobScopes.map(scope => (
                  <label key={scope.value} className="chip-label">
                    <input
                      type="checkbox"
                      checked={formData.selectedScopes.includes(scope.value)}
                      onChange={() => handleCheckboxChange(scope.value)}
                    />
                    <span className="chip">{scope.label}</span>
                  </label>
                ))}
              </div>

              <label className="checkbox-label login-remember">
                <input
                  type="checkbox"
                  checked={formData.purposeConfirmed}
                  onChange={(e) => setFormData(prev => ({ ...prev, purposeConfirmed: e.target.checked }))}
                  required
                />
                <span>채용 목적 외 다른用途로 프로필을 열람하지 않음을 확인합니다</span>
              </label>

              <button type="submit" className="btn btn--primary btn--full">
                인증 완료
              </button>

              <p className="login-footer-text">
                인증은 나중에 완료할 수도 있어요.{' '}
                <Link to={ROUTE_PATHS.talents} className="text-link">
                  나중에 하기
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
