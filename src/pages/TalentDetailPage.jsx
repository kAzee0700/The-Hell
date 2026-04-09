import { Link, useParams } from 'react-router-dom';
import { Pill } from '../components/Pill';
import { usePageTitle } from '../hooks/usePageTitle';
import { getTalentProfileById } from '../data/talentProfiles';
import { buildPath, ROUTE_PATHS } from '../utils/routes';

export function TalentDetailPage() {
  const { talentId } = useParams();
  const talentProfile = getTalentProfileById(talentId);

  usePageTitle(talentProfile ? `${talentProfile.name} 프로필` : '구직자 프로필 상세');

  if (!talentProfile) {
    return (
      <section className="page-shell talent-page">
        <div className="container talent-page__inner">
          <div className="talent-page__hero">
            <p className="eyebrow">Talent Detail</p>
            <h1>프로필을 찾을 수 없습니다</h1>
            <p className="page-shell__copy">삭제되었거나 잘못된 주소입니다. 목록에서 다시 선택해 주세요.</p>
            <div className="page-shell__actions">
              <Link className="action-link" to={ROUTE_PATHS.talents}>
                탐색 목록으로
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell talent-page">
      <div className="container talent-page__inner">
        <div className="talent-detail-hero surface-card">
          <div className="talent-detail-hero__content">
            <p className="eyebrow">{talentProfile.title}</p>
            <h1>{talentProfile.name}</h1>
            <p className="talent-detail-hero__role">{talentProfile.desiredRoles.join(' · ')}</p>
            <p className="page-shell__copy">{talentProfile.intro}</p>
          </div>
          <div className="talent-detail-hero__aside">
            <div className="talent-detail-stat">
              <span>경력 구분</span>
              <strong>{talentProfile.careerType}</strong>
            </div>
            <div className="talent-detail-stat">
              <span>총 경력</span>
              <strong>{talentProfile.totalCareer}</strong>
            </div>
            <div className="talent-detail-stat">
              <span>희망 조건</span>
              <strong>{talentProfile.conditionLabel}</strong>
            </div>
            <div className="talent-detail-stat">
              <span>노출 상태</span>
              <strong>{talentProfile.visibility}</strong>
            </div>
          </div>
          <div className="page-shell__actions talent-detail-hero__actions">
            <Link className="action-link" to={buildPath.offerCreate(talentProfile.id)}>
              구원 제안 보내기
            </Link>
            <Link className="action-link action-link--ghost" to={ROUTE_PATHS.talents}>
              목록으로 돌아가기
            </Link>
          </div>
        </div>

        <div className="talent-detail-grid">
          <article className="surface-card detail-card detail-card--chips">
            <h2>핵심 경험</h2>
            <div className="talent-card__chips">
              {talentProfile.highlights.map((item) => (
                <Pill key={`${talentProfile.id}-highlight-${item}`}>{item}</Pill>
              ))}
            </div>
          </article>

          <article className="surface-card detail-card">
            <h2>기대하는 점</h2>
            <ul className="info-list">
              {talentProfile.expectations.map((item) => (
                <li key={`${talentProfile.id}-expectation-${item}`}>{item}</li>
              ))}
            </ul>
          </article>

          <article className="surface-card detail-card">
            <h2>등록 정보</h2>
            <ul className="info-list">
              <li>{`프로필 제목: ${talentProfile.title}`}</li>
              <li>{`나이 / 성별: ${talentProfile.age} / ${talentProfile.gender}`}</li>
              <li>{`공개 범위 문구: ${talentProfile.visibility}`}</li>
            </ul>
          </article>

          <article className="surface-card detail-card">
            <h2>걱정되는 점</h2>
            <ul className="info-list">
              {talentProfile.concerns.map((item) => (
                <li key={`${talentProfile.id}-concern-${item}`}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
