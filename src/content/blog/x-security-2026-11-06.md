---
title: 'X에 올라오는 최신 보안이슈 매일 스크랩하기 1일차'
description: 'X에서 확인한 OpenSSH 인증 우회 취약점을 한 줄로 요약한다.'
pubDate: 2026-11-06
category: '블로그/기술문서'
tags: ['보안', 'OpenSSH', 'X스크랩']
---

매일 X에 올라오는 최신 보안 이슈를 확인하고, 출처와 핵심 내용을 기록한다.

## 오늘의 보안 이슈

- [OpenSSH Flaw Lets Attackers Bypass Passwords on Alpine Linux Servers](https://x.com/i/trending/2118336712938344927) — musl 기반 Alpine 등에서 PAM 없이 빌드된 OpenSSH는 특정 조건에서 257~1,024바이트 비밀번호로 암호 없는 계정의 인증이 우회될 수 있어, 보안 업데이트를 적용하거나 비밀번호 인증을 꺼야 한다.
