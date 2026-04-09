import { usePageTitle } from '../hooks/usePageTitle';
import { ScaffoldPage } from '../components/ScaffoldPage';
import { buildPath } from '../utils/routes';

export function SavedTalentsPage() {
  usePageTitle('구원 후보함');

  return (
    <ScaffoldPage
      eyebrow="Saved Talents"
      title="구원 후보함"
      description="저장한 프로필을 다시 보고 제안 보낼 대상을 정리할 수 있습니다."
      actions={[{ to: buildPath.talentDetail('sample-talent'), label: '프로필 다시 보기' }]}
      sections={[
        {
          title: '후속 액션',
          items: ['저장한 후보 목록 확인', '프로필 다시 보기', '구원 제안 보내기로 이동'],
        },
      ]}
    />
  );
}
