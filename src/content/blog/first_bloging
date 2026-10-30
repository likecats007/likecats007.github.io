---
title: 'GitHub Pages와 Astro로 기술 블로그 만들기'
description: 'Astro Terminal 템플릿으로 블로그를 만들고 카테고리, 한글화, 폰트를 수정하면서 배운 내용을 정리했다.'
pubDate: 2026-10-30
category: '블로그/기술문서'
tags: ['GitHub Pages', 'Astro', '블로그', 'CSS']
draft: false
---

공부한 내용을 기록할 기술 블로그를 만들기로 했다. GitHub Pages에 Astro Terminal 템플릿을 적용하고, 필요한 기능을 하나씩 추가하는 방식으로 진행했다.

처음에는 템플릿을 가져와서 글만 쓰면 될 줄 알았다. 그런데 카테고리를 추가하거나 폰트를 바꾸려면 파일의 역할과 코드가 연결되는 방식도 알아야 했다.

이번 글에서는 블로그를 만들면서 배운 내용과 막혔던 부분을 정리한다.

## 1. GitHub Pages의 개념

GitHub는 코드와 파일을 저장하고 수정 이력을 관리하는 플랫폼이다. 하나의 프로젝트를 담는 공간을 저장소, 즉 Repository라고 한다.

GitHub Pages는 저장소의 파일을 웹사이트로 공개하는 서비스다. HTML, CSS, JavaScript로 구성된 정적 사이트를 게시할 수 있다.

내 블로그의 저장소와 접속 주소는 다음과 같다.

| 구분 | 주소 |
| --- | --- |
| 저장소 | https://github.com/likecats007/likecats007.github.io |
| 블로그 | https://likecats007.github.io |

저장소는 소스 코드를 관리하는 곳이고, 블로그 주소는 방문자가 완성된 화면을 보는 곳이다.

계정 사이트는 저장소 이름을 `GitHub아이디.github.io`로 만들어 사용한다.

## 2. Astro Terminal 템플릿 적용

블로그를 처음부터 전부 만들기보다는 기존 템플릿을 수정하며 구조를 익히기로 했다.

