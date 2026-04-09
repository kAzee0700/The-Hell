import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { createTalentProfile } from '../data/talentProfiles';
import { buildPath, ROUTE_PATHS } from '../utils/routes';

const initialForm = {
  title: '',
  name: '',
  age: '',
  gender: '',
  desiredRoles: '',
  careerType: '',
  totalCareer: '',
  highlights: '',
  employment: '',
  workStyle: '',
  visibility: '조건 맞는 기업에만 공개',
  intro: '',
  expectations: '',
  concerns: '',
};

export function JobSeekerProfilePage() {
  usePageTitle('내 프로필 등록 및 수정');

  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const createdProfile = createTalentProfile(form);
    setForm(initialForm);
    navigate(buildPath.talentDetail(createdProfile.id));
  }

  return (
    <section className="page-shell talent-page">
      <div className="container talent-page__inner">
        <div className="talent-page__hero">
          <p className="eyebrow">Profile Registration</p>
          <h1>지금 프로필을 입력해 주세요</h1>
          <p className="page-shell__copy">희망 직무, 경력, 공개 범위를 적고 저장하면 바로 등록됩니다.</p>
          <div className="page-shell__actions">
            <Link className="action-link action-link--ghost" to={ROUTE_PATHS.talents}>
              탐색 목록 보기
            </Link>
          </div>
        </div>

        <div className="profile-form-layout">
          <form className="surface-card profile-form" onSubmit={handleSubmit}>
            <div className="profile-form__grid">
              <label>
                <span>프로필 제목</span>
                <input name="title" value={form.title} onChange={handleChange} placeholder="예: 조용히 이직을 준비하는 운영 담당자" />
              </label>
              <label>
                <span>이름</span>
                <input name="name" value={form.name} onChange={handleChange} placeholder="이름" required />
              </label>
              <label>
                <span>나이</span>
                <input name="age" value={form.age} onChange={handleChange} placeholder="예: 29세" required />
              </label>
              <label>
                <span>성별</span>
                <input name="gender" value={form.gender} onChange={handleChange} placeholder="예: 여성" required />
              </label>
              <label>
                <span>희망 직무</span>
                <input
                  name="desiredRoles"
                  value={form.desiredRoles}
                  onChange={handleChange}
                  placeholder="예: 고객 성공, 운영 매니지먼트"
                  required
                />
              </label>
              <label>
                <span>경력 구분</span>
                <input name="careerType" value={form.careerType} onChange={handleChange} placeholder="예: 경력 전환" required />
              </label>
              <label>
                <span>총 경력</span>
                <input name="totalCareer" value={form.totalCareer} onChange={handleChange} placeholder="예: 5년" required />
              </label>
              <label>
                <span>핵심 경험</span>
                <input
                  name="highlights"
                  value={form.highlights}
                  onChange={handleChange}
                  placeholder="예: 고객 응대, 운영 개선, 문서화"
                  required
                />
              </label>
              <label>
                <span>희망 고용 형태</span>
                <input name="employment" value={form.employment} onChange={handleChange} placeholder="예: 정규직" required />
              </label>
              <label>
                <span>희망 근무 형태</span>
                <input name="workStyle" value={form.workStyle} onChange={handleChange} placeholder="예: 하이브리드" required />
              </label>
              <label>
                <span>공개 범위</span>
                <select name="visibility" value={form.visibility} onChange={handleChange} required>
                  <option value="누구나 볼 수 있게 공개">누구나 볼 수 있게 공개</option>
                  <option value="조건 맞는 기업에만 공개">조건 맞는 기업에만 공개</option>
                  <option value="제안 받은 뒤에만 일부 공개">제안 받은 뒤에만 일부 공개</option>
                </select>
                <small className="profile-form__hint">지금은 조건 맞는 기업에만 공개가 기본으로 선택됩니다.</small>
              </label>
            </div>

            <label>
              <span>소개 문장</span>
              <textarea
                name="intro"
                value={form.intro}
                onChange={handleChange}
                rows="4"
                placeholder="예: 공고 지원보다 저를 읽고 먼저 제안하는 회사와 연결되고 싶습니다."
                required
              />
            </label>

            <label>
              <span>기대하는 점</span>
              <textarea
                name="expectations"
                value={form.expectations}
                onChange={handleChange}
                rows="4"
                placeholder={"줄바꿈으로 구분해서 입력\n예: 희망 직무가 먼저 보였으면 합니다"}
                required
              />
            </label>

            <label>
              <span>걱정되는 점</span>
              <textarea
                name="concerns"
                value={form.concerns}
                onChange={handleChange}
                rows="4"
                placeholder={"줄바꿈으로 구분해서 입력\n예: 공개 범위가 약하면 불안합니다"}
                required
              />
            </label>

            <div className="page-shell__actions">
              <button className="action-link profile-form__submit" type="submit">
                프로필 저장
              </button>
            </div>
          </form>

          <aside className="surface-card profile-preview">
            <p className="eyebrow">미리보기</p>
            <p className="profile-preview__title">{form.title || '프로필 제목이 여기에 표시됩니다'}</p>
            <h2>{form.name || '이름 미입력'}</h2>
            <p className="talent-card__role">{form.desiredRoles || '희망 직무를 입력하면 여기에 표시됩니다'}</p>
            <div className="talent-card__meta">
              <span>{form.careerType || '경력 구분'}</span>
              <span>{form.totalCareer || '총 경력'}</span>
              <span>{[form.employment, form.workStyle].filter(Boolean).join(' · ') || '고용 형태 · 근무 형태'}</span>
            </div>
            <p className="talent-card__intro">{form.intro || '소개 문장을 입력하면 카드 미리보기가 보입니다.'}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
