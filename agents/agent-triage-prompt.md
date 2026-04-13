# Agent Triage Prompt

## 목적

- 메인 담당자가 현재 로그를 보고 어떤 에이전트를 먼저 호출해야 하는지 빠르게 판단할 수 있게 합니다.

## 사용 프롬프트

아래 문서를 먼저 읽고 현재 가장 우선순위가 높은 작업부터 처리해줘.
- `issue-board.md`
- `error-log.md`
- `unknowns-log.md`
- `handoff-template.md`
- `auto-maintenance-rules.md`

## 판단 규칙

1. `error`의 high 우선순위가 있으면 Hell-Builder 또는 Hell-QA를 먼저 호출한다.
2. 구조 충돌 또는 레이아웃 책임 문제면 Hell-Architect를 먼저 호출한다.
3. 범위 미확정 또는 기능 우선순위 문제면 Hell-Planner를 먼저 호출한다.
4. 카피, 무드, 표현 충돌이면 Hell-UX Writer를 먼저 호출한다.
5. 데이터 문맥, 상태값, 더미 데이터 표현 문제이면 Hell-Data Modeler를 먼저 호출한다.
6. 시각 자산, 로고, 아이콘, 배지, 시각 리듬, MVP 인상 완화 문제이면 Hell-Visual Designer를 먼저 호출한다.
7. 폴더 책임, 토큰 관리, 구조 중복 문제이면 Hell-System Keeper를 먼저 호출한다.
8. 반응형 품질, 오버플로우, 한 줄 유지 문제이면 Hell-Responsive Auditor를 먼저 호출한다.
9. 각 단계가 끝나면 보드와 로그를 갱신하고 다음 담당자를 지정한다.

## 역할 분기 요약

| 문제 유형 | 담당자 |
|-----------|--------|
| 문구/라벨/운영형 인터페이스 언어 | Hell-UX Writer |
| 데이터 문맥/더미 데이터/상태값 | Hell-Data Modeler |
| 시각 자산/로고/아이콘/배지/시각 리듬/MVP 인상 완화 | Hell-Visual Designer |
| 정보 구조/라우팅/레이아웃 | Hell-Architect |
| 폴더 책임/토큰 관리/구조 중복 | Hell-System Keeper |
| 반응형 품질/오버플로우/한 줄 유지 | Hell-Responsive Auditor |

## 출력 형식

1. 현재 가장 시급한 이슈
2. 먼저 호출할 담당자
3. 그 이유
4. 작업 후 갱신해야 할 문서
