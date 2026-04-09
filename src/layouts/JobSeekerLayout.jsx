import { Outlet } from 'react-router-dom';
import { AccessGuard } from '../components/AccessGuard';
import { VIEWER_ACCESS } from '../utils/access-levels';

export function JobSeekerLayout() {
  return (
    <AccessGuard
      allowed={[VIEWER_ACCESS.public, VIEWER_ACCESS.jobSeeker]}
      title="구직자 영역입니다"
      description="내 프로필 관리와 받은 제안 확인은 구직자 상태에서만 접근할 수 있도록 임시 가드가 연결되어 있습니다."
    >
      <Outlet />
    </AccessGuard>
  );
}
