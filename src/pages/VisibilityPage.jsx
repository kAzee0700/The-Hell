import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';
import { useAuth } from '../hooks/useAuth';
import { ROUTE_PATHS } from '../utils/routes';
import { api } from '../services/api';

const VISIBILITY_OPTIONS = [
  {
    value: 'public',
    label: '누구나 볼 수 있게 공개',
    description: '모든 기업회원이 내 프로필을 열람할 수 있습니다.'
  },
  {
    value: 'conditional',
    label: '조건 맞는 기업에만 공개',
    description: '희망 고용형태, 근무방식, 직무가 맞는 기업에 한해 열람 가능합니다.'
  },
  {
    value: 'private',
    label: '제안 받은 뒤에만 공개',
    description: '내가 먼저 구원 제안을 보내고 수락한 기업만 프로필을 열람할 수 있습니다.'
  }
];

export function VisibilityPage() {
  usePageTitle('공개 범위 설정');
  const { user } = useAuth();
  const navigate = useNavigate();

  const [visibility, setVisibility] = useState('conditional');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await api.profile.getMyProfile();
      if (data.profile?.profileVisibility) {
        setVisibility(data.profile.profileVisibility);
      }
    } catch (err) {
      console.error('Load profile error:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    setError(null);
    setSuccess(false);
    setSaving(true);

    try {
      await api.profile.updateVisibility(visibility);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <section className="page-shell">
        <div className="container page-shell__inner">
          <div className="admin-loading">로딩 중...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell">
      <div className="container page-shell__inner">
        <div className="page-shell__hero">
          <p className="eyebrow">Privacy</p>
          <h1>공개 범위 설정</h1>
          <p className="page-shell__copy">
            내 프로필을 누가 열람할 수 있을지 설정하세요.
          </p>
        </div>

        <div className="visibility-options">
          {VISIBILITY_OPTIONS.map(option => (
            <label
              key={option.value}
              className={`surface-card visibility-option ${visibility === option.value ? 'selected' : ''}`}
            >
              <input
                type="radio"
                name="visibility"
                value={option.value}
                checked={visibility === option.value}
                onChange={(e) => setVisibility(e.target.value)}
              />
              <div className="visibility-option__content">
                <span className="visibility-option__label">{option.label}</span>
                <span className="visibility-option__desc">{option.description}</span>
              </div>
            </label>
          ))}
        </div>

        {error && (
          <div className="form-error" style={{ marginTop: 'var(--space-4)' }}>
            {error}
          </div>
        )}

        {success && (
          <div className="form-success" style={{ marginTop: 'var(--space-4)' }}>
            공개 범위가 저장되었습니다.
          </div>
        )}

        <div className="visibility-actions">
          <button
            className="btn btn--primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? '저장 중...' : '저장'}
          </button>
          <button
            className="btn btn--ghost"
            onClick={() => navigate(ROUTE_PATHS.profile)}
          >
            취소
          </button>
        </div>
      </div>
    </section>
  );
}
