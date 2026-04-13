import { Outlet } from 'react-router-dom';
import { AccessGuard } from '../components/AccessGuard';
import { VIEWER_ACCESS } from '../utils/access-levels';

export function AdminLayout() {
  return (
    <AccessGuard
      allowed={[VIEWER_ACCESS.admin]}
      title="관리자 영역입니다"
      description="회원 관리와 기업 인증은 관리자만 접근할 수 있습니다."
    >
      <Outlet />
    </AccessGuard>
  );
}
