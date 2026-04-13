# 지옥 (Hell) 프로젝트 - 인수인계 문서

## 프로젝트 개요

- **프로젝트명:** 지옥 (Hell)
- **컨셉:** 구직자 프로필 중심의 역방향 구인 플랫폼
- **역할 체계:** 관리자(admin), 개인/구직자(individual), 기업(company)
- **기업 인증:** pending → verified 상태 관리
- **설명:** 기업이 먼저 구직자를 탐색하고 "구원 제안"을 보내는 구조

---

## 현재 프로젝트 상태

### 프론트엔드 (React + Vite)
- **위치:** `The-Hell/`
- **포트:** 5173
- **상태:** 화면/라우트 대부분 완료, 일부 API 연결됨

### 백엔드 (Node.js + Express + Prisma)
- **위치:** `The-Hell/server/`
- **포트:** 3001
- **DB:** SQLite (`prisma/dev.db`)
- **상태:** auth, admin 일부, view-history 완료

---

## 완료된 작업 목록

### 1. 기본 구조
- [x] 메인 화면 + quickFilters 33개
- [x] SiteHeader (비로그인/기업/구직자/관리자별 네비)
- [x] SiteFooter
- [x] 로고/아이콘/파비콘 (H 기반 네온 오렌지)

### 2. 로그인/회원가입
- [x] 로그인 페이지 (개인/기업 탭 + 슬라이딩 애니메이션)
- [x] 회원가입 2단계 구조 (타입 선택 → 기본 정보 → 프로필/인증)
- [x] JWT 기반 인증
- [x] 백엔드 API (signup, login, me, logout)

### 3. 역할 체계
- [x] VIEWER_ACCESS: public, admin, jobSeeker, companyPending, companyVerified
- [x] useViewerAccess 훅 (role + verificationStatus 기반)
- [x] AdminLayout, JobSeekerLayout, CompanyLayout, CompanyGateLayout
- [x] AccessGuard 컴포넌트

### 4. 관리자 페이지
- [x] AdminLayout
- [x] AdminUsersPage (`/admin/users`)
- [x] AdminCompaniesPage (`/admin/companies`)
- [x] 기업 인증 승인/거절 API

### 5. 열람 이력
- [x] ViewHistoryPage (`/view-history`)
- [x] ViewHistory 모델 (Prisma)
- [x] GET /api/view-history API

### 6. 기업 인증
- [x] CompanyVerificationPage (`/company/verify`)
- [x] 인증 요청 API

### 7. 공개 범위 설정
- [x] VisibilityPage (`/visibility`)
- [x] 공개 범위 저장 API

### 8. 모바일 네비게이션
- [x] 하단 고정 네비 (상태별 메뉴 구성)
- [x] 데스크톱 상단 네비 유지

### 9. 레이아웃 수정
- [x] 기업 회원가입 폼 레이아웃 깨짐 수정
- [x] 로그인 탭 깜박임 제거

---

## 다음 작업 (우선순위순)

### 1. [바로 시작] 개인 프로필 2단계 저장
- **파일:** `SignupIndividualProfilePage.jsx`
- **API:** `PATCH /api/profile/setup`
- **저장 필드:** careerLevel, employmentType, workStyle, introduction, allowProposals
- **권한:** individual만

### 2. 기업 인증 2단계 저장
- **파일:** `SignupCompanySetupPage.jsx`
- **API:** 
  - `POST /api/company/upload-document`
  - `PATCH /api/company/setup`
- **저장 필드:** verificationDocument, hiringScopes
- **권한:** company만

### 3. 권한/가드 보강
- **서버 미들웨어 추가:**
  - `requireRole(roles)`
  - `requireCompanyVerified()`
- **적용:** /api/talents, /api/offers, /api/saved 등

### 4. 인재 검색/상세 API
- **API:**
  - `GET /api/talents` (필터: desiredJob, careerLevel, workStyle 등)
  - `GET /api/talents/:id` (상세 조회 + 열람 기록)
- **권한:** company + verified
- **비즈니스 로직:** profileVisibility 기반 필터링

### 5. 저장 기능
- **모델:** SavedTalent
- **API:**
  - `GET /api/saved`
  - `POST /api/saved`
  - `DELETE /api/saved/:talentId`
- **권한:** company + verified

### 6. 열람 이력 정합성 수정
- **문제:** 프론트 `/view-history` → 서버 `/my-history` 불일치
- **수정:** 서버 엔드포인트를 `/api/view-history`로 통일
- **추가:** 상세 조회 시 자동 기록

