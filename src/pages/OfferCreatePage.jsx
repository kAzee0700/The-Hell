import { usePageTitle } from '../hooks/usePageTitle';
import { ScaffoldPage } from '../components/ScaffoldPage';
import { ROUTE_PATHS } from '../utils/routes';

export function OfferCreatePage() {
  usePageTitle('구원 제안 보내기');

  return (
    <ScaffoldPage
      eyebrow="Send Offer"
      title="제안 내용을 입력해 주세요"
      description="대상 프로필을 확인한 뒤 제안 메시지를 작성하고 보낼 수 있습니다."
      actions={[{ to: ROUTE_PATHS.offers, label: '보낸 제안 보기' }]}
      sections={[
        {
          title: '제안 작성 영역',
          items: ['대상 정보 요약', '구원 제안 메시지 입력', '구원 제안 보내기 버튼'],
        },
        {
          title: '구조상 분리 이유',
          items: [
            '상세 열람 화면과 제안 작성 책임을 분리한다.',
            '알림 채널이 미확정이어도 제안 생성 흐름은 구현 가능하다.',
          ],
        },
      ]}
    />
  );
}
