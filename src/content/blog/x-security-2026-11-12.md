---
title: "X에 올라오는 최신 보안이슈 매일 스크랩하기 7일차"
description: "Node.js HTTP/2·TLS 취약점 보안 업데이트를 정리한다."
pubDate: 2026-11-12T05:52
category: "블로그/기술문서"
tags: ["보안", "Node.js", "HTTP2", "TLS", "CVE-2026-123863", "X스크랩"]
draft: false
---

매일 X에 올라오는 최신 보안 이슈를 확인하고, 출처와 핵심 내용을 기록한다.

## 오늘의 보안 이슈

- [Node.js 11월 보안 업데이트](https://nodejs.org/en/blog/vulnerability/november-2026-security-releases)에 따르면, HTTP/2 세션 종료 과정의 **CVE-2026-123863**은 인증되지 않은 원격 클라이언트가 Node.js 서버 프로세스를 중단시킬 수 있는 고위험 취약점이다.
- 같은 업데이트는 HTTP/2 응답 메모리 노출(CVE-2026-123866)과 TLS 서버 프로세스 종료(CVE-2026-126051) 등도 수정한다.
- 운영 중인 서비스는 지원되는 보안 릴리스인 **22.23.5, 24.22.3, 26.13.1 이상**으로 업데이트하고, HTTP/2 또는 TLS 서버를 우선 점검해야 한다.
