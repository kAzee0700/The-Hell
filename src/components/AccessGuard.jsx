import { Link, Outlet, useLocation } from 'react-router-dom';
import { useViewerAccess } from '../hooks/useViewerAccess';
import {
  VIEWER_ACCESS,
  VIEWER_LABELS,
  isAllowedViewer,
  withViewer,
} from '../utils/access-levels';
import { ROUTE_PATHS } from '../utils/routes';

function getGuardGuidance({ allowed, viewer, pathname, title, description }) {
  const isCompanyProtected = allowed.includes(VIEWER_ACCESS.companyVerified);
  const isJobSeekerProtected = allowed.includes(VIEWER_ACCESS.jobSeeker);

  if (isCompanyProtected) {
    if (viewer === VIEWER_ACCESS.companyPending) {
      return {
        title: '기업 인증을 마치면 이어서 볼 수 있습니다',
        description:
          '현재는 기업 계정이지만 인증 전 상태입니다. 구직자 탐색과 상세 열람, 구원 후보함, 제안 발송은 인증 완료 후에만 열립니다.',
        primaryActions: [{ to: withViewer(ROUTE_PATHS.companyVerify, viewer), label: '기업 인증 계속하기' }],
      };
    }

    return {
      title,
      description,
      primaryActions: [
        { to: withViewer(ROUTE_PATHS.companyVerify, VIEWER_ACCESS.companyPending), label: '기업 인증 화면으로' },
        { to: withViewer(pathname, VIEWER_ACCESS.companyVerified), label: '인증 완료 상태로 확인' },
      ],
    };
  }

  if (isJobSeekerProtected) {
    return {
      title,
      description,
      primaryActions: [
        { to: withViewer(pathname, VIEWER_ACCESS.jobSeeker), label: '구직자 상태로 확인' },
        { to: ROUTE_PATHS.home, label: '메인으로 이동' },
      ],
    };
  }

  return { title, description, primaryActions: [] };
}

export function AccessGuard({ allowed, title, description }) {
  const location = useLocation();
  const viewer = useViewerAccess();

  if (isAllowedViewer(viewer, allowed)) {
    return <Outlet />;
  }

  const guidance = getGuardGuidance({
    allowed,
    viewer,
    pathname: location.pathname,
    title,
    description,
  });

  return (
    <section className="access-guard">
      <div className="container access-guard__inner surface-card stack-md">
        <p className="eyebrow">Access Guard</p>
        <h1>{guidance.title}</h1>
        <p>{guidance.description}</p>
        <p className="page-shell__note">
          현재 임시 뷰어 상태: <strong>{VIEWER_LABELS[viewer]}</strong>
        </p>
        {guidance.primaryActions.length > 0 ? (
          <div className="viewer-primary-actions">
            {guidance.primaryActions.map((action) => (
              <Link key={action.to} className="action-link" to={action.to}>
                {action.label}
              </Link>
            ))}
          </div>
        ) : null}
        <div className="viewer-guide surface-card stack-md">
          <h2>임시 검수용 상태 전환</h2>
          <p>실제 인증 연동 전까지는 아래 viewer 상태로 보호 라우트를 검수할 수 있습니다.</p>
        </div>
        <div className="viewer-preset-list">
          {Object.values(VIEWER_ACCESS).map((allowedViewer) => (
            <Link
              key={allowedViewer}
              className="action-link"
              to={withViewer(location.pathname, allowedViewer)}
            >
              {VIEWER_LABELS[allowedViewer]}로 보기
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
