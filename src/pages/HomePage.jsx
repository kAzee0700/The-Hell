import { Link } from 'react-router-dom';
import { getBaseTalentProfiles } from '../data/talentProfiles';
import { usePageTitle } from '../hooks/usePageTitle';
import { ROUTE_PATHS } from '../utils/routes';

const recentOffers = [
  {
    targetName: '윤가은',
    offerRole: '고객 성공 운영',
    reason: '가능 시점 확인',
    status: '수락 대기',
    timing: '방금 도착',
  },
  {
    targetName: '최현우',
    offerRole: '프론트엔드 전환',
    reason: '전환 의지 확인',
    status: '검토 중',
    timing: '22분 전',
  },
  {
    targetName: '문지환',
    offerRole: '브랜드 콘텐츠 에디터',
    reason: '글쓰기 경험 확인',
    status: '신규 도착',
    timing: '오늘 오전',
  },
  {
    targetName: '송하린',
    offerRole: '콘텐츠 기획 제안',
    reason: '원격 조건 반영',
    status: '제한 공개',
    timing: '오늘 오전',
  },
];

const heroAlert = recentOffers[0];

function getFilterCount(profiles, filterId) {
  const count = profiles.filter((p) => {
    if (filterId === 'remote') {
      return p.workStyle.includes('원격') || p.workStyle.includes('하이브리드');
    }
    if (filterId === 'on-site') {
      return p.workStyle.includes('출근');
    }
    if (filterId === 'career') {
      return p.careerType === '경력';
    }
    if (filterId === 'career-change') {
      return p.careerType.includes('전환');
    }
    if (filterId === 'career-return') {
      return p.careerType.includes('복귀');
    }
    if (filterId === 'newcomer') {
      return p.careerType === '신입' || p.careerType === '무경력' || p.totalCareer === '0년' || p.totalCareer === '1년 미만';
    }
    if (filterId === 'engineering') {
      return p.desiredRoles.some((r) => /IT|개발|웹|프론트엔드|백엔드|엔지니어|기술|게임/.test(r));
    }
    if (filterId === 'devops') {
      return p.desiredRoles.some((r) => /DevOps|인프라|클라우드|시스템|서버|네트워크/.test(r));
    }
    if (filterId === 'data-ai') {
      return p.desiredRoles.some((r) => /데이터|분석|AI|머신러닝|MLOps|사이언스/.test(r));
    }
    if (filterId === 'operation') {
      return p.desiredRoles.some((r) => /운영|기획|매니지먼트|오퍼레이션|프로젝트|품질/.test(r));
    }
    if (filterId === 'marketing') {
      return p.desiredRoles.some((r) => /마케팅|광고|브랜드|스포츠/.test(r));
    }
    if (filterId === 'content') {
      return p.desiredRoles.some((r) => /콘텐츠|에디터|글쓰기|편집|미디어|출판|번역/.test(r));
    }
    if (filterId === 'design') {
      return p.desiredRoles.some((r) => /디자인|UX|UI|크리에이티브|시각/.test(r));
    }
    if (filterId === 'customer') {
      return p.desiredRoles.some((r) => /고객|CS|지원|고객경험|성공/.test(r));
    }
    if (filterId === 'data') {
      return p.desiredRoles.some((r) => /데이터|분석|리서치/.test(r));
    }
    if (filterId === 'sales') {
      return p.desiredRoles.some((r) => /영업|사업|BizDev|파트너/.test(r));
    }
    if (filterId === 'admin') {
      return p.desiredRoles.some((r) => /사무|총무|인사|행정|복리/.test(r));
    }
    if (filterId === 'finance') {
      return p.desiredRoles.some((r) => /재무|회계|금융|자산|투자|IR|펀드/.test(r));
    }
    if (filterId === 'legal') {
      return p.desiredRoles.some((r) => /법무|법률|지적|컴플라이/.test(r));
    }
    if (filterId === 'consult') {
      return p.desiredRoles.some((r) => /컨설팅|전략|경영/.test(r));
    }
    if (filterId === 'product') {
      return p.desiredRoles.some((r) => /프로덕트|서비스|앱/.test(r));
    }
    if (filterId === 'hr') {
      return p.desiredRoles.some((r) => /HRBP|조직|리더십|채용|조직문화/.test(r));
    }
    if (filterId === 'edu') {
      return p.desiredRoles.some((r) => /교육|학원|커리큘럼/.test(r));
    }
    if (filterId === 'medical') {
      return p.desiredRoles.some((r) => /의료|제약|간호|요양|바이오/.test(r));
    }
    if (filterId === 'finance-industry') {
      return p.desiredRoles.some((r) => /은행|보험|카드|WM|핀테크/.test(r));
    }
    if (filterId === 'logistics') {
      return p.desiredRoles.some((r) => /물류|유통|배송|창고/.test(r));
    }
    if (filterId === 'manufacturing') {
      return p.desiredRoles.some((r) => /생산|제조|공장|품질|설비|전기|전자|기계|용접/.test(r));
    }
    if (filterId === 'construction') {
      return p.desiredRoles.some((r) => /건설|부동산|건축|배관|공정/.test(r));
    }
    if (filterId === 'agriculture') {
      return p.desiredRoles.some((r) => /농업|축산|사육/.test(r));
    }
    if (filterId === 'beauty') {
      return p.desiredRoles.some((r) => /미용|헤어|피부|에스테틱|뷰티/.test(r));
    }
    if (filterId === 'culinary') {
      return p.desiredRoles.some((r) => /조리|요리|제빵|베이커리/.test(r));
    }
    if (filterId === 'service-field') {
      return p.desiredRoles.some((r) => /호텔|관광|리조트|세탁|청소/.test(r));
    }
    if (filterId === 'automotive') {
      return p.desiredRoles.some((r) => /자동차|정비/.test(r));
    }
    if (filterId === 'hidden') {
      return p.visibility.includes('제한') || p.visibility.includes('비공개') || p.workStyle.includes('비공개');
    }
    return false;
  }).length;
  return count > 0 ? String(count) : null;
}

