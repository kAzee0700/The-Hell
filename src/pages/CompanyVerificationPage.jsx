import { usePageTitle } from '../hooks/usePageTitle';
import { ScaffoldPage } from '../components/ScaffoldPage';

export function CompanyVerificationPage() {
  usePageTitle('기업 인증 및 권한 확인');

  return (
    <ScaffoldPage
      eyebrow="Company Verify"
      title="기업 인증을 진행해 주세요"
      description="사업자 정보와 채용 권한을 확인하면 프로필 탐색과 제안 발송을 열 수 있습니다."
      sections={[
        {
          title: '확인 항목',
          items: ['사업자 정보', '소속 확인', '인사팀 또는 채용 권한 여부', '대표자 여부'],
        },
        {
          title: '후속 열림 영역',
          items: ['구직자 탐색', '구직자 프로필 상세', '구원 후보함', '구원 제안 보내기'],
        },
      ]}
      note="팀장급 권한자나 외부 채용대행사 허용 여부는 아직 정책 미확정입니다."
    />
  );
}
