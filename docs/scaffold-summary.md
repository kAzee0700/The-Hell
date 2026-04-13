# Scaffold Summary

## 목적

`지옥` 프로젝트의 초기 작업 기반을 요약합니다.

## 현재 포함된 범위

- Vite 기반 React 실행 환경
- React Router 기반 최소 라우팅
- 공통 `RootLayout`
- `pages / components / layouts / styles / assets / hooks / utils` 분리
- 반응형 스타일 토큰 및 글로벌 스타일 초안
- 프로젝트 공통 규칙 문서
- 에이전트 역할 및 인계 문서
- 루트 기준 `agents/`, `docs/` 작업 문서 폴더
- 변경 이력 관리 폴더 `docs/changes/`

## 현재 의도적으로 제외한 범위

- 실제 서비스 페이지 완성
- 복잡한 상태관리
- API 연동
- 디자인 시스템의 세부 컴포넌트 세트

## 후속 작업 권장 순서

1. Hell-Orchestrator: 요청 해석 및 담당자 선택
2. Hell-Planner: 실제 목표, 흐름, 우선순위 정리
3. Hell-Architect: IA와 라우트 맵 확정
4. Hell-Security: 인증, 권한, 열람 제한 정책 정리
5. Hell-Backend: API, 데이터 모델, 상태 전이 설계
6. Hell-Builder: 확정된 구조를 기준으로 페이지 구현
7. Hell-UX Writer / Hell-Data Modeler: 운영형 문구와 데이터 조정
8. Hell-Responsive Auditor / Hell-QA: 반응형/접근성/UX 검수

## 이후 구조/정책/구현 변경 이력

이후 발생하는 구조 변경, 정책 변경, 구현 변경 이력은 `docs/changes/`에서 관리합니다.

이 문서는 초기 스캐폴드 기반 요약 성격을 유지하며, 변경 이력을 대신하지 않습니다.
