import { usePageTitle } from '../hooks/usePageTitle';
import { ScaffoldPage } from '../components/ScaffoldPage';
import { ROUTE_PATHS } from '../utils/routes';

export function AboutPage() {
  usePageTitle('서비스 소개');

  return (
    <ScaffoldPage
      eyebrow="About"
      title="서비스 이용 방식"
      description="프로필 등록, 기업 탐색, 제안 확인 흐름을 한 번에 확인할 수 있습니다."
      actions={[
        { to: ROUTE_PATHS.home, label: '메인으로' },
        { to: ROUTE_PATHS.safety, label: '안전 기준 보기' },
      ]}
      sections={[
        {
          title: '서비스 목적',
          items: [
            '구직자가 먼저 자신을 올린다.',
            '기업은 사람을 먼저 탐색한다.',
            '구원 제안을 수락하면 직장 정보가 공개된다.',
          ],
        },
        {
          title: '구분점',
          items: [
            '공고 중심 구조로 되돌리지 않는다.',
            '희망 직무를 기준으로 열람 제한을 둔다.',
            '프라이버시와 인증을 핵심 구조로 둔다.',
          ],
        },
      ]}
    />
  );
}
