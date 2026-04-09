import { Link } from 'react-router-dom';
import { Pill } from '../components/Pill';
import { getBaseTalentProfiles } from '../data/talentProfiles';
import { usePageTitle } from '../hooks/usePageTitle';
import { ROUTE_PATHS } from '../utils/routes';

const visibleProfiles = getBaseTalentProfiles()
  .slice(0, 6)
  .map((profile) => ({
    id: profile.id,
    name: profile.name,
    title: profile.title,
    desiredRole: profile.desiredRoleLabel,
    career: `${profile.careerType} ${profile.totalCareer}`,
    intro: profile.cardIntro ?? profile.intro,
    highlights: profile.highlights.slice(0, 3),
    condition: profile.conditionLabel,
    status: profile.status,
    visibility: profile.visibility,
  }));

const recentOffers = [
  {
    targetName: '윤가은',
    offerRole: '고객 성공 운영',
    reason: '가능 시점 확인',
    companyLabel: '인증 기업',
    status: '수락 대기',
    timing: '방금 도착',
  },
  {
    targetName: '최현우',
    offerRole: '프론트엔드 전환',
    reason: '전환 의지 확인',
    companyLabel: '인증 기업',
    status: '검토 중',
    timing: '22분 전',
  },
  {
    targetName: '문지환',
    offerRole: '브랜드 콘텐츠 에디터',
    reason: '글쓰기 경험 확인',
    companyLabel: '인증 기업',
    status: '신규 도착',
    timing: '오늘 오전',
  },
  {
    targetName: '송하린',
    offerRole: '콘텐츠 기획 제안',
    reason: '원격 조건 반영',
    companyLabel: '인증 기업',
    status: '제한 공개',
    timing: '오늘 오전',
  },
];

const highlightedOffer = recentOffers[0];

const trustPoints = ['인증 기업만 열람', '희망 직무 기준 공개', '수락 전 정보 제한 공개'];

const featuredThemes = [
  {
    label: '원격/하이브리드',
    title: '출근 부담이 적은 조건',
    description: '원격 또는 하이브리드 조건을 포함한 프로필을 바로 확인합니다.',
  },
  {
    label: '운영 · 기획',
    title: '서비스를 굴리는 역할군',
    description: '운영, 협업 조율, 프로덕트 실행 경험을 가진 인재를 모아봅니다.',
  },
  {
    label: '전환 준비',
    title: '경력 전환을 준비하는 후보',
    description: '개인 프로젝트와 전환 의지를 드러낸 프로필만 따로 볼 수 있습니다.',
  },
  {
    label: '빠른 검토',
    title: '지금 제안 검토 중인 인재',
    description: '현재 열람 가능 상태와 최근 제안 반응이 있는 후보를 빠르게 살펴봅니다.',
  },
];

const statCards = [
  {
    label: '노출 프로필',
    value: String(visibleProfiles.length),
    description: '직무 기준 공개',
  },
  {
    label: '최근 제안',
    value: String(recentOffers.length),
    description: '최근 도착 기준',
  },
  {
    label: '열람 가능',
    value: 'ON',
    description: '인증 기업 기준',
  },
];

