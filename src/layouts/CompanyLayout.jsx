import { Outlet } from 'react-router-dom';
import { AccessGuard } from '../components/AccessGuard';
import { VIEWER_ACCESS } from '../utils/access-levels';

export function CompanyLayout() {
  return (
    <AccessGuard
      allowed={[VIEWER_ACCESS.public, VIEWER_ACCESS.companyVerified]}
      title="인증 완료된 기업만 접근할 수 있습니다"
      description="탐색, 상세 열람, 구원 후보함, 제안 발송은 인증된 기업 전용 흐름으로 분리되어 있습니다."
    >
      <Outlet />
    </AccessGuard>
  );
}
