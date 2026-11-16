# Min의 블로그

[블로그 바로가기](https://likecats007.github.io)

Astro와 GitHub Pages로 운영하는 개인 기술 블로그입니다. 보안, 개발 학습 기록과 프로젝트 경험을 정리합니다.

## 사용 기술

- Astro
- Markdown
- GitHub Pages

## 로컬 실행

```bash
npm install
npm run dev
```

로컬 주소는 `http://localhost:4321`입니다. 배포 전에는 `npm run build`로 확인할 수 있습니다.

## 글 작성

`src/content/blog/`에 Markdown 파일을 추가합니다.

```md
---
title: '글 제목'
description: '글 목록에 표시할 짧은 설명'
pubDate: 2026-11-16
category: '블로그/기술문서'
tags: ['태그']
draft: false
---

본문
```

`main` 브랜치에 반영하면 GitHub Actions가 GitHub Pages에 자동 배포합니다.
