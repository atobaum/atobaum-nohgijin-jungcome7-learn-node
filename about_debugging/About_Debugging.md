# Debugging을 어떻게 할까?
VS Code에서 `F5` 또는 `Menu > Run > Start Debugging`을 누르면 디버깅을 할 수 있다.
## Breakpoints란
프로그램을 실행 시키면 프로그램을 쉴 새 없이 돌아간다. 디버깅을 하려면 중간에 환경이나 변수를 봐야하는데 이럴 때 breakpoint를 설정하고 디버거를 실행시키면 프로그램은 breakpoint에서 멈춘다. 또한 코드의 위치가 아니라 조건을 이용해 breakpoint를 만들 수도 있다.

## Watch사용법
디버깅을 할 때 특정 변수를 보고 싶거나 특정 expression이 변화하는 것을 보고싶을 때가 있다. 이를 watch라고 한다. VS Code에서 디버깅 패널에 `Watch` 탭의 `+` 버튼을 누르면 expression을 적을 수 있다.

## call stack 이란
- 함수들의 호출 스택 구조들을 볼 수 있음
- 현재 실행 중인 서브루틴에 관한 정보를 저장하는 스택 자료구조
- 주되게 사용하는 이유는 현재 실행 중인 서브루틴의 실행이 끝났을 때, 제어를 반환할 지점을 보관하기 위해서 사용

## stap over 란
- 현재 라인 실행 후 다음 라인으로 커서를 이동