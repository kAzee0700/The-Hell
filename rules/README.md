# Rules

이 폴더는 `지옥` 프로젝트의 하네스 운영 기준 문서 묶음입니다.

분리 목적:

- 에이전트 역할 문서(`agents/`)와 작업 규칙 문서(`rules/`)를 구분합니다.
- Hell-Orchestrator가 분기 판단 기준을 문서에서 바로 확인할 수 있게 합니다.
- 각 에이전트가 역할 경계, 재에스컬레이션, 인계, 구조, 반응형 기준을 문서에서 바로 확인할 수 있게 합니다.

## 포함 파일

### 공통 강제 기준

- `common-rules.md` - 모든 에이전트가 공통으로守る判断原則
- `project-operation-rules.md` - 출력 형식, 작업 절차, 역할 분기 기준

### 재에스컬레이션 및 인계

- `auto-maintenance-rules.md` - 로그 기반 담당자 판단, 재에스컬레이션 기준
- `handoff-rules.md` - 인계 필수 필드, 체크리스트

### 구조 및 반응형

- `react-structure-rules.md` - 폴더 책임, 상태 관리, 추상화 기준
- `responsive-rules.md` - 반응형 원칙, 카드/텍스트 기준
- `breakpoint-tokens.md` - 브레이크포인트 기준값 관리

## 운영 원칙

- 역할 분기 문서와 공통 원칙 문서는 서로 다른 역할을 하므로 혼용하지 않습니다.
- 구조 문제는 Hell-Architect 또는 Hell-System Keeper 판단을 따릅니다.
- 문구 문제는 Hell-UX Writer 판단을 따릅니다.
- 데이터 문맥 문제는 Hell-Data Modeler 판단을 따릅니다.
- 시각 자산/시각 리듬/MVP 인상 문제는 Hell-Visual Designer 판단을 따릅니다.
- 보안/권한 문제는 Hell-Security 판단을 따릅니다.
- 백엔드/API 문제는 Hell-Backend 판단을 따릅니다.
- 변경 이력은 `docs/changes/`에서 별도로 관리합니다.
