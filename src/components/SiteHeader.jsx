import { NavLink } from 'react-router-dom';
import { useViewerAccess } from '../hooks/useViewerAccess';
import { VIEWER_ACCESS, withViewer } from '../utils/access-levels';
import { ROUTE_PATHS } from '../utils/routes';

function getNavigationItems(viewer) {
  const commonItems = [
    { to: ROUTE_PATHS.about, label: '서비스 소개' },
    { to: ROUTE_PATHS.safety, label: '안전 안내' },
  ];

  if (viewer === VIEWER_ACCESS.jobSeeker) {
    return [
      ...commonItems,
      { to: ROUTE_PATHS.profile, label: '내 프로필' },
      { to: ROUTE_PATHS.proposals, label: '받은 제안' },
    ];
  }

  if (viewer === VIEWER_ACCESS.companyVerified) {
    return [
      ...commonItems,
      { to: ROUTE_PATHS.talents, label: '구직자 탐색' },
      { to: ROUTE_PATHS.saved, label: '구원 후보함' },
      { to: ROUTE_PATHS.offers, label: '보낸 제안' },
    ];
  }

  if (viewer === VIEWER_ACCESS.companyPending) {
    return [...commonItems, { to: ROUTE_PATHS.companyVerify, label: '기업 인증' }];
  }

  return [...commonItems, { to: ROUTE_PATHS.companyVerify, label: '기업 인증' }];
}

export function SiteHeader() {
  const viewer = useViewerAccess();
  const navigationItems = getNavigationItems(viewer);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink className="site-brand" to={withViewer(ROUTE_PATHS.home, viewer)}>
          지옥
        </NavLink>
        <nav className="site-nav" aria-label="주요 메뉴">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              className="site-nav__link"
              to={withViewer(item.to, viewer)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="container site-nav-mobile-wrap">
        <nav className="site-nav-mobile" aria-label="모바일 주요 메뉴">
          {navigationItems.map((item) => (
            <NavLink
              key={item.to}
              className="site-nav-mobile__link"
              to={withViewer(item.to, viewer)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
