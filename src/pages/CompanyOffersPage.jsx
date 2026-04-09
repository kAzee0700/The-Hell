import { usePageTitle } from '../hooks/usePageTitle';
import { ScaffoldPage } from '../components/ScaffoldPage';

export function CompanyOffersPage() {
  usePageTitle('보낸 구원 제안');

  return (
    <ScaffoldPage
      eyebrow="Sent Offers"
      title="보낸 구원 제안"
      description="보낸 제안의 진행 상태와 다시 확인할 대상을 볼 수 있습니다."
      sections={[
        {
          title: '초기 범위',
          items: ['보낸 구원 제안 목록', '상태 배지', '대상 프로필 재진입'],
        },
      ]}
    />
  );
}
