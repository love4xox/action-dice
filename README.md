# 🎲 Action Dice: 생각 과잉 탈출을 위한 15분 초소형 실행 다이스 스튜디오
## (Full-Stack 5-Page Micro-Productivity Studio & Project Report)

> "시작이 어려운 이유는 작업이 너무 거대하기 때문입니다."  
> 착수 마비(Task Paralysis)와 선택 피로를 타파하기 위해 3D 스타일 다이스 엔진, 15분 타임박싱 타이머, 커스텀 액션 풀, 레벨업 통계, 실행 방법론을 5개의 독립된 페이지로 분리 구축하고 브라우저 영구 상태 보존(LocalStorage)과 Vercel CI/CD를 결합한 프로덕션 웹 애플리케이션입니다.

<p align="left">
  <img src="https://img.shields.io/badge/Next.js-14.2-000000?style=flat-square&logo=next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/Canvas_Confetti-1.9-f59e0b?style=flat-square"/>
  <img src="https://img.shields.io/badge/Vercel-Production-000000?style=flat-square&logo=vercel&logoColor=white"/>
</p>

---

## 📌 1. 프로젝트 개요 및 서비스 소개

* **프로젝트명**: Action Dice (15분 초소형 실행 다이스 스튜디오)
* **개발 기간**: 2026.09.28
* **개발자 / 작성자**: 정형경 (`love4xox`)
* **저장소**: [https://github.com/love4xox/action-dice](https://github.com/love4xox/action-dice)
* **배포 URL**: [https://action-dice.vercel.app](https://action-dice.vercel.app) *(또는 실제 발급된 Vercel URL)*
* **서비스 소개 (무엇을 해결하는가?)**:
  * **문제 정의**: 계획만 세우다 하루를 소진하는 생각 과잉(Overthinking), 무얼 먼저 할지 고민하며 에너지를 고갈시키는 선택 피로(Decision Fatigue), 과중한 압박감으로 첫 착수를 미루는 실행 마비(Task Paralysis)를 겪는 현대인을 위한 솔루션입니다.
  * **해결 방안**:
    1. **무작위 다이스 추첨(Dice Rolling Engine)**: 선택의 고통을 배제하고 즉시 몸을 움직이게 만드는 직관적 무작위 액션 추첨.
    2. **15분 타임박싱(Micro-Sprint Timer)**: 뇌의 마찰 저항을 0으로 만드는 초소형 15분 단위 스프린트와 축하 인터랙션.
    3. **5대 독립 멀티페이지 아키텍처**: 홈, 액션 풀 관리, 실행 통계, 15분 행동 방법론, 데이터 백업 환경 설정을 체계적인 라우트로 격리 설계.
    4. **무중단 로컬 영구화**: 백엔드 서버 없이 브라우저 `LocalStorage`를 활용해 커스텀 액션 및 누적 완료 기록을 안전하게 저장/내보내기 지원.

---

## 🏗️ 2. 시스템 아키텍처 및 라우팅 구조

### 2.1 라우팅 및 데이터 흐름 다이어그램
```text
  [ Global Layout & Navigation ]
  ┌─────────────────────────────────────────────────────────────────┐
  │  Next.js 14 App Router RootLayout (app/layout.tsx)              │
  │  - Sticky Glassmorphism Header & Global Navigation              │
  │  - Modern Soft-Light Palette (bg-slate-100 & slate-800 text)     │
  │  - Edge Runtime 다이내믹 파비콘 (icon.tsx - 🎲 ImageResponse)    │
  └───────────────────────────────┬─────────────────────────────────┘
                                  │
  [ 5-Page Specialized Routes ]   │
  ┌───────────────────────────────▼─────────────────────────────────┐
  │  1. / (Home)          : 3D 다이스 애니메이션 + 15분 카운트다운 타이머   │
  │  2. /pool (Action Pool): 카테고리별 초소형 행동 CRUD & 프리셋 로더     │
  │  3. /stats (Analytics): 누적 스프린트 세션, 집중 시간, 레벨업 게이지  │
  │  4. /guide (Methodology): 착수 마비 해소 뇌과학 & 15분 실행 방법론    │
  │  5. /settings (Config): JSON 데이터 백업(Export) 및 영구 초기화     │
  └───────────────────────────────┬─────────────────────────────────┘
                                  │
  [ Client Storage & Deploy ]     │
  ┌───────────────────────────────▼─────────────────────────────────┐
  │  - Browser LocalStorage (ad_actions, ad_completed_count)        │
  │  - Vercel Edge Network (Global CDN, Zero-Config CI/CD)          │
  └─────────────────────────────────────────────────────────────────┘
```

### 2.2 계층별 상세 기술 스택
| 계층 (Layer) | 사용 기술 | 적용 목적 및 주요 역할 |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) | 폴더 기반 라우팅을 통한 5개 독립 페이지 분리, `icon.tsx` 엣지 런타임 다이내믹 파비콘 서빙 |
| **Language** | TypeScript 5 | 엄격한 인터페이스 정의 (`ActionItem`: `id`, `category`, `text`), 런타임 타입 안정성 보장 |
| **Styling** | Tailwind CSS | 눈의 피로를 최소화하는 모던 소프트 라이트(`slate-100` 바탕 / 화이트 카드 / 인디고 악센트) UI |
| **Visual Effects** | canvas-confetti | 15분 스프린트 완료 및 주사위 추첨 시 도파민 보상을 위한 캔버스 파티클 효과 |
| **Icons** | Lucide React | 각 도메인과 상태를 직관적으로 전달하는 경량 SVG 아이콘 체계 (`Dices`, `Flame`, `Trophy` 등) |
| **State & Persistence** | React Hooks + LocalStorage | 타이머 인터벌 상태 머신 제어 및 브라우저 로컬 저장소를 통한 영구 데이터 유지 |
| **Hosting & CI/CD** | Vercel, GitHub Actions | GitHub 저장소 푸시 시 자동 빌드, 정적 최적화 및 엣지 네트워크 무중단 배포 |

---

## 🧩 3. 5대 핵심 페이지 및 기능 명세

### 01. 메인 다이스 롤러 & 15분 스프린트 (`/`)
* **3D 다이스 룰렛 애니메이션**:
  * 12단계 속도 감속 인터벌 알고리즘을 적용하여 주사위가 회전하다 멈추는 물리적 당첨 효과 구현.
  * 회전 완료 시 `canvas-confetti` 미니 폭죽을 트리거하여 착수 동기 부여.
* **15분 타임박싱 카운트다운 타이머**:
  * 900초(15분) 정밀 카운트다운 및 시작/일시정지/리셋 상태 머신.
  * 0초 도달 시 대형 컨페티 파티클 폭죽 발사와 함께 당일 완수 카운터 자동 갱신.

### 02. 나만의 초소형 액션 풀 관리 (`/pool`)
* **카테고리별 구조화**: `개발/작업`, `정리/환경`, `마인드/건강` 3개 카테고리 태그 분류.
* **실시간 동적 CRUD**: 15분 안에 즉시 끝낼 수 있는 초소형 행동 실시간 추가 및 삭제.
* **스마트 프리셋 복원**: 사용자가 목록을 초기화하더라도 즉시 검증된 6가지 스타터 행동을 복원하는 기능 제공.

### 03. 누적 실행 통계 대시보드 (`/stats`)
* **3대 핵심 메트릭 지표 카드**:
  * 완수한 15분 세션 수, 누적 몰입 시간(분 단위 자동 연산), 4회 완수당 1단계씩 상승하는 실행 레벨(Level).
* **동적 레벨업 프로그레스 바**:
  * 완수 횟수에 따라 실시간으로 채워지는 시각 게이지와 다음 레벨까지 남은 세션 수 안내.

### 04. 15분 초소형 실행 방법론 가이드 (`/guide`)
* **1. 작업 착수 마비(Task Paralysis)**: 뇌가 거대한 목표를 위협으로 인식할 때의 생리학적 기전 설명.
* **2. 15분 타임박싱의 마법**: '작업흥분(Work Excitement)' 현상을 이용해 시작 마찰을 0으로 만드는 원리.
* **3. 다이스(Dice)의 심리학**: 인지 에너지 소모의 주원인인 선택의 피로(Decision Fatigue)를 원천 차단하는 과학적 근거 제공.

### 05. 환경 설정 & 데이터 관리 (`/settings`)
* **데이터 백업 내보내기(Export)**: 로컬스토리지의 액션 풀과 완수 통계를 JSON 파일로 변환하여 로컬 디바이스에 즉시 다운로드.
* **데이터 완전 초기화**: 오동작 방지 확인 다이얼로그(Confirm)를 거친 후 저장소의 모든 상태를 초기 상태로 포맷.

---

## 💻 4. 로컬 개발 및 실행 가이드

```bash
# 1. 저장소 복제 및 폴더 이동
git clone [https://github.com/love4xox/action-dice.git](https://github.com/love4xox/action-dice.git)
cd action-dice

# 2. 패키지 의존성 설치
npm install

# 3. 로컬 개발 서버 구동 (localhost:3000)
npm run dev

# 4. 프로덕션 빌드 검증
npm run build
```

---

## 🛠️ 5. 트러블슈팅 및 사용자 경험(UX) 최적화

### 5.1 깊은 다크 모드로 인한 시각 피로(할레이션) 해소 및 모던 라이트 테마 전환
* **문제 상황**: 초기 딥 다크 톤(`bg-slate-950`)과 백색 텍스트의 극단적 명도 대비(21:1)로 인해 장시간 사용 시 눈에 잔상이 남고 가독성이 저하됨.
* **해결 방안**:
  1. 전체 테마를 시각적 피로가 적은 부드러운 오프화이트/슬레이트 계열(`bg-slate-100`) 바탕으로 전환.
  2. 컨테이너 영역은 그림자(`shadow-sm`, `shadow-2xs`)가 적용된 퓨어 화이트 카드(`bg-white`)로 구성하고, 텍스트는 선명하면서도 차분한 `slate-900`/`slate-600` 명도 체계를 확립하여 장시간 몰입에 최적화된 디자인 구축.

### 5.2 라우트 간 스타일 불일치(Inconsistent Theming) 해결
* **문제 상황**: 단일 페이지에서 5개 페이지로 확장하는 과정에서 일부 페이지의 카드 컨테이너 배경(`bg-slate-900`)과 타이틀 폰트 색상(`text-white`)이 구버전 다크 톤으로 잔존하여 텍스트가 배경에 묻혀 보이지 않는 결함 발생.
* **해결 방안**: `app/globals.css`의 전역 `:root` 컬러 스키마를 `light`로 통일하고, `/pool`, `/stats`, `/guide`, `/settings` 전 페이지의 컴포넌트 래퍼를 `min-h-[calc(100vh-4rem)] bg-slate-100` 및 화이트 카드 디자인 시스템으로 전수 리팩토링 완료.

### 5.3 Edge Runtime 다이내믹 파비콘(icon.tsx) 적용
* **문제 상황**: 배포 시 Next.js 기본 흑백 삼각형 파비콘이 남아 브랜드 정체성이 약화되는 문제.
* **해결 방안**: 정적 `favicon.ico`를 제거하고 Next.js Edge Runtime 기반의 `app/icon.tsx`를 구현하여 보라-인디고 그라데이션 바탕의 주사위(🎲) 아이콘을 브라우저 탭에 자동 렌더링.

### 5.4 단일 SPA 대시보드에서 5-Page 멀티페이지 아키텍처로의 확장
* **문제 상황**: 다이스 추첨, 액션 목록, 가이드 문헌, 통계 데이터가 한 화면에 과밀하게 집중되어 사용자 인터랙션의 초점이 분산됨.
* **해결 방안**: Next.js 14 App Router의 디렉토리 기반 라우팅을 채택해 비즈니스 로직과 정보 구조를 명확히 분리하고, 공통 `RootLayout`에 반응형 상단 헤더 네비게이션을 구축하여 페이지 간 지연 없는 즉각적 화면 전환 제공.

---

## 📑 6. 평가 기준 심층 분석 대응

* **목적 중심의 도메인 분리**: 다이스 추첨, 액션 CRUD, 레벨링 통계, 방법론 가이드, 백업 설정 등 서로 다른 성격의 기능을 5개의 독립 페이지로 분리하여 코드 모듈화 및 유지보수성을 극대화.
* **운영 비용 0원(Zero Maintenance Cost)**: 복잡한 외부 DB 연동 없이 브라우저 고유의 LocalStorage 영구화 기술과 클라이언트 사이드 상태 관리를 채택하여 호스팅 및 유지보수 비용을 완벽히 제로화.
* **인체공학적 UI/UX 설계**: 과도한 눈부심과 딥 다크 모드의 시각 피로를 모두 개선한 모던 라이트 테마를 적용하고, 즉시 착수를 유도하는 인터랙티브 파티클 피드백을 제공하여 실사용 만족도를 극대화.