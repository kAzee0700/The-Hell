# The Hell

구직자가 먼저 자신을 등록하고, 기업이 인증 후 인재를 탐색하고 제안하는 구조를 목표로 하는 채용 플랫폼 프로젝트입니다.

현재 이 저장소는 다음 두 축으로 구성되어 있습니다.

- React + Vite 기반 프론트엔드
- Express + Prisma + SQLite 기반 개발용 백엔드

## Project Status

현재 구현 상태는 다음과 같습니다.

- 메인 페이지, 공개 안내 페이지, 가입/로그인 흐름이 존재합니다.
- 개인 회원가입, 기업 회원가입, 관리자 화면, 열람 이력 화면이 추가되어 있습니다.
- 백엔드는 인증, 관리자 조회/승인, 열람 이력 조회용 API까지 동작합니다.
- 인재 검색, 저장, 제안 생성/응답, 기업 인증 완성 흐름은 아직 진행 중입니다.

즉, 이 프로젝트는 완성 배포본보다는 구조와 흐름을 빠르게 검증하는 작업 브랜치에 가깝습니다.

## Tech Stack

### Frontend

- React 18
- React Router DOM 6
- Vite
- CSS modules 없이 글로벌 CSS / tokens / reset / utilities 분리

### Backend

- Node.js
- Express
- Prisma
- SQLite
- bcryptjs
- jsonwebtoken

## Directory Structure

```text
The-Hell/
├─ src/
│  ├─ assets/
│  ├─ components/
│  ├─ data/
│  ├─ hooks/
│  ├─ layouts/
│  ├─ pages/
│  ├─ routes/
│  ├─ services/
│  ├─ styles/
│  └─ utils/
├─ server/
│  ├─ prisma/
│  └─ src/
├─ docs/
├─ rules/
├─ agents/
├─ package.json
└─ README.md
```

## Main Routes

현재 프론트 라우트 기준 주요 경로는 아래와 같습니다.

- `/` 메인 페이지
- `/login` 로그인
- `/signup` 가입 유형 선택
- `/signup/individual` 개인 회원가입
- `/signup/individual/profile` 개인 프로필 2단계
- `/signup/company` 기업 회원가입
- `/signup/company/setup` 기업 인증 2단계
- `/about` 서비스 소개
- `/safety` 운영 정책 / 안전 안내
- `/profile` 구직자 프로필
- `/visibility` 공개 범위 설정
- `/proposals` 받은 제안 목록
- `/proposals/:proposalId` 제안 상세
- `/view-history` 열람 이력
- `/company/verify` 기업 인증 안내
- `/talents` 인재 탐색
- `/talents/:talentId` 인재 상세
- `/saved` 저장한 인재
- `/offers` 기업이 보낸 제안
- `/offers/new/:talentId` 특정 인재에게 제안 작성
- `/admin/users` 관리자 사용자 목록
- `/admin/companies` 관리자 기업 승인 관리

## Backend API

현재 백엔드에서 구현되어 있는 주요 API 범위는 아래와 같습니다.

### Auth

- `POST /api/auth/signup/individual`
- `POST /api/auth/signup/company`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/auth/logout`

### Admin

- `GET /api/admin/users`
- `GET /api/admin/companies`
- `PATCH /api/admin/companies/:userId/verify`

### View History

- `GET /api/view-history/my-history`

### Health Check

- `GET /api/health`

## Database

현재 Prisma 스키마에는 아래 모델이 포함되어 있습니다.

- `User`
- `ViewHistory`

아직 `Offer`, `SavedTalent`, `CompanyVerificationRequest` 같은 도메인 모델은 별도 분리되지 않았고, 이후 백엔드 작업에서 확장될 예정입니다.

## Getting Started

### 1. Frontend

```bash
npm install
npm run dev
```

기본 개발 서버:

- `http://localhost:5173`

### 2. Backend

```bash
cd server
npm install
npm run db:push
npm run db:seed
npm run dev
```

기본 API 서버:

- `http://localhost:3001`

헬스 체크:

```bash
http://localhost:3001/api/health
```

## Seed Accounts

개발용 시드 계정은 아래와 같습니다.

- Admin: `admin@hell.local` / `admin1234`
- Individual: `user@hell.local` / `user1234`
- Company: `company@hell.local` / `company1234`

## Notes

- 현재 작업 브랜치에서는 README 외에도 프론트 구조 개편, 관리자 페이지, 인증 흐름, 백엔드 서버 추가 작업이 함께 진행되었습니다.
- 일부 화면은 아직 스캐폴드 상태이며 실제 API 연결이 완료되지 않았습니다.
- 열람 이력, 프로필 공개 범위, 기업 인증 흐름은 계속 정리 중입니다.
- 한글이 깨져 보이던 기존 README는 이번 업데이트에서 현재 상태 기준으로 다시 정리했습니다.

## Next Backend Tasks

다음 백엔드 우선 작업은 아래가 핵심입니다.

- 개인 프로필 2단계 저장 API
- 기업 인증 2단계 저장 및 승인 요청 API
- 인재 목록 / 상세 조회 API
- 저장한 인재 API
- 제안 생성 / 목록 / 상세 / 응답 API
- 권한 분기 강화

## Author

Yeom Seungho  
Planning / UX Structure / Frontend Collaboration