export function HomePage() {
  usePageTitle('메인');

  return (
    <div className="home-hub">
      <section className="home-hero">
        <div className="container home-hero__inner">
          <div className="home-hero__content">
            <p className="eyebrow">Hell</p>
            <h1>사람을 먼저 올리고, 기업이 제안하는 채용</h1>
            <p className="home-hero__copy">등록된 프로필과 최근 제안을 바로 확인하고 필요한 흐름으로 이동할 수 있습니다.</p>
            <div className="home-hero__actions">
              <Link className="action-link" to={ROUTE_PATHS.profile}>
                프로필 등록
              </Link>
              <Link className="action-link action-link--ghost" to={ROUTE_PATHS.talents}>
                프로필 탐색
              </Link>
            </div>
            <div className="home-trust-list" aria-label="핵심 신뢰 기준">
              {trustPoints.map((point) => (
                <Pill key={point}>{point}</Pill>
              ))}
            </div>
          </div>

          <div className="home-hero__panel surface-card">
            <div className="home-live-panel">
              <div className="home-live-panel__head">
                <p className="home-status-card__label">실시간 제안</p>
                <span className="signal-card__status">{highlightedOffer.status}</span>
              </div>
              <div className="home-live-panel__block">
                <strong className="home-status-card__value">{highlightedOffer.targetName} 님 제안 도착</strong>
                <p className="home-status-card__copy">{highlightedOffer.offerRole}</p>
              </div>
              <div className="home-live-panel__rows">
                <div className="home-live-row">
                  <span>제안 주체</span>
                  <strong>{highlightedOffer.companyLabel}</strong>
                </div>
                <div className="home-live-row">
                  <span>판단 근거</span>
                  <strong>{highlightedOffer.reason}</strong>
                </div>
                <div className="home-live-row">
                  <span>도착 시점</span>
                  <strong>{highlightedOffer.timing}</strong>
                </div>
              </div>
              <Link className="text-link" to={ROUTE_PATHS.proposals}>
                제안함 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-section__inner">
          <div className="home-section__head">
            <p className="eyebrow">운영 현황</p>
            <h2>지금 확인할 수 있는 운영 상태</h2>
          </div>
          <div className="home-metrics-grid">
            {statCards.map((card) => (
              <article key={card.label} className="surface-card metric-card">
                <p className="metric-card__label">{card.label}</p>
                <strong className="metric-card__value">{card.value}</strong>
                <p className="metric-card__copy">{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-section__inner">
          <div className="home-section__head">
            <p className="eyebrow">추천 조건</p>
            <h2>지금 바로 들어가 볼 만한 탐색 묶음</h2>
          </div>
          <div className="home-theme-grid">
            {featuredThemes.map((theme) => (
              <article key={theme.title} className="surface-card theme-card">
                <p className="theme-card__label">{theme.label}</p>
                <h3>{theme.title}</h3>
                <p>{theme.description}</p>
                <Link className="text-link" to={ROUTE_PATHS.talents}>
                  관련 프로필 보기
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-section__inner">
          <div className="home-section__head">
            <p className="eyebrow">등록 프로필</p>
            <h2>최근 등록된 프로필</h2>
          </div>
          <div className="home-profile-grid">
            {visibleProfiles.map((profile) => (
              <article key={profile.id} className="surface-card profile-card">
                <div className="profile-card__head">
                  <div className="profile-card__title-group">
                    <p className="profile-card__name">{profile.title}</p>
                    <h3>{profile.name}</h3>
                  </div>
                  <span className="signal-card__status">{profile.status}</span>
                </div>
                <div className="profile-card__meta">
                  <span>{profile.desiredRole}</span>
                  <span>{profile.career}</span>
                  <span>{profile.condition}</span>
                </div>
                <p className="profile-card__highlight">{profile.intro}</p>
                <div className="talent-card__chips">
                  {profile.highlights.map((item) => (
                    <Pill key={`${profile.id}-${item}`}>{item}</Pill>
                  ))}
                </div>
                <div className="profile-card__footer">
                  <span className="profile-card__visibility">{profile.visibility}</span>
                  <Link className="text-link" to={ROUTE_PATHS.talents}>
                    프로필 보기
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-section__inner">
          <div className="home-section__head">
            <p className="eyebrow">최근 제안</p>
            <h2>최근 도착한 구원 제안</h2>
          </div>
          <div className="home-feed-grid">
            <article className="surface-card feed-card">
              <div className="feed-card__head">
                <h3>최근 제안</h3>
                <Link className="text-link" to={ROUTE_PATHS.proposals}>
                  제안함 보기
                </Link>
              </div>
              <div className="feed-card__list">
                {recentOffers.map((offer) => (
                  <div key={`${offer.targetName}-${offer.offerRole}`} className="feed-row">
                    <div className="feed-row__content">
                      <strong>{offer.offerRole}</strong>
                      <p>{offer.targetName} 님 대상</p>
                      <p>{offer.reason}</p>
                    </div>
                    <div className="feed-row__aside">
                      <span className="signal-card__status">{offer.status}</span>
                      <small>{offer.timing}</small>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="surface-card feed-card">
              <div className="feed-card__head">
                <h3>열람 가능 프로필</h3>
                <Link className="text-link" to={ROUTE_PATHS.talents}>
                  목록 보기
                </Link>
              </div>
              <div className="feed-card__list">
                {visibleProfiles.slice(0, 4).map((profile) => (
                    <div key={`${profile.id}-visible`} className="feed-row">
                      <div className="feed-row__content">
                        <strong>{profile.name}</strong>
                        <p>{profile.desiredRole}</p>
                        <p>{profile.intro}</p>
                      </div>
                    <div className="feed-row__aside">
                      <span className="signal-card__status">{profile.visibility}</span>
                      <small>{profile.condition}</small>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