### 7. 제안 생성
- **모델:** Offer
- **API:**
  - `POST /api/offers`
  - `GET /api/offers/sent`
  - `GET /api/offers/received`
  - `GET /api/offers/:id`
- **권한:** company + verified (생성)

### 8. 제안 응답 (수락/거절)
- **API:**
  - `PATCH /api/offers/:id/accept`
  - `PATCH /api/offers/:id/reject`
- **권한:** individual + 당사자
- **추가:** 수락 시 열람 권한 자동 부여

---

## 파일 구조

```
The-Hell/
├── src/
│   ├── components/
│   │   ├── SiteHeader.jsx        # 네비게이션 (모바일 하단 포함)
│   │   ├── SiteFooter.jsx
│   │   ├── AccessGuard.jsx
│   │   └── ScaffoldPage.jsx
│   ├── hooks/
│   │   ├── useAuth.jsx           # 인증 상태 관리
│   │   ├── usePageTitle.js
│   │   └── useViewerAccess.js    # 역할별 접근 제어
│   ├── layouts/
│   │   ├── RootLayout.jsx
│   │   ├── PublicLayout.jsx
│   │   ├── JobSeekerLayout.jsx
│   │   ├── CompanyLayout.jsx
│   │   ├── CompanyGateLayout.jsx
│   │   └── AdminLayout.jsx       # 신규
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── SignupTypePage.jsx
│   │   ├── SignupIndividualPage.jsx
│   │   ├── SignupIndividualProfilePage.jsx  # 2단계 미완성
│   │   ├── SignupCompanyPage.jsx
│   │   ├── SignupCompanySetupPage.jsx       # 2단계 미완성
│   │   ├── CompanyVerificationPage.jsx
│   │   ├── ViewHistoryPage.jsx              # 신규
│   │   ├── VisibilityPage.jsx               # 신규
│   │   ├── AdminUsersPage.jsx              # 신규
│   │   ├── AdminCompaniesPage.jsx          # 신규
│   │   ├── TalentListPage.jsx              # 더미 데이터
│   │   ├── TalentDetailPage.jsx            # 더미 데이터
│   │   ├── SavedTalentsPage.jsx            # 스캐폴드
│   │   ├── OfferCreatePage.jsx             # 스캐폴드
│   │   ├── CompanyOffersPage.jsx           # 스캐폴드
│   │   ├── JobSeekerProposalsPage.jsx      # 스캐폴드
│   │   ├── JobSeekerProposalDetailPage.jsx # 스캐폴드
│   │   └── JobSeekerProfilePage.jsx
│   ├── services/
│   │   └── api.js              # API 클라이언트
│   ├── routes/
│   │   └── router.jsx          # 라우트 정의
│   ├── styles/
│   │   ├── globals.css
│   │   ├── tokens.css
│   │   ├── reset.css
│   │   └── utilities.css
│   └── utils/
│       ├── routes.js
│       └── access-levels.js
├── server/
│   ├── prisma/
│   │   ├── schema.prisma       # Prisma 스키마
│   │   ├── seed.js             # 테스트 데이터
│   │   └── dev.db              # SQLite DB
│   └── src/
│       ├── index.js             # 서버 엔트리
│       ├── routes/
│       │   ├── auth.js          # ✅ 완료
│       │   ├── admin.js         # ✅ 완료
│       │   ├── viewHistory.js   # ✅ 완료
│       │   ├── company.js       # ✅ 완료
│       │   └── profile.js       # ✅ 완료
│       └── middleware/
│           └── auth.js          # JWT 인증
└── package.json
```

---

## 테스트 계정

| 역할 | 이메일 | 비밀번호 | 비고 |
|------|--------|----------|------|
| 관리자 | `admin@hell.local` | `admin1234` | - |
| 개인 | `user@hell.local` | `user1234` | - |
| 기업 | `company@hell.local` | `company1234` | `verified` 상태 |

---

## 실행 방법 (신규 PC 세팅)

### 1. 의존성 설치

```bash
# 프론트엔드
cd The-Hell
npm install

# 백엔드
cd server
npm install
```

### 2. DB 초기화

```bash
cd server
npx prisma db push
npx prisma db seed
```

### 3. 서버 실행

```bash
cd server
npm run dev
# 실행: http://localhost:3001
```

### 4. 프론트 실행 (별도 터미널)

```bash
cd The-Hell
npm run dev
# 실행: http://localhost:5173
```

---

## 현재 API 엔드포인트