선택한 템플릿은 [Astro Terminal](https://github.com/faizov/astro-terminal)이다. 오래된 터미널을 닮은 글자와 테두리, 화면 효과가 마음에 들었다.

이 템플릿은 Astro를 사용한다. Markdown 게시물과 Astro 컴포넌트를 빌드해서 배포할 웹페이지를 만드는 구조다.

```text
Markdown 게시물과 Astro 코드 작성
→ 빌드
→ HTML·CSS·JavaScript 생성
→ GitHub Pages에 배포
```

내 저장소에는 GitHub Actions를 이용한 배포 설정이 있다. `main` 브랜치에 변경 사항을 올리면 빌드와 배포가 진행된다.

따라서 파일을 수정하고 커밋한 다음에는 Actions에서 작업이 성공했는지 확인해야 한다.

## 3. 주요 파일의 역할

템플릿을 수정하기 위해 먼저 파일 구조를 확인했다.

| 파일 또는 폴더 | 역할 |
| --- | --- |
| `src/consts.ts` | 블로그 이름, 설명, 암호 화면 사용 여부 등 공통 설정 |
| `src/layouts/Layout.astro` | 전체 페이지의 공통 틀과 로딩·테마·소리 동작 |
| `src/components/TerminalHeader.astro` | 상단 로고와 메뉴 |
| `src/components/TerminalFooter.astro` | 하단 문구 |
| `src/components/TerminalToggles.astro` | 테마와 소리 버튼 |
| `src/components/Frame.astro` | 터미널 형태의 테두리 |
| `src/components/PostItem.astro` | 게시물 목록의 한 항목 |
| `src/pages/index.astro` | 메인 화면 |
| `src/pages/about.astro` | 자기소개 페이지 |
| `src/pages/blog/index.astro` | 전체 게시물 목록 |
| `src/pages/blog/[...slug].astro` | 게시물 상세 화면 |
| `src/content.config.ts` | 게시물 데이터 형식 |
| `src/content/blog/` | Markdown 게시물 |
| `src/styles/terminal.css` | 글꼴, 색상, 배치와 화면 효과 |
| `public/fonts/` | 폰트 파일 |

화면에 보이는 내용이 한 파일에 모여 있는 것은 아니었다. 공통 화면, 개별 페이지, 동작을 담당하는 스크립트가 나뉘어 있었다.

## 4. 초기 암호 화면 끄기

템플릿에는 사이트에 처음 접속했을 때 암호를 맞히는 미니게임을 보여주는 기능이 있었다.

블로그에서는 글을 바로 읽을 수 있는 편이 낫다고 생각해 이 기능을 껐다.

`src/consts.ts`에서 다음과 같이 설정한다.

```ts
export const PRIVATE_MODE = false;
```

암호 화면과 터미널 부팅 애니메이션은 서로 다른 기능이다. 암호 화면을 꺼도 기존 로딩 화면은 유지된다.

로딩 화면은 `src/layouts/Layout.astro`에 있고, 다음 코드로 약 2.6초 후 자동 종료된다.

```ts
setTimeout(dismiss, 2600);
```

화면에 표시되는 문구도 같은 파일에서 바꿀 수 있다.

```html
<div class="crt-boot__skip">[ 불러오는 중... ]</div>
```

원본 설정에서는 같은 탭의 세션에서 한 번만 보여주며, 모바일 화면이나 애니메이션 감소 설정에서는 생략될 수 있다.

> PRIVATE_MODE는 화면을 가리는 장식용 기능이다. 실제 로그인이나 접근 권한을 확인하는 보안 기능은 아니다.

## 5. Markdown으로 게시물 작성하기

게시물은 `src/content/blog/` 안에 `.md` 파일로 작성한다.

파일 맨 위의 `---` 사이에는 제목, 설명, 작성일 등의 정보를 넣는다. 이 부분을 프런트매터라고 한다.

```md
---
title: 'C++ 포인터 정리'
description: '포인터와 메모리 주소의 관계를 정리했다.'
pubDate: 2026-10-30
category: '개발'
tags: ['C++', '포인터']
draft: false
---

여기부터 글 본문을 작성한다.
```

각 항목의 역할은 다음과 같다.

| 항목 | 역할 |
| --- | --- |
| `title` | 게시물 제목 |
| `description` | 게시물 요약 |
| `pubDate` | 작성일 |
| `category` | 큰 분류 |
| `tags` | 세부 주제 |
| `draft` | `true`이면 현재 템플릿에서 배포 대상에서 제외 |
| `heroImage` | 대표 이미지 경로, 선택 사항 |

제목이나 설명의 내용은 한글로 작성해도 되지만, `title`, `description` 같은 항목 이름은 그대로 사용해야 한다.

이미지는 다음과 같이 넣을 수 있다.

```md
![이미지 설명](./images/photo.png)
```

## 6. 카테고리 기능 추가

블로그에는 다음 여섯 카테고리를 사용하기로 했다.

- 개발
- CTF/Wargame
- Bug Bounty
- 블로그/기술문서
- 논문/컨퍼런스
- 공모전/자격증

기존 템플릿에는 태그 기능이 있었지만, 원하는 카테고리 공간은 별도로 추가해야 했다.

### 게시물 데이터에 category 추가

`src/content.config.ts`에서 게시물 데이터 형식에 다음 항목을 추가했다.

```ts
category: z.string().default('미분류'),
```

카테고리를 문자열로 읽고, 지정하지 않으면 `미분류`로 처리한다는 뜻이다.

이후 각 게시물의 프런트매터에 다음처럼 작성한다.

```yaml
category: '개발'
```

카테고리는 큰 분류로, 태그는 세부 주제로 사용한다.

```yaml
category: '개발'
tags: ['C++', '포인터']
```

### 카테고리별 글 목록 만들기

`src/pages/categories.astro`에 카테고리 페이지를 만들었다.

게시물은 `getCollection()`으로 가져오고 최신순으로 정렬한다.

```ts
const posts = (
  await getCollection('blog', ({ data }) => !data.draft)
).sort(
  (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
);
```

각 카테고리에 해당하는 글은 `filter()`로 선택한다.

```ts
const categoryPosts = posts.filter(
  (post) => post.data.category === category
);
```

분류된 글은 기존 `Frame`과 `PostItem` 컴포넌트로 표시했다. 기존 컴포넌트를 사용하면 템플릿의 디자인을 유지하면서 기능을 추가할 수 있다.

카테고리 이름은 문자열을 그대로 비교하므로 정확하게 적어야 한다. `Bug Bounty`와 `BugBounty`는 서로 다른 값이다.

현재 카테고리 페이지에는 정해 둔 여섯 분류만 표시한다. 따라서 카테고리를 지정하지 않은 글은 전체 글 목록에는 나오지만, 여섯 카테고리 목록에는 포함되지 않는다.

## 7. 카테고리 추가 중 발생한 문제

### 상단 메뉴가 클릭되지 않음

상단에 CATEGORIES라는 글자는 보였지만 클릭되지 않는 문제가 있었다.

코드를 확인하니 링크 없이 글자만 들어가 있었다.

```astro
&gt; CATEGORIES
```

`&gt;`는 `>` 기호를 표시하는 문자 참조다. 이것만으로는 다른 페이지로 이동할 수 없다.

다음처럼 `<a>` 태그와 이동할 주소를 넣어 해결했다.

```astro
<a href="/categories/" aria-current={current('/categories/')}>
  &gt; 카테고리
</a>
```

### 태그만 보이고 카테고리는 표시되지 않음

게시물에 `category`를 작성했는데도 상세 화면에는 태그만 표시됐다.

데이터를 추가하는 것과 화면에 출력하는 것은 별개의 작업이었다.

`src/pages/blog/[...slug].astro`에서 `category`를 가져오도록 수정했다.

```ts
const {
  title,
  description,
  pubDate,
  updatedDate,
  heroImage,
  tags,
  category,
} = post.data;
```

그리고 게시물 정보 영역에 출력 코드를 추가했다.

```astro
{' // 카테고리: '}
<a href="/categories/">[{category}]</a>
```

이 과정에서 카테고리 기능을 다음 세 단계로 나누어 이해하게 됐다.

1. 카테고리 데이터를 받을 수 있도록 설정한다.
2. 게시물에 카테고리를 지정한다.
3. 그 정보를 화면에 출력한다.

## 8. 사이트 한글화와 자기소개 수정

한글화할 때는 화면에 보이는 문구와 기능에 사용되는 이름을 구분해야 한다.

```astro
<a href="/blog/">전체 글</a>
```

위 코드에서 `전체 글`은 표시 문구이고, `/blog/`는 이동할 주소다. 메뉴를 번역할 때 주소까지 바꾸면 기존 페이지와 연결되지 않을 수 있다.

`class`, `data-action`, 변수명도 표시 문구와 구분해서 수정해야 한다.

주요 수정 위치는 다음과 같다.

| 수정 내용 | 파일 |
| --- | --- |
| 블로그 이름과 설명 | `src/consts.ts` |
| 상단 메뉴 | `src/components/TerminalHeader.astro` |
| 자기소개와 연락처 | `src/pages/about.astro` |
| 홈의 최근 글 안내 | `src/pages/index.astro` |
| 전체 글 안내 | `src/pages/blog/index.astro` |
| 작성일·수정일·태그 등의 문구 | `src/pages/blog/[...slug].astro` |
| 로딩과 동작 중 변경되는 문구 | `src/layouts/Layout.astro` |

문서의 기본 언어는 다음처럼 지정할 수 있다.

```html
<html lang="ko" data-theme="amber">
```

이는 문서가 한국어임을 알려주는 설정이다. 영어로 적힌 문구를 자동으로 번역하는 기능은 아니다.

### 소리 버튼은 두 곳을 확인해야 한다

소리 버튼은 HTML에 적힌 문구뿐 아니라 JavaScript에서도 상태에 따라 문구를 바꾼다.

따라서 버튼에 적힌 SND만 번역하면 스크립트 실행 후 영어로 돌아갈 수 있다.

`src/layouts/Layout.astro`의 상태 변경 코드도 함께 수정해야 한다.

```ts
if (label) {
  label.textContent = sfx.enabled ? '♪ 소리 켜짐' : '♪ 소리 꺼짐';
}
```

### 블로그 이름과 자기소개

블로그 전체의 이름과 설명은 `src/consts.ts`에서 설정한다.

```ts
export const SITE_TITLE = 'LIKECATS007';
export const SITE_TAGLINE = '개발과 보안을 공부하며 남기는 기록';
export const SITE_DESCRIPTION =
  '개발과 보안 관련 학습 내용을 정리하는 개인 블로그입니다.';
```

자기소개 페이지는 `src/pages/about.astro`에서 수정한다. 이름이나 닉네임, 전공, 관심 분야, 블로그에 기록할 내용을 넣을 수 있다.

GitHub 링크는 내 프로필 주소로 연결한다.

```html
<a href="https://github.com/likecats007">GitHub</a>
```

## 9. Neo둥근모 폰트 적용

폰트를 바꾸는 과정에서도 파일을 올리는 것만으로는 적용되지 않는다는 것을 알게 됐다.

폰트 파일을 등록하는 설정과 실제로 사용하는 설정이 연결되어야 한다.

### 폰트 파일 경로

폰트는 다음 위치에 넣었다.

```text
public/fonts/neodgm.woff
```

`public` 폴더 안의 파일은 사이트 루트 경로를 기준으로 제공된다. 따라서 CSS에서는 `public`을 제외하고 작성한다.

```text
/fonts/neodgm.woff
```

### 폰트 등록과 사용

`src/styles/terminal.css`에서 폰트를 등록한다.

```css
@font-face {
  font-family: 'neodgm';
  src: url('/fonts/neodgm.woff') format('woff');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

본문에서는 등록한 이름을 사용한다.

```css
body {
  font-family: 'neodgm', monospace;
}
```

`font-family`에 적는 이름은 CSS에서 사용할 이름이다. 파일 내부의 폰트 이름과 반드시 같아야 하는 것은 아니지만, 등록하는 곳과 사용하는 곳의 이름은 같아야 한다.

### 이름이 달라서 적용되지 않았던 문제

처음에는 다음처럼 등록 이름과 사용 이름이 달랐다.

```css
@font-face {
  font-family: 'IBM VGA';
  src: url('/fonts/neodgm.woff') format('woff');
}
```

```css
body {
  font-family: 'neodgm', monospace;
}
```

파일은 Neo둥근모였지만 등록 이름은 `IBM VGA`였다. 반면 본문에서는 `neodgm`을 사용하려고 했기 때문에 연결되지 않았다.

두 곳의 이름을 `neodgm`으로 맞춰 수정했다.

### 폰트 미리 불러오기

`src/layouts/Layout.astro`에는 폰트를 미리 불러오는 설정도 있다.

```html
<link
  rel="preload"
  href="/fonts/neodgm.woff"
  as="font"
  type="font/woff"
  crossorigin
/>
```

이 경로도 새 파일명과 맞춰야 한다.

다만 `preload`는 파일을 미리 불러오는 기능이다. 실제로 글꼴을 적용하는 것은 `@font-face`와 `font-family` 설정이다.

### 폰트 파일 자체 점검

설정을 맞춘 뒤에도 원하는 변화가 보이지 않아 파일 자체도 확인했다.

확인된 내용은 다음과 같다.

- 정상적인 WOFF 파일이었다.
- 내부 이름은 `NeoDunggeunmo`, `Neo둥근모`였다.
- 한글 글자가 포함되어 있었다.
- 배포된 폰트 파일과 저장소 파일이 동일했다.
- 배포된 CSS에서도 등록 이름과 사용 이름이 일치했다.

파일과 배포된 설정은 정상이었다. 다만 이 결과만으로 내 브라우저의 모든 요소에 적용됐다고 단정할 수는 없으므로, 화면이 그대로라면 캐시나 해당 요소의 스타일을 추가로 확인해야 한다.

## 10. 변경 사항이 보이지 않을 때

이번 작업을 통해 파일 수정과 화면 반영 사이에 여러 단계가 있다는 것을 알게 됐다.

변경 내용이 보이지 않으면 다음 순서로 확인할 수 있다.

1. 수정한 파일이 저장소에 올라갔는지 확인한다.
2. GitHub Actions의 빌드와 배포가 성공했는지 확인한다.
3. 파일 경로, 확장자, 대소문자가 일치하는지 확인한다.
4. 데이터를 화면에 출력하는 코드가 있는지 확인한다.
5. `Ctrl + Shift + R`로 강력 새로고침한다.
6. 시크릿 창에서도 같은 현상이 나타나는지 비교한다.

배포가 실패하면 기존 화면이 계속 보일 수 있고, 배포가 성공했어도 브라우저가 이전 파일을 캐시하고 있을 수 있다.

## 마무리

템플릿을 가져오는 것으로 시작했지만, 수정하는 과정에서 HTML 링크, Astro 컴포넌트, 게시물 데이터, CSS 폰트 설정과 배포 과정을 함께 살펴보게 됐다.

메뉴가 클릭되지 않았던 것은 링크 태그가 없었기 때문이고, 카테고리가 보이지 않았던 것은 출력 코드가 없었기 때문이었다. 폰트는 파일명뿐 아니라 등록 이름과 사용 이름까지 확인해야 했다.

앞으로 오류가 생기면 코드를 무작정 바꾸기보다, 파일과 데이터가 어디에 있고 어떤 코드가 화면에 표시하는지부터 확인해 보려고 한다.

## 참고 자료

- [GitHub Pages 소개](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)
- [Astro Terminal 템플릿](https://github.com/faizov/astro-terminal)
- [Astro 라우팅 문서](https://docs.astro.build/en/guides/routing/)
- [Astro 콘텐츠 컬렉션 문서](https://docs.astro.build/en/guides/content-collections/)
- [블로그 저장소](https://github.com/likecats007/likecats007.github.io)
