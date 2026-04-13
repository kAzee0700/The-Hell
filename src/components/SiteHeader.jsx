import { NavLink } from 'react-router-dom';
import { useViewerAccess } from '../hooks/useViewerAccess';
import { useAuth } from '../hooks/useAuth';
import { VIEWER_ACCESS } from '../utils/access-levels';
import { ROUTE_PATHS } from '../utils/routes';
import Logo from '../assets/Logo.svg';

const mobileNavByViewer = {
  [VIEWER_ACCESS.public]: [
    { to: ROUTE_PATHS.home, label: '홈', icon: '⌂' },
    { to: ROUTE_PATHS.about, label: '소개', icon: '◉' },
    { to: ROUTE_PATHS.profile, label: '시작', icon: '▶' },
  ],
  [VIEWER_ACCESS.admin]: [
    { to: ROUTE_PATHS.home, label: '홈', icon: '⌂' },
    { to: ROUTE_PATHS.adminUsers, label: '회원', icon: '◉' },
    { to: ROUTE_PATHS.adminCompanies, label: '기업', icon: '◎' },
    { to: ROUTE_PATHS.adminReports, label: '신고', icon: '▣' },
  ],
  [VIEWER_ACCESS.jobSeeker]: [
    { to: ROUTE_PATHS.home, label: '홈', icon: '⌂' },
    { to: ROUTE_PATHS.profile, label: '프로필', icon: '◉' },
    { to: ROUTE_PATHS.proposals, label: '구원', icon: '◈' },
    { to: ROUTE_PATHS.viewHistory, label: '이력', icon: '▣' },
  ],
  [VIEWER_ACCESS.companyPending]: [
    { to: ROUTE_PATHS.home, label: '홈', icon: '⌂' },
    { to: ROUTE_PATHS.companyVerify, label: '인증', icon: '✓' },
    { to: ROUTE_PATHS.viewHistory, label: '이력', icon: '▣' },
  ],
  [VIEWER_ACCESS.companyVerified]: [
    { to: ROUTE_PATHS.home, label: '홈', icon: '⌂' },
    { to: ROUTE_PATHS.talents, label: '탐색', icon: '◎' },
    { to: ROUTE_PATHS.offers, label: '구원', icon: '◈' },
    { to: ROUTE_PATHS.viewHistory, label: '이력', icon: '▣' },
  ],
};

export function SiteHeader() {
  const viewer = useViewerAccess();
  const { user, logout } = useAuth();
  const isGuest = !user;

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink className="site-brand" to={ROUTE_PATHS.home} aria-label="지옥 홈">
          <img src={Logo} alt="지옥" className="site-brand__logo" />
        </NavLink>

        {isGuest ? (
          <nav className="site-nav site-nav--center" aria-label="서비스 메뉴">
            <NavLink to={ROUTE_PATHS.about} className="site-nav__link">서비스 소개</NavLink>
            <NavLink to={ROUTE_PATHS.howToUse} className="site-nav__link">이용 방식</NavLink>
            <NavLink to={ROUTE_PATHS.companyGuide} className="site-nav__link">기업 안내</NavLink>
            <NavLink to={ROUTE_PATHS.profile} className="site-nav__link">시작하기</NavLink>
          </nav>
        ) : (
          <nav className="site-nav" aria-label="메인 메뉴">
            {viewer === VIEWER_ACCESS.admin && (
              <>
                <NavLink to={ROUTE_PATHS.admin} className="site-nav__link">대시보드</NavLink>
                <NavLink to={ROUTE_PATHS.adminUsers} className="site-nav__link">회원 관리</NavLink>
                <NavLink to={ROUTE_PATHS.adminCompanies} className="site-nav__link">기업 관리</NavLink>
                <NavLink to={ROUTE_PATHS.adminReports} className="site-nav__link">신고/열람</NavLink>
              </>
            )}
            {viewer === VIEWER_ACCESS.jobSeeker && (
              <>
                <NavLink to={ROUTE_PATHS.profile} className="site-nav__link">내 프로필</NavLink>
                <NavLink to={ROUTE_PATHS.visibility} className="site-nav__link">공개 범위</NavLink>
                <NavLink to={ROUTE_PATHS.proposals} className="site-nav__link">받은 구원</NavLink>
                <NavLink to={ROUTE_PATHS.viewHistory} className="site-nav__link">열람 이력</NavLink>
              </>
            )}
            {viewer === VIEWER_ACCESS.companyPending && (
              <NavLink to={ROUTE_PATHS.companyVerify} className="site-nav__link">기업 인증</NavLink>
            )}
            {viewer === VIEWER_ACCESS.companyVerified && (
              <>
                <NavLink to={ROUTE_PATHS.talents} className="site-nav__link">탐색</NavLink>
                <NavLink to={ROUTE_PATHS.saved} className="site-nav__link">구원 후보함</NavLink>
                <NavLink to={ROUTE_PATHS.offers} className="site-nav__link">구원 제안</NavLink>
                <NavLink to={ROUTE_PATHS.viewHistory} className="site-nav__link">열람 이력</NavLink>
              </>
            )}
          </nav>
        )}

        <div className="site-header__actions">
          {isGuest ? (
            <>
              <NavLink className="site-nav__link" to="/login">
                로그인
              </NavLink>
              <NavLink className="btn btn--primary btn--sm" to="/signup">
                회원가입
              </NavLink>
            </>
          ) : (
            <>
              <span className="site-header__user">
                {user.name || user.email}
              </span>
              <button className="btn btn--ghost btn--sm" onClick={logout}>
                로그아웃
              </button>
            </>
          )}
        </div>
      </div>

      <nav className="site-bottom-nav" aria-label="모바일 메뉴">
        {mobileNavByViewer[viewer]?.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `site-bottom-nav__item ${isActive ? 'active' : ''}`
            }
          >
            <span className="site-bottom-nav__icon">{item.icon}</span>
            <span className="site-bottom-nav__label">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
