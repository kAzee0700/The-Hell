import { usePageTitle } from '../hooks/usePageTitle';
import { ScaffoldPage } from '../components/ScaffoldPage';

export function JobSeekerProposalDetailPage() {
  usePageTitle('구원 제안 상세');

  return (
    <ScaffoldPage
      eyebrow="Proposal Detail"
      title="구원 제안 상세"
      description="제안 내용을 확인하고 바로 수락 여부를 정할 수 있습니다."
      sections={[
        {
          title: '수락 전 상태',
          items: [
            '구원 제안 요약',
            '제안한 기업의 제한 공개 정보',
            '수락 또는 거절 버튼',
          ],
        },
        {
          title: '수락 후 상태',
          items: [
            '확장된 기업 정보',
            '연결 이후 확인할 다음 단계 안내',
            '상태 배지와 구원 수락 완료 메시지',
          ],
        },
      ]}
      note="수락 전 기업 정보 공개 범위는 아직 기획 미확정이므로 텍스트와 항목은 더 구체화하지 않았습니다."
    />
  );
}
