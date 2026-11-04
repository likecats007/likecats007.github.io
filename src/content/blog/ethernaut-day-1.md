---
title: 'Ethernaut 1일차: Sepolia에서 시작한 스마트 컨트랙트 보안 실습'
description: 'MetaMask와 Sepolia를 설정하고 Ethernaut의 Fallback, Fallout, Coin Flip, Telephone을 따라가며 Solidity와 컨트랙트 호출 흐름을 배운 기록.'
pubDate: 2026-11-04
category: 'CTF/Wargame'
tags: ['Wargame', 'Ethernaut', 'Solidity', 'Web3']
---

오늘은 스마트 컨트랙트 보안 워게임인 **Ethernaut**를 시작했다. MetaMask 지갑을 만들고 Sepolia 테스트넷을 연결한 뒤, 테스트 ETH를 받아 Remix와 브라우저 콘솔을 오가며 문제를 풀었다.

처음부터 술술 풀리지는 않았다. 지갑 네트워크를 찾고 테스트 ETH를 마련하는 데 시간을 썼고, JavaScript의 비동기 호출과 Solidity 트랜잭션 오류도 하나씩 구분해야 했다. 그래도 문제 코드를 읽고 직접 호출해 보면서 `msg.sender`, 컨트랙트 상태, 트랜잭션이 실행되는 흐름을 조금씩 익혔다.

## Fallback: 기여 기록과 실제 ETH 전송

첫 문제에서는 `contribute()`가 주소별 기여 금액을 `mapping`에 기록하는 구조를 살펴봤다. 이 값은 지갑의 ETH 잔액이 아니라 컨트랙트 안에 따로 저장된 기록이다.

`receive()`도 중요한 단서였다. 함수 호출 데이터 없이 ETH를 보내면 실행되며, 송신자의 기여 기록과 함께 `msg.value > 0`을 확인한다. `payable`은 함수가 ETH를 받을 수 있게 하는 표시라는 점도 확인했다. 문제의 목표는 소유권을 얻고 컨트랙트 잔액을 비우는 것이었고, `withdraw()`에는 소유자 검사인 `onlyOwner`가 붙어 있었다.

## Fallout: 생성자처럼 보이는 일반 함수

Fallout에서는 다음 함수가 눈에 띄었다.

```solidity
function Fal1out() public payable {
    owner = msg.sender;
    allocations[owner] = msg.value;
}
```

컨트랙트 이름 `Fallout`과 함수 이름 `Fal1out`은 서로 다르고, Solidity 0.6에서는 생성자를 `constructor()`로 선언해야 한다. 따라서 이 함수는 배포 시 한 번 실행되는 생성자가 아니라 누구나 호출할 수 있는 일반 함수다. 함수 이름의 작은 오타가 소유권 변경 취약점으로 이어질 수 있다는 걸 배웠다.

이 레벨은 클리어했다. 실습 중에는 `collectAllocations()`의 철자를 잘못 입력하거나 Ethernaut 콘솔 래퍼의 호출 방법을 혼동하기도 했다. 래퍼 함수 호출과 일반 Web3.js의 `.send()` 호출이 같은 방식이 아니라는 것도 알게 됐다.

## Coin Flip: 같은 블록 문맥에서 결과 계산하기

Coin Flip은 직전 블록의 해시에서 동전의 앞·뒤를 계산한다. 컨트랙트가 사용하는 계산을 공격용 컨트랙트에서도 수행해, 같은 트랜잭션 흐름에서 결과를 맞히는 원리를 살펴봤다.

첫 `flip(true)` 트랜잭션은 실패했고, 탐색기에서 원인이 **Out of Gas**인 것을 확인했다. 가스 한도를 조정해 다시 실행한 뒤 `consecutiveWins`가 1로 증가한 것도 확인했다. 다만 10연승과 Ethernaut 제출까지 완료했는지는 기록에서 확인되지 않아, 이 문제는 아직 완료로 적지 않는다.

이 과정에서 `blockhash(block.number - 1)`와 `2 ** 255`를 이용한 계산, 그리고 공격용 컨트랙트가 대상 컨트랙트의 함수를 호출하는 인터페이스 패턴을 배웠다.

## Telephone: `tx.origin`과 `msg.sender`

Telephone은 다음 조건으로 소유권 변경을 제한한다.

```solidity
if (tx.origin != msg.sender) {
    owner = _owner;
}
```

지갑이 Telephone을 직접 호출하면 두 값이 같다. 공격용 컨트랙트를 중간에 두면 Telephone이 보는 `msg.sender`는 그 컨트랙트가 되고, `tx.origin`은 처음 트랜잭션을 시작한 지갑으로 남는다. 이 차이 때문에 조건을 통과할 수 있다. 실제 소유자로 설정되는 주소는 공격용 컨트랙트가 아니라 함수 인자 `_owner`다.

`TelephoneAttack`은 Remix에서 컴파일하고 Sepolia에 배포했다. 하지만 `attack(address)` 트랜잭션은 실패했다. 당시에는 공격용 컨트랙트의 `target()` 주소와 Ethernaut의 현재 인스턴스 주소가 일치하는지 확인하지 못했다. 따라서 원인을 단정하지 않고, 다음에는 주소 비교와 실패 트랜잭션 영수증·디버거 확인부터 이어가기로 했다.

## 오늘 배운 것과 다음 단계

- Solidity의 `mapping`은 주소별 상태를 저장하며 지갑 잔액과는 별개다.
- `receive()`는 데이터 없이 ETH를 보낼 때 실행될 수 있다.
- Solidity 0.6의 `constructor()`와 이름만 비슷한 일반 함수는 다르다.
- `msg.sender`는 현재 컨트랙트를 직접 호출한 주소이고, `tx.origin`은 트랜잭션을 처음 시작한 주소다.
- 트랜잭션 실패는 가스 부족이라고 추측하지 말고 영수증과 디버거로 확인해야 한다.
- Ethernaut 콘솔의 래퍼 객체와 Web3.js 컨트랙트 객체는 호출 방식이 다를 수 있다.

확인된 클리어는 Fallout이다. Coin Flip은 연속 성공 1회를 확인했지만 최종 제출 여부는 미확인이고, Telephone은 공격 트랜잭션 실패 원인을 찾는 중이다. 다음에는 Sepolia Faucet 보상 청구 여부도 확인하고 Telephone 디버깅을 이어갈 예정이다.
