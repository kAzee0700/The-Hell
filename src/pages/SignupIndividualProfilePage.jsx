import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { ROUTE_PATHS } from '../utils/routes';

const careerLevels = [
  { value: 'newcomer', label: '신입' },
  { value: 'junior', label: '주니어 (1-3년)' },
  { value: 'middle', label: '미들 (4-7년)' },
  { value: 'senior', label: '시니어 (8년 이상)' },
];

const employmentTypes = [
  { value: 'fulltime', label: '정규직' },
  { value: 'contract', label: '계약직' },
  { value: 'parttime', label: '파트타임' },
];

const workStyles = [
  { value: 'onsite', label: '출근' },
  { value: 'hybrid', label: '하이브리드' },
  { value: 'remote', label: '원격' },
];

export function SignupIndividualProfilePage() {
  usePageTitle('프로필 시작');

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    desiredRole: '',
    careerLevel: '',
    employmentType: '',
    workStyle: '',
    oneLineIntro: '',
    visibility: 'related',
    allowProposal: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Individual signup step 2:', formData);
    navigate(ROUTE_PATHS.home);
  };

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="login-container">
          <div className="login-card surface-card">
            <div className="login-header">
              <h1>프로필 시작</h1>
              <p className="login-subtitle">희망하는 조건을 선택해주세요</p>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="desiredRole">희망 직무</label>
                <input
                  type="text"
                  id="desiredRole"
                  name="desiredRole"
                  value={formData.desiredRole}
                  onChange={handleChange}
                  placeholder="예: 프론트엔드 개발자, 마케팅策划"
                  required
                />
              </div>

              <div className="form-group">
                <label>경력 수준</label>
                <div className="chip-group">
                  {careerLevels.map(level => (
                    <label key={level.value} className="chip-label">
                      <input
                        type="radio"
                        name="careerLevel"
                        value={level.value}
                        checked={formData.careerLevel === level.value}
                        onChange={handleChange}
                      />
                      <span className="chip">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>희망 고용 형태</label>
                <div className="chip-group">
                  {employmentTypes.map(type => (
                    <label key={type.value} className="chip-label">
                      <input
                        type="radio"
                        name="employmentType"
                        value={type.value}
                        checked={formData.employmentType === type.value}
                        onChange={handleChange}
                      />
                      <span className="chip">{type.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>희망 근무 방식</label>
                <div className="chip-group">
                  {workStyles.map(style => (
                    <label key={style.value} className="chip-label">
                      <input
                        type="radio"
                        name="workStyle"
                        value={style.value}
                        checked={formData.workStyle === style.value}
                        onChange={handleChange}
                      />
                      <span className="chip">{style.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="oneLineIntro">한 줄 소개</label>
                <input
                  type="text"
                  id="oneLineIntro"
                  name="oneLineIntro"
                  value={formData.oneLineIntro}
                  onChange={handleChange}
                  placeholder="나를 한마디로 소개하면?"
                />
              </div>

              <div className="form-group">
                <label>공개 범위</label>
                <div className="chip-group">
                  <label className="chip-label">
                    <input
                      type="radio"
                      name="visibility"
                      value="related"
                      checked={formData.visibility === 'related'}
                      onChange={handleChange}
                    />
                    <span className="chip">희망 직무 관련 기업만</span>
                  </label>
                  <label className="chip-label">
                    <input
                      type="radio"
                      name="visibility"
                      value="all"
                      checked={formData.visibility === 'all'}
                      onChange={handleChange}
                    />
                    <span className="chip">전체 기업</span>
                  </label>
                </div>
              </div>

              <label className="checkbox-label login-remember">
                <input
                  type="checkbox"
                  name="allowProposal"
                  checked={formData.allowProposal}
                  onChange={handleChange}
                />
                <span>기업からの提案を受け取る (허용)</span>
              </label>

              <button type="submit" className="btn btn--primary btn--full">
                프로필 완성하기
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