const allProfiles = getBaseTalentProfiles();

const quickFilters = [
  { id: 'remote', label: '원격·하이브리드', count: getFilterCount(allProfiles, 'remote') },
  { id: 'on-site', label: '출근형', count: getFilterCount(allProfiles, 'on-site') },
  { id: 'career', label: '경력', count: getFilterCount(allProfiles, 'career') },
  { id: 'career-change', label: '경력 전환', count: getFilterCount(allProfiles, 'career-change') },
  { id: 'career-return', label: '복귀 준비', count: getFilterCount(allProfiles, 'career-return') },
  { id: 'newcomer', label: '신입·무경력', count: getFilterCount(allProfiles, 'newcomer') },
  { id: 'engineering', label: 'IT·개발', count: getFilterCount(allProfiles, 'engineering') },
  { id: 'devops', label: 'DevOps·인프라', count: getFilterCount(allProfiles, 'devops') },
  { id: 'data-ai', label: '데이터·AI', count: getFilterCount(allProfiles, 'data-ai') },
  { id: 'operation', label: '운영·기획', count: getFilterCount(allProfiles, 'operation') },
  { id: 'product', label: '프로덕트', count: getFilterCount(allProfiles, 'product') },
  { id: 'marketing', label: '마케팅', count: getFilterCount(allProfiles, 'marketing') },
  { id: 'content', label: '콘텐츠', count: getFilterCount(allProfiles, 'content') },
  { id: 'design', label: '디자인', count: getFilterCount(allProfiles, 'design') },
  { id: 'customer', label: '고객관리', count: getFilterCount(allProfiles, 'customer') },
  { id: 'data', label: '데이터', count: getFilterCount(allProfiles, 'data') },
  { id: 'sales', label: '영업', count: getFilterCount(allProfiles, 'sales') },
  { id: 'admin', label: '사무·총무', count: getFilterCount(allProfiles, 'admin') },
  { id: 'hr', label: '인사·HR', count: getFilterCount(allProfiles, 'hr') },
  { id: 'finance', label: '재무·금융', count: getFilterCount(allProfiles, 'finance') },
  { id: 'legal', label: '법무', count: getFilterCount(allProfiles, 'legal') },
  { id: 'consult', label: '컨설팅', count: getFilterCount(allProfiles, 'consult') },
  { id: 'edu', label: '교육', count: getFilterCount(allProfiles, 'edu') },
  { id: 'medical', label: '의료·제약', count: getFilterCount(allProfiles, 'medical') },
  { id: 'finance-industry', label: '금융업', count: getFilterCount(allProfiles, 'finance-industry') },
  { id: 'logistics', label: '물류·유통', count: getFilterCount(allProfiles, 'logistics') },
  { id: 'manufacturing', label: '제조·생산', count: getFilterCount(allProfiles, 'manufacturing') },
  { id: 'construction', label: '건설·부동산', count: getFilterCount(allProfiles, 'construction') },
  { id: 'agriculture', label: '농축산업', count: getFilterCount(allProfiles, 'agriculture') },
  { id: 'beauty', label: '미용·뷰티', count: getFilterCount(allProfiles, 'beauty') },
  { id: 'culinary', label: '요리·제빵', count: getFilterCount(allProfiles, 'culinary') },
  { id: 'service-field', label: '호텔·관광', count: getFilterCount(allProfiles, 'service-field') },
  { id: 'automotive', label: '자동차·정비', count: getFilterCount(allProfiles, 'automotive') },
  { id: 'hidden', label: '제한 공개', count: getFilterCount(allProfiles, 'hidden') },
];

