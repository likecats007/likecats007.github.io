---
title: OWSAP Top 10 보안 동향 분석[임시]
description: .
pubDate: 2026-11-23T13:06
category: 블로그/기술문서
draft: false
---
OWASP Top 10은 비영리 보안 재단인 OWASP이 공격 데이터와 전문가 설문을 통해 선정한 가장 치명적인 10대 보안 위협을 설정하고 발표한 것으로 이를 통해  보안 우선순위를 선정하고, 개발자와 보안 담당자, 경영진 간의 원활한 커뮤니케이션을 돕는 등 보안 수준을 높이기 위한 가이드라인이다.

이 미션의 목표는 OWASP Top 10 보안 동향을 조사하여, 자신만의 언어로 블로그에 정리하는 것이다. 

1. [A01:2025 - Broken Access Control](https://top10.owasp.org/2025/A01_2025-Broken_Access_Control/)
2. [A02:2025 - Security Misconfiguration](https://top10.owasp.org/2025/A02_2025-Security_Misconfiguration/)
3. [A03:2025 - Software Supply Chain Failures](https://top10.owasp.org/2025/A03_2025-Software_Supply_Chain_Failures/)
4. [A04:2025 - Cryptographic Failures](https://top10.owasp.org/2025/A04_2025-Cryptographic_Failures/)
5. [A05:2025 - Injection](https://top10.owasp.org/2025/A05_2025-Injection/)
6. [A06:2025 - Insecure Design](https://top10.owasp.org/2025/A06_2025-Insecure_Design/)
7. [A07:2025 - Authentication Failures](https://top10.owasp.org/2025/A07_2025-Authentication_Failures/)
8. [A08:2025 - Software or Data Integrity Failures](https://top10.owasp.org/2025/A08_2025-Software_or_Data_Integrity_Failures/)
9. [A09:2025 - Security Logging and Alerting Failures](https://top10.owasp.org/2025/A09_2025-Security_Logging_and_Alerting_Failures/)
10. [A10:2025 - Mishandling of Exceptional Conditions](https://top10.owasp.org/2025/A10_2025-Mishandling_of_Exceptional_Conditions/)

것이 OWASP Top 10:2025 목록이다.



## === 주제 선정 ====

최근 수업에서 예외 처리에 대하여 배우고 있었기 때문에 "Mishandling of Exceptional Conditions"(예외적 상황의 부적절한 처리)에 예외 처리를 부적절하게 한 것이 보안 상의 어떤 위험이 있는 것인지 궁금해져 이 주제를 선정하게 되었다.



## ==== 내용 공부 ====

우선 선정한 주제에 대하여 먼저 알아보자.

 "Mishandling of Exceptional Conditions"

는 프로그램이 일반적이지 않고 크래시나 예상치 못한 동작, 취약점들을 가져오는 예측 불가능한 상황에서 예방, 감지, 반응하는데 실패하여 발생하게 된다. (소프트웨어에서)

 

예외적 상황을 잘못 처리하면 논리 버그, 오버플로우, 레이스 컨디션, 부정 거래, 메모리·상태·리소스·타이밍·인증·인가 관련 문제 등 여러 보안 취약점이 발생할 수 있다. 이러한 취약점들은 시스템 또는 데이터의 기밀성, 가용성, 무결성에 부정적인 영향을 미칠 수 있다. 



예외 상황을 적절히 처리하려면 최악의 상황을 대비한 계획을 세워 모든 시스템 오류를 발생 지점에서 직접 캐치하고, 이를 정상 상태로 복구해야 한다. 여기에 더해 직접 캐치하지 못한 예외 상황을 대비해 전역 예외 처리기를 구현해야 한다. 이 과정에서 오류 발생시 사용자가 이해하기 쉬운 방식으로 알리고, 이벤트 로깅, 필요시 알림 전송하는 것이 포함되어야 한다.   

+ 반복되는 오류나 진행 중인 공격을 나타내는 패턴을 감시하고, 이에 대응, 방어, 차단할 수 있는 모니터링 또는 옵저버빌리티 도구를 갖추는 것이 좋다.

## ==== 참고 자료 ====

OWASP Top 10:2025 : [https://top10.owasp.org/2025/ko/A10_2025-Mishandling_of_Exceptional_Conditions/](https://top10.owasp.org/2025/ko/A10_2025-Mishandling_of_Exceptional_Conditions/)



&nbsp;