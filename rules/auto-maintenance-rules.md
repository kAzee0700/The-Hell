# Auto Maintenance Rules

## 목적

- Hell-Orchestrator가 `issue-board.md`, `error-log.md`, `unknowns-log.md`, handoff 문서를 확인하고 다음 담당자를 자동으로 판단할 수 있도록 기준을 고정합니다.

## 공통 흐름

1. 작업 시작 전 `issue-board.md`를 확인합니다.
2. `error`가 `open` 또는 `in-progress`이면 Hell-Builder 또는 Hell-QA가 우선 봅니다.
3. `unknown`이 `high` 우선순위면 Hell-Planner 또는 Hell-Architect가 먼저 정리합니다.
4. 구조 변경이 필요하면 Hell-Architect로 되돌립니다.
5. 문구/라벨 문제는 Hell-UX Writer를 호출합니다.
6. 데이터 문맥/상태값 문제가 있으면 Hell-Data Modeler를 호출합니다.
7. 시각 자산/시각 리듬/MVP 인상 문제가 있으면 Hell-Visual Designer를 호출합니다.
8. 수정이 끝나면 `issue-board.md`, `error-log.md`, `unknowns-log.md`, `handoff-template.md`를 함께 갱신합니다. 필요시 `docs/changes/`에 변경 기록을 남깁니다.

## 재에스컬레이션 기준

### Hell-UX Writer 재호출 조건

텍스트 길이, 문구 과밀, 상태 언어 부족 문제가 2회 이상 반복되면 Hell-UX Writer를 다시 호출해 문구 축약과 라벨 재정의를 먼저 수행합니다.

### Hell-Data Modeler 재호출 조건

더미 데이터가 샘플/예시/가이드처럼 보이는 문제가 2회 이상 반복되면 Hell-Data Modeler를 다시 호출해 데이터 문맥 재구성을 먼저 수행합니다.

### Hell-Visual Designer 재호출 조건

같은 화면이 2회 이상 `MVP 같다`, `시안 같다`, `카드 반복이 심하다`, `시각 위계가 약하다` 판정을 받으면 Hell-Visual Designer를 다시 호출해 시각 개선안을 먼저 수행합니다.

시각 문제는 구조 문제와 혼동하지 않습니다. 레이아웃 구조 변경이 필요한 경우 Hell-Architect를, 데이터 문맥 문제가 있는 경우 Hell-Data Modeler를 먼저 호출합니다.

### Hell-Architect 재호출 조건

화면 위계, 레이아웃 구조, 페이지 책임 경계 문제가 2회 이상 반복되면 Hell-Architect를 다시 호출해 구조 재판단을 먼저 수행합니다.

### Hell-System Keeper 재호출 조건

폴더 책임, 토큰 관리, 구조 중복 문제가 반복되면 Hell-System Keeper를 호출해 구조 규칙 위반 여부를 먼저 점검합니다.

### Hell-Security 재호출 조건

인증, 권한, 열람 제한, 마스킹 관련 정책 문제가 나오면 Hell-Security를 호출해 정책 판단을 먼저 받습니다.

### Hell-Backend 재호출 조건

API, 데이터 모델, 상태 전이, 세션 관련 문제가 나오면 Hell-Backend를 호출해 서버 구조 판단을 먼저 받습니다.

### Hell-Responsive Auditor 재호출 조건

반응형 품질, 오버플로우, 카드 위계 문제가 반복되면 Hell-Responsive Auditor를 호출해 반응형 검수를 먼저 수행합니다.

### Hell-QA 재호출 조건

QA가 같은 문제를 2회 이상 반복 기록했는데 해결되지 않으면 `issue-board.md`에 반복 실패 이슈로 별도 등록합니다.

## 반복 실패 처리

1. 반복 실패 이슈가 등록되면 다음 담당자를 다시 지정합니다.
2. handoff에 `동일 문제 반복으로 인한 재에스컬레이션`을 반드시 명시합니다.
3. 통과하지 못한 실패 컷 항목 번호를 함께 기록합니다.
4. 반복 실패 상태에서는 `조금 더 다듬기` 같은 표현으로 넘기지 않습니다.

## 담당자별 기본 반응

### Hell-Planner

- `unknown` 유형 중 기획 또는 범위 문제를 우선 확인합니다.
- 기능 추가 요청이 현재 목표를 벗어나면 보류 여부를 기록합니다.

### Hell-Architect

- 구조 변경 요청, 레이아웃 충돌, 책임 경계 문제를 확인합니다.
- Builder가 독단적으로 바꾸면 구조 판단을 다시 고정합니다.

### Hell-Builder

- `error` 유형 중 실제 수정 가능한 항목을 우선 처리합니다.
- 수정 전후 파일과 이유를 인계 문서에 남깁니다.
- 같은 품질 문제가 2회 이상 반복되면 단독 수정으로 계속 밀지 않고 역할 분기 조건을 먼저 확인합니다.

### Hell-UX Writer

- 문구 충돌, 톤 불일치, 상태 언어 혼선을 정리합니다.
- 구조를 바꾸지 않고 해결 가능한지 먼저 판단합니다.
- 문구 문제가 구조 문제인지 확인하고, 구조 문제이면 Hell-Architect로 넘깁니다.

### Hell-Data Modeler

- 데이터 문맥, 상태값, 더미 데이터 표현 문제를 정리합니다.
- 실제 운영 객체처럼 보이도록 데이터 구성을 재검토합니다.
- 시각 표현 문제가 아닌지 확인하고, 시각 자산 문제이면 Hell-Visual Designer로 넘깁니다.

### Hell-Visual Designer

- 로고, 아이콘, 배지, 태그, 상태칩, 그래픽 모티프, 시각 리듬 문제를 정리합니다.
- 카드 반복/시안 인상/MVP 느낌을 시각적으로 완화할 개선안을 제시합니다.
- 구조를 바꾸지 않고 해결 가능한지 먼저 판단합니다.
- 구조 문제이면 Hell-Architect로, 문구 문제이면 Hell-UX Writer로 넘깁니다.

### Hell-System Keeper

- 폴더 책임, 토큰 관리, 구조 중복, 과도한 추상화를 점검합니다.
- 구조 문제와 단순 구현 차이를 구분합니다.

### Hell-Responsive Auditor

- 반응형 품질, 오버플로우, 카드 위계, 브레이크포인트 사용 여부를 검수합니다.
- 실패 컷 판정을 먼저 수행합니다.

### Hell-QA

- `resolved` 처리 전 재현 여부를 다시 확인합니다.
- 새 오류를 찾으면 `error-log.md`와 `issue-board.md`에 등록합니다.
- 같은 문제를 2회 이상 반복 기록했는데 해결되지 않으면 반복 실패 이슈로 등록하고 실패 컷 항목 번호를 함께 남깁니다.

### Hell-Security

- 인증, 권한, 열람 제한, 마스킹, 열람 이력, 차단 정책 문제를 정리합니다.
- 보안 정책과 편의성 판단이 충돌하면 보안 정책을 우선합니다.

### Hell-Backend

- API, 데이터 모델, 상태 전이, 세션, 알림 구조 문제를 정리합니다.
- 프론트 편의로 응답 구조를 임의 변경하지 않습니다.

## 완료 기준

- 열린 오류와 미확정 항목이 보드에서 추적 가능한가
- 어떤 담당자가 먼저 봐야 하는지 문서만 보고 판단 가능한가
- 수정 후 로그와 인계 문서가 함께 갱신되는가
- 반복 실패 이슈가 재에스컬레이션 규칙에 따라 분기되었는가
