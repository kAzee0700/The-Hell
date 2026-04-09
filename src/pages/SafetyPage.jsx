import { usePageTitle } from '../hooks/usePageTitle';
import { ScaffoldPage } from '../components/ScaffoldPage';

export function SafetyPage() {
  usePageTitle('운영 정책 및 안전 안내');

  return (
    <ScaffoldPage
      eyebrow="Safety"
      title="열람 기준과 공개 범위를 확인해 주세요"
      description="누가 프로필을 볼 수 있는지와 공개 범위가 어떻게 적용되는지 확인할 수 있습니다."
      sections={[
        {
          title: '열람 가능 주체',
          items: [
            '인증된 기업의 인사팀',
            '채용 담당자',
            '인사팀이 없는 중소기업의 대표자',
          ],
        },
        {
          title: '기본 공개 범위',
          items: [
            '희망 직무 관련 인증 기업만 공개',
            '희망 직무 기반 제한 노출 적용',
            '열람 이력과 차단 기능은 후속 안전 장치 후보',
          ],
        },
      ]}
      note="수락 전 기업 정보 공개 범위와 구원이 내려왔다는 알림의 실제 전달 채널은 아직 정책 확정 전입니다."
    />
  );
}
