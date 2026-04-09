import { usePageTitle } from '../hooks/usePageTitle';
import { ScaffoldPage } from '../components/ScaffoldPage';
import { buildPath, ROUTE_PATHS } from '../utils/routes';

export function JobSeekerProposalsPage() {
  usePageTitle('받은 구원 제안');

  return (
    <ScaffoldPage
      eyebrow="Proposals"
      title="받은 제안을 확인해 주세요"
      description="도착한 제안의 내용을 보고 수락하거나 넘길 수 있습니다."
      actions={[
        { to: buildPath.proposalDetail('sample-proposal'), label: '구원 제안 보기' },
        { to: ROUTE_PATHS.profile, label: '내 프로필 보기' },
      ]}
      sections={[
        {
          title: '화면 책임',
          items: [
            '받은 구원 제안 목록 확인',
            '구원 제안 상세로 이동',
            '수락 또는 거절 액션 진입',
          ],
        },
      ]}
      note="임시 접근을 확인하려면 `?viewer=jobseeker` 쿼리를 사용합니다."
    />
  );
}
