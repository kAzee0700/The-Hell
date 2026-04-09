import { Link } from 'react-router-dom';
import { Pill } from '../components/Pill';
import { usePageTitle } from '../hooks/usePageTitle';
import { getAllTalentProfiles } from '../data/talentProfiles';
import { buildPath, ROUTE_PATHS } from '../utils/routes';

export function TalentListPage() {
  usePageTitle('구직자 탐색');

  const talentProfiles = getAllTalentProfiles();

  return (
    <section className="page-shell talent-page">
      <div className="container talent-page__inner">
        <div className="talent-page__hero">
          <p className="eyebrow">Talent Search</p>
          <h1>지금 열람 가능한 프로필</h1>
          <p className="page-shell__copy">등록된 프로필을 직무, 경력, 공개 범위 기준으로 바로 확인할 수 있습니다.</p>
          <div className="page-shell__actions">
            <Link className="action-link" to={ROUTE_PATHS.profile}>
              프로필 등록하기
            </Link>
            <Link className="action-link action-link--ghost" to={ROUTE_PATHS.saved}>
              구원 후보함 보기
            </Link>
          </div>
        </div>

        <div className="talent-summary-grid">
          <article className="surface-card summary-card">
            <p className="metric-card__label">등록 프로필</p>
            <strong className="metric-card__value">{talentProfiles.length}</strong>
            <p className="metric-card__copy">페르소나 + 직접 등록 프로필</p>
          </article>
          <article className="surface-card summary-card">
            <p className="metric-card__label">원격/하이브리드</p>
            <strong className="metric-card__value">
              {talentProfiles.filter((profile) => profile.workStyle.includes('원격') || profile.workStyle.includes('하이브리드')).length}
            </strong>
            <p className="metric-card__copy">근무 형태 기반 필터</p>
          </article>
          <article className="surface-card summary-card">
            <p className="metric-card__label">경력 전환/복귀</p>
            <strong className="metric-card__value">
              {talentProfiles.filter((profile) => profile.careerType.includes('전환') || profile.careerType.includes('복귀')).length}
            </strong>
            <p className="metric-card__copy">전환 가능성 높은 후보</p>
          </article>
        </div>

        <div className="talent-card-grid">
          {talentProfiles.map((profile) => (
            <article key={profile.id} className="surface-card talent-card">
              <div className="talent-card__head">
                <div className="talent-card__title-group">
                  <p className="talent-card__eyebrow">{profile.title}</p>
                  <h2>{profile.name}</h2>
                  <p className="talent-card__role">{profile.desiredRoleLabel}</p>
                </div>
                <span className="signal-card__status">{profile.status}</span>
              </div>

              <div className="talent-card__meta">
                <span>{profile.careerType}</span>
                <span>{profile.totalCareer}</span>
                <span>{profile.conditionLabel}</span>
              </div>

              <p className="talent-card__intro">{profile.intro}</p>

              <div className="talent-card__chips">
                {profile.highlights.slice(0, 3).map((item) => (
                  <Pill key={`${profile.id}-${item}`} className="talent-chip">
                    {item}
                  </Pill>
                ))}
              </div>

              <div className="talent-card__footer">
                <span className="talent-card__visibility">{profile.visibility}</span>
                <Link className="text-link" to={buildPath.talentDetail(profile.id)}>
                  상세 보기
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
