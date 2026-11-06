---
title: 'X에 올라오는 최신 보안이슈 매일 스크랩하기 1일차'
description: 'X에서 확인한 OpenSSH 인증 우회 취약점과 Alpine Linux의 대응 권고를 기록한다.'
pubDate: 2026-11-06
category: '블로그/기술문서'
tags: ['보안', 'OpenSSH', 'X스크랩']
---

매일 X에 올라오는 최신 보안 이슈를 확인하고, 출처와 핵심 내용을 기록한다.

## 오늘의 보안 이슈

- [OpenSSH Flaw Lets Attackers Bypass Passwords on Alpine Linux Servers](https://x.com/i/trending/2118336712938344927) — musl 기반 Alpine 등에서 PAM 없이 빌드된 OpenSSH가 특정 설정으로 운영될 때 257~1,024바이트 비밀번호로 인증을 우회할 수 있는 취약점이 보고되어, [Alpine Linux는 openssh 업데이트 후 sshd를 재시작하거나 비밀번호 로그인을 비활성화하라고 권고한다](https://alpinelinux.org/posts/2026-11-05-openssh-password-authentication-bypass/).