const metrics = [
  { value: '2', unit: '건', label: '제안 대기', sub: '오늘 도착' },
  { value: '6', unit: '명', label: '노출 프로필', sub: '열람 가능' },
  { value: '4', unit: '개', label: '최근 도착', sub: '오늘 기준' },
];

const profileList = getBaseTalentProfiles()
  .slice(0, 4)
  .map((profile) => ({
    id: profile.id,
    name: profile.name,
    role: profile.desiredRoleLabel,
    status: profile.status,
    timing: '오늘 등록',
  }));

const activityFeed = recentOffers.slice(0, 3).map((offer) => ({
  id: `${offer.targetName}-${offer.offerRole}`,
  role: offer.offerRole,
  target: offer.targetName,
  reason: offer.reason,
  status: offer.status,
  timing: offer.timing,
  isNew: offer.timing === '방금 도착' || offer.timing === '22분 전',
}));

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
          </div>

          <div className="home-hero__panel surface-card">
            <div className="home-live-panel">
              <div className="home-live-panel__head">
                <p className="home-status-card__label">실시간 제안</p>
                <span className="signal-card__status">{heroAlert.status}</span>
              </div>
              <div className="home-live-panel__block">
                <strong className="home-status-card__value">{heroAlert.targetName} 님 제안 도착</strong>
                <p className="home-status-card__copy">{heroAlert.offerRole}</p>
              </div>
              <div className="home-live-panel__rows">
                <div className="home-live-row">
                  <span>판단 근거</span>
                  <strong>{heroAlert.reason}</strong>
                </div>
                <div className="home-live-row">
                  <span>도착 시점</span>
                  <strong>{heroAlert.timing}</strong>
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
            <p className="eyebrow">현황</p>
            <h2>프로필 노출 · 열람 가능</h2>
          </div>
          <div className="home-metrics-grid">
            {metrics.map((m) => (
              <article key={m.label} className="metric-card">
                <p className="metric-card__label">{m.label}</p>
                <div className="metric-card__value">
                  <strong>{m.value}</strong>
                  <span>{m.unit}</span>
                </div>
                <p className="metric-card__copy">{m.sub}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-section__inner">
          <div className="home-section__head">
            <p className="eyebrow">카테고리</p>
            <h2>조건별 탐색 묶음</h2>
          </div>
          <nav className="home-category-pills">
            {quickFilters.map((filter) => (
              <Link
                key={filter.id}
                to={`${ROUTE_PATHS.talents}?filter=${filter.id}`}
                className="home-category-pill"
              >
                <span className="home-category-pill__label">{filter.label}</span>
                <span className="home-category-pill__count">{filter.count}</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-section__inner">
          <div className="home-section__head">
            <p className="eyebrow">등록 프로필</p>
            <h2>최근 등록된 프로필</h2>
          </div>
          <ul className="profile-list">
            {profileList.map((profile) => (
              <li key={profile.id} className="profile-list-item">
                <span className="signal-card__status">{profile.status}</span>
                <div className="profile-list-item__info">
                  <strong>{profile.name}</strong>
                  <span>{profile.role}</span>
                </div>
                <span className="profile-list-item__time">{profile.timing}</span>
                <Link to={`${ROUTE_PATHS.talents}/${profile.id}`} className="text-link">
                  프로필 보기
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-section">
        <div className="container home-section__inner">
          <div className="home-section__head">
            <p className="eyebrow">최근 제안</p>
            <Link to={ROUTE_PATHS.proposals} className="text-link">전체 보기</Link>
          </div>
          <ol className="timeline-list">
              {activityFeed.map((item, index) => (
                <li key={item.id} className={`timeline-item ${item.isNew ? 'timeline-item--new' : ''}`}>
                  <div className="timeline-item__dot" />
                  {index < activityFeed.length - 1 && <div className="timeline-item__line" />}
                  <div className="timeline-item__content">
                    <div className="timeline-item__head">
                      <strong>{item.role}</strong>
                      <span className="signal-card__status">{item.status}</span>
                    </div>
                    <p className="timeline-item__meta">
                      {item.target} · {item.reason}
                    </p>
                    <time className="timeline-item__time">{item.timing}</time>
                  </div>
                </li>
              ))}
            </ol>
        </div>
      </section>
    </div>
  );
}