### 인증 (✅ 완료)
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/auth/signup/individual` | 개인 회원가입 |
| POST | `/api/auth/signup/company` | 기업 회원가입 |
| POST | `/api/auth/login` | 로그인 |
| GET | `/api/auth/me` | 현재 사용자 조회 |
| POST | `/api/auth/logout` | 로그아웃 |

### 관리자 (✅ 완료)
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/admin/users` | 회원 목록 |
| GET | `/api/admin/companies` | 기업 목록 |
| PATCH | `/api/admin/companies/:id/verify` | 기업 인증 상태 변경 |

### 프로필 (✅ 완료)
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/profile/me` | 프로필 조회 |
| PATCH | `/api/profile/visibility` | 공개 범위 설정 |
| PATCH | `/api/profile/setup` | ⚠️ 미구현 - 2단계 정보 저장 |

### 기업 (✅ 완료)
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/company/request-verification` | 인증 요청 |
| POST | `/api/company/upload-document` | ⚠️ 미구현 - 문서 업로드 |
| PATCH | `/api/company/setup` | ⚠️ 미구현 - 2단계 정보 저장 |

### 열람 이력 (✅ 완료 - 정합성 수정 필요)
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/view-history` | 열람 이력 조회 |

### 인재 (⚠️ 미구현)
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/talents` | 인재 목록 |
| GET | `/api/talents/:id` | 인재 상세 |

### 저장 (⚠️ 미구현)
| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/saved` | 저장 목록 |
| POST | `/api/saved` | 저장 |
| DELETE | `/api/saved/:id` | 저장 해제 |

### 제안 (⚠️ 미구현)
| Method | Endpoint | 설명 |
|--------|----------|------|
| POST | `/api/offers` | 제안 생성 |
| GET | `/api/offers/sent` | 보낸 제안 |
| GET | `/api/offers/received` | 받은 제안 |
| PATCH | `/api/offers/:id/accept` | 수락 |
| PATCH | `/api/offers/:id/reject` | 거절 |

---

## Prisma 모델 현황

### 현재 존재하는 모델
```prisma
model User {
  id, email, password, role, name
  # 개인 필드
  phone, postcode, address, detailAddress
  # 프로필
  desiredJob, careerLevel, employmentType, workStyle, introduction
  profileVisibility, allowProposals
  # 기업 필드
  companyName, businessNumber, department, position
  verificationStatus, verificationDocument, hiringScopes, verificationStep
  # 약관
  termsAgree, policyAgree, marketingAgree
  # 관계
  viewedProfiles, profileViewedBy
  createdAt, updatedAt
}

model ViewHistory {
  id, viewerId, viewedId, reason, createdAt
}
```

### 추가로 필요한 모델
```prisma
model VerificationDocument {
  id, userId, filePath, fileName, uploadedAt
}

model SavedTalent {
  id, companyId, talentId, createdAt
  @@unique([companyId, talentId])
}

model Offer {
  id, companyId, talentId, message, status, createdAt, updatedAt
}
```

---

## 현재 미완성 페이지

| 페이지 | 파일 | 상태 |
|--------|------|------|
| 개인 프로필 2단계 | `SignupIndividualProfilePage.jsx` | 콘솔 로그만 |
| 기업 인증 2단계 | `SignupCompanySetupPage.jsx` | 콘솔 로그만 |
| 인재 목록 | `TalentListPage.jsx` | 더미 데이터 |
| 인재 상세 | `TalentDetailPage.jsx` | 더미 데이터 |
| 저장 목록 | `SavedTalentsPage.jsx` | 스캐폴드 |
| 제안 작성 | `OfferCreatePage.jsx` | 스캐폴드 |
| 보낸 제안 | `CompanyOffersPage.jsx` | 스캐폴드 |
| 받은 제안 | `JobSeekerProposalsPage.jsx` | 스캐폴드 |
| 제안 상세 | `JobSeekerProposalDetailPage.jsx` | 스캐폴드 |

---

## 참고 사항

1. **열람 이력 API 불일치:** 프론트는 `/view-history` 호출 → 서버는 `/my-history` 요구
   - 수정 필요: `server/src/routes/viewHistory.js`의 라우트를 `/my-history`에서 `/`로 변경

2. **的企业 인증 상태:** pending → verified → rejected (관리자가 변경)

3. **모바일 네비:** 하단 고정 네비, 상태별 메뉴 구성됨

4. **로그인/회원가입:** JWT 토큰 기반, localStorage 저장

5. **CORS:** 백엔드는 `http://localhost:5173`만 허용
