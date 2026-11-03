# Jeongju Pak의 개인 포트폴리오

전북대학교 컴퓨터인공지능학부 학부생 박정주의 소개와 학습 기록을 담은 Hugo 사이트입니다. TailBliss 테마를 바탕으로 관심 분야, 활동 이력, C 자료구조 학습 내용과 수료증을 정리했습니다.

- [공개 사이트](https://jjert9070.github.io/profile/)
- [GitHub 저장소](https://github.com/jjert9070/profile)
- [자동 배포 실행 내역](https://github.com/jjert9070/profile/actions/workflows/hugo-pages.yml)

## 사이트 구성

| 영역                        | 내용                                                             | 주소                                                                                  |
| --------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Home                        | 자기소개, 관심 분야와 아바타                                     | [홈](https://jjert9070.github.io/profile/)                                            |
| Career                      | 입학, ALPS 동아리 활동과 ICPC 예선 참가 이력                     | [Career](https://jjert9070.github.io/profile/#career)                                 |
| Study / Algorithm           | 알고리즘 학습 글을 추가할 공간. 현재 안내 문장만 게시            | [Algorithm](https://jjert9070.github.io/profile/study/algorithm/)                     |
| Study / Data Structure      | 자료구조 학습 글을 추가할 공간. 현재 안내 문장만 게시            | [Data Structure](https://jjert9070.github.io/profile/study/data-structure/)           |
| Study / Data Structure in C | 자료구조 강의에서 직접 코딩하고 강사 코드와 비교하며 공부한 내용 | [Data Structure in C](https://jjert9070.github.io/profile/study/data-structure-in-c/) |
| Study / Certificate         | 수료증 갤러리, 수료 이력과 수료증이 없는 추가 학습 강좌          | [Certificate](https://jjert9070.github.io/profile/study/certificate/)                 |
| Contact                     | 이름과 이메일                                                    | [Contact](https://jjert9070.github.io/profile/#contact)                               |

## 실행 환경

프로젝트 최상위는 `package.json`과 `hugo.yaml`이 함께 있는 폴더입니다. 이후의 명령은 별도 설명이 없으면 이 폴더에서 실행합니다.

| 도구          | 사용 버전 또는 설정                            | 용도                                           |
| ------------- | ---------------------------------------------- | ---------------------------------------------- |
| Git           | 버전 고정 없음                                 | 저장소 받기, 변경 기록과 push                  |
| Node.js       | Actions에서 24.x 사용                          | Vite와 보조 도구 실행                          |
| pnpm          | 11.24.0                                        | 로컬 의존성 설치와 빌드. `package.json`에 지정 |
| Hugo Extended | 로컬 빌드 확인: 0.169.0, Actions 지정: 0.167.0 | 정적 HTML과 이미지 생성                        |
| Python        | Actions에서 3.12 사용                          | `.github/pages_build.py` 실행                  |
| Go            | Actions에서 1.27.1 지정                        | 배포 빌드 환경                                 |
| Dart Sass     | Actions에서 1.105.0 지정                       | 배포 빌드 환경                                 |

Tailwind CSS, Vite와 Alpine.js는 `package.json`과 `pnpm-lock.yaml`을 기준으로 설치합니다. 로컬 개발에는 Git, Node.js, Corepack과 Hugo Extended를 준비합니다. Python, Go와 Sass는 배포 보조 도구를 같은 방식으로 실행할 때도 필요하며, Actions에서는 workflow가 준비합니다.

### Windows에서 도구 준비

1. [Git for Windows](https://gitforwindows.org/)와 [Node.js](https://nodejs.org/)의 24.x 버전을 설치합니다.
2. Hugo Extended를 설치합니다. 이 프로젝트에서 실제 사용한 설치 명령은 `winget install -e --id Hugo.Hugo.Extended`입니다. 설치되는 버전은 실행 시점에 따라 다르므로 `hugo version`으로 확인합니다. 사용한 0.169.0 버전은 [공식 릴리스](https://github.com/gohugoio/hugo/releases/tag/v0.169.0)에서도 받을 수 있습니다.
3. 터미널을 새로 열고 `git --version`, `node --version`, `hugo version`, `corepack --version`을 각각 실행합니다. Hugo 출력에 extended가 포함되는지 확인합니다.
4. Corepack 명령을 찾지 못하면 프로젝트 바깥 폴더에서 `npm install --global corepack`으로 준비합니다. 이후 프로젝트에서는 `corepack pnpm`으로 명령을 실행합니다. 전역 설치 경로의 권한 문제가 생기면 Node.js 설치 환경을 확인합니다.

이 프로젝트는 pnpm을 사용합니다. 프로젝트 폴더에서 `npm install`이나 `npx get-pnpm`을 실행하면 `devEngines.packageManager` 설정과 충돌할 수 있으므로 아래 pnpm 절차를 사용합니다.

## 저장소 받기와 설치

1. 작업 폴더의 상위 위치에서 `git clone https://github.com/jjert9070/profile.git`을 실행합니다.
2. `cd profile`로 받은 저장소에 들어갑니다. 기존 ZIP 작업 폴더를 사용한다면 `tailbliss-main` 등 실제 폴더 이름으로 이동합니다.
3. `corepack pnpm --version`으로 `package.json`에 지정한 pnpm 11.24.0 사용 여부를 확인합니다.
4. `corepack pnpm install --frozen-lockfile`로 잠금 파일에 맞춰 의존성을 설치합니다.

실행에 사용하는 콘텐츠와 레이아웃은 최상위 `content/`, `layouts/`, `assets/`, `static/`에 있습니다. `themes/tailbliss/`로 이동해서 설치하거나 원본 테마의 `exampleSite`를 새로 복사할 필요는 없습니다. `prepare_github_pages.py`는 초기 설정에 사용한 수업 제공 파일이며, 저장소를 받은 뒤 다시 실행할 필요가 없습니다. 이 파일은 Git 추적에서 제외했습니다.

## 로컬 실행과 빌드

| 목적                        | 프로젝트 최상위에서 실행할 명령 | 결과                                  |
| --------------------------- | ------------------------------- | ------------------------------------- |
| 일반 미리보기               | `corepack pnpm run dev`         | CSS를 한 번 만든 뒤 Hugo 서버 실행    |
| Tailwind 스타일도 계속 수정 | `corepack pnpm run dev:watch`   | CSS 감시 빌드와 Hugo 서버를 함께 실행 |
| 배포용 로컬 빌드            | `corepack pnpm run build`       | Vite와 Hugo 빌드 후 `public/` 생성    |

서버가 출력하는 주소를 엽니다. 기본 주소는 [http://localhost:1313/](http://localhost:1313/)입니다. 포트가 이미 사용 중이면 출력된 실제 주소를 따릅니다. 서버를 종료할 때는 터미널에서 Ctrl+C를 누릅니다.

CSS가 이미 생성되어 있고 글이나 템플릿만 수정한다면 `hugo server`로도 확인할 수 있습니다. 새 Tailwind 클래스를 추가한 경우에는 CSS 재빌드가 필요하므로 `dev:watch`를 사용하거나 빌드를 다시 실행합니다.

새 글이 보이지 않으면 Markdown 상단의 draft 설정과 게시 날짜를 확인합니다. 초안까지 확인하려면 `hugo server --buildDrafts`를 사용합니다. `content/study/` 아래의 글을 만들었다고 홈의 소개문이 자동으로 바뀌는 것은 아닙니다. 해당 페이지와 목록을 확인하고 필요하면 메뉴도 연결합니다.

`public/`은 빌드 결과입니다. 내용을 고칠 때는 원본 파일을 수정합니다. 로컬의 일반 빌드와 Actions의 경로 보정 빌드는 절차가 다르므로, 최종적으로 공개 사이트의 `/profile/` 경로에서도 확인합니다.

## 수정할 파일

| 수정할 내용                               | 위치                                       | 역할                                          |
| ----------------------------------------- | ------------------------------------------ | --------------------------------------------- |
| 사이트 제목, 소개문, Career와 메뉴 설정   | `hugo.yaml`                                | 화면에 사용할 설정과 데이터                   |
| 홈 화면 배치, 아바타와 학교 사진, Contact | `layouts/index.html`                       | 설정과 이미지를 홈 화면에 배치                |
| 상단 메뉴, 모바일 메뉴와 키보드 이동      | `layouts/partials/nav.html`                | 메뉴 상태와 조작 처리                         |
| 하단 링크와 공통 스크립트 연결            | `layouts/partials/footer.html`             | 하단 영역과 공통 기능 로드                    |
| 학습 페이지                               | `content/study/`                           | Markdown으로 본문 작성                        |
| 수료증 목록과 강좌 이력                   | `content/study/certificate.md`             | 갤러리 데이터와 본문                          |
| 수료증 갤러리 마크업                      | `layouts/shortcodes/certificate-belt.html` | 갤러리와 확대 창 구성                         |
| 아바타와 학교 사진                        | `assets/images/pages/`                     | Hugo에서 처리할 이미지 원본                   |
| 수료증 파일과 미리보기                    | `static/certificates/`                     | 원본 PDF와 `previews/` 이미지                 |
| 수료증 조작                               | `static/js/certificate-belt.js`            | 순환 이동과 확대 창, 입력 처리                |
| 수료증 스타일                             | `static/styles/certificate-belt.css`       | 카드 크기와 가장자리, 확대 창 표시            |
| 본문 배치와 메뉴 효과                     | `static/styles/content-layout.css`         | 반응형 배치, 초점 테두리와 전환               |
| 공통 키보드 탐색                          | `assets/js/keyboard-navigation.js`         | 키보드와 포인터 입력 구분                     |
| 다크 모드와 밝은 모드 전환                | `assets/js/darkmode.js`                    | 모드 변경 처리                                |
| 배포 설정                                 | `.github-pages.json`                       | 빌드 소스와 설정 파일 지정                    |
| 배포용 추가 설정                          | `site/pages.json`                          | 운영 baseURL 등 설정. 콘텐츠 수정 대상은 아님 |
| 자동 배포                                 | `.github/workflows/hugo-pages.yml`         | 실행 브랜치와 도구 버전, 빌드와 배포          |
| 배포 보조 도구                            | `.github/pages_build.py`                   | 보조 의존성 준비와 빌드, 배포 경로 보정       |

사용하지 않는 데모 콘텐츠, `exampleSite/`와 최상위 `images/`는 정리했습니다. 현재 사용하는 `assets/images/`와 `static/images/`와는 다른 폴더입니다. `site/`에는 초기 준비 파일도 남아 있지만, 현재 배포 소스는 `.github-pages.json`의 source 값인 `"."`, 즉 최상위 폴더입니다. 설정 파일 목록은 `"hugo.yaml,site/pages.json"`입니다.

## GitHub Pages 자동 배포

### 저장소 설정

GitHub 저장소의 Settings → Pages → Build and deployment에서 Source를 GitHub Actions로 지정합니다. `github-pages` 환경에 배포 브랜치 제한을 설정했다면 실제 실행할 브랜치를 허용해야 합니다. build가 성공했는데 deploy가 거부되는 경우 Settings → Environments → github-pages의 배포 보호 설정도 확인합니다.

현재 workflow는 `main`과 `profiling`의 push 및 수동 실행을 받습니다. 두 브랜치는 별도 미리보기 주소가 아니라 **같은 공개 사이트**에 배포됩니다. 마지막으로 완료된 배포가 공개 화면이 되므로 제출 직전에는 `main`의 최종 실행과 사이트를 대조합니다. 새로운 브랜치를 만들었다고 자동 배포 대상에 저절로 추가되지는 않습니다.

### 수정한 내용을 배포하는 순서

1. `git branch --show-current`와 `git status`로 현재 브랜치와 변경 파일을 확인합니다.
2. 로컬에서 수정 결과를 확인하고, 필요한 경우 `corepack pnpm run build`로 빌드합니다.
3. 제출할 파일을 골라 추가합니다. README만 수정했다면 `git add README.md`를 사용합니다.
4. README 변경 예시는 `git commit -m "포트폴리오 설치와 실행 및 배포 안내 작성"`입니다. 다른 변경은 실제 수정 내용을 설명하는 메시지로 기록합니다.
5. 현재 연결된 원격 브랜치에 올릴 때는 `git push`를 사용합니다. 로컬에 커밋만 한 상태로는 GitHub 배포가 시작되지 않습니다.
6. [Actions](https://github.com/jjert9070/profile/actions/workflows/hugo-pages.yml)에서 방금 push한 브랜치와 커밋 SHA가 맞는지 확인합니다. build와 deploy가 모두 성공해야 합니다.
7. [공개 사이트](https://jjert9070.github.io/profile/)에서 실제 변경을 확인합니다. 로컬 주소와 공개 주소를 구분합니다.

제출 버전은 `main`으로 정리합니다. 작업 브랜치에서 진행했다면 변경을 커밋한 뒤 `main`에 반영하고 `main`을 push합니다. 병합 전 `git status`로 미커밋 변경을 확인하고, 충돌이 있으면 해결한 뒤 진행합니다.

기존 실행의 Re-run은 그 실행이 사용한 커밋을 다시 실행합니다. 새로 올린 커밋을 배포하려면 해당 push로 생성된 실행을 확인하거나, 수동 실행에서 올바른 브랜치를 선택합니다. 반영이 늦어 보이면 재실행을 반복하기 전에 배포 SHA와 최신 실행 상태를 확인하고 페이지를 새로고침합니다.

Actions는 Hugo 0.167.0 Extended와 추가 도구를 준비한 뒤 `python .github/pages_build.py --dependencies`, `python .github/pages_build.py --build` 순서로 실행합니다. 운영 주소를 적용하고 `/profile/` 하위 경로의 자산 참조를 보정한 `public/`을 업로드합니다. 이 절차와 도구 버전의 기준은 workflow 파일입니다.

### 공개 사이트 확인 항목

- 자기소개, 아바타와 학교 사진이 표시되는지 확인합니다.
- 상단과 하단 링크가 올바른 화면으로 이동하고, 내부 페이지 새로고침과 뒤로 가기가 작동하는지 확인합니다.
- 1440px와 390px 폭에서 본문과 메뉴가 겹치지 않는지 확인합니다. 새로고침 없이 창 폭을 바꿔 배치 전환도 확인합니다.
- Tab 초점 테두리, Enter 실행, Esc 닫기와 초점 복귀를 확인합니다.
- Certificate에서 확대와 닫기, 포인터 이동과 키보드 탐색을 확인하고, Tab으로 갤러리 밖에 나갈 수 있는지 확인합니다.

## 출처와 AI 활용

- 테마: [NusserStudios의 TailBliss](https://github.com/nusserstudios/tailbliss). Apache License 2.0에 따라 사용하며 [LICENSE](LICENSE)와 사이트의 제작자 고지를 유지합니다.
- 원본 테마의 기여 출처: [4044ever의 Hugo Tailwind 3.0](https://github.com/4044ever/Hugo-Tailwind-3.0)과 [Jan Heise의 Alpine.js 메뉴](https://github.com/jan-heise/responsive-navbar-with-dropdown). Tailwind CSS 4와 Vite 통합은 TailBliss 팀의 작업을 바탕으로 합니다.
- 아바타: 본인이 제공한 사진을 바탕으로 만든 AI 이미지입니다.
- 학교 사진: 전북대학교 전기공학과 사이트에서 가져온 외부 사진입니다. 별도 재사용 허락 조건은 확인하지 못했으며, 출처 기록이 이용 허락을 뜻하지는 않습니다. 원본 주소, 확인일과 권리 표시는 [이미지 출처 기록](assets/images/pages/SOURCES.md)에 있습니다.
- 수료증: 인프런에서 발급한 본인 수료증과 미리보기입니다. 강의 자료나 코드를 자유롭게 재배포할 수 있다는 뜻은 아닙니다.
- 자료구조 학습: 강의를 멈추고 직접 코드를 작성한 뒤 강사 코드와 비교한 경험을 정리했습니다. 사이트 글의 구성과 설명에는 AI 도움을 받았습니다.
- AI 지원: Codex를 사용해 구조와 명령 설명, 소개문 정리, HTML/CSS/JavaScript 구현과 수정, 오류 분석 및 문서 작성을 지원받았습니다. 테마 선택, 요구사항과 채택 여부 결정, Git 명령 실행과 커밋, push 및 공개 사이트 수동 검증은 본인이 수행했습니다.
- CSS 참고: [f/prompts.chat](https://github.com/f/prompts.chat)의 CSS taste 프롬프트를 참고했습니다. 해당 프롬프트 데이터는 CC0입니다.

README를 포함해 최종 변경을 커밋하고 push한 뒤에는 보고서의 최종 main SHA, Actions 실행 링크와 커밋 집계도 함께 갱신합니다.
