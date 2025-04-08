# 🌿 Baekjoon Grass Check
`solved.ac `API를 사용하여 참가자들이 정해진 기간 동안 얼마나 문제를 풀었는지 확인하고, 그 결과를 바탕으로 추첨을 진행하는 프로그램입니다.

## 📁 디렉토리 구조

src/ : 소스코드가 위치하는 디렉토리 입니다.

- config/participants.ts: 추첨에 참여할 유저 목록을 설정하는 파일입니다.
- config/gradients.ts: 텍스트 색상을 정의하는 파일입니다.
- config/config.ts: 가중치 함수와 시작과 끝 날을 설정하는 파일입니다.

## 🛠️ 사용 방법

1. 프로젝트 의존성 설치
`npm install`
2. 참여자 설정
참가자 명단을 설정하기 위해 아래 파일을 수정합니다:
`/src/config/participants.ts`

```export const participants = [
  "user1",
  "user2",
  "user3",
  // 여기에 유저 이름을 추가합니다.
];
```
3. 프로그램 실행
`npx ts-node src/main.ts`

## ⚠️ 주의사항 (중요)

> 참가자 중 스트릭 표시를 난이도로 해놓은 참가자가 있으면 정상적으로 작동하지 않습니다!

## 기여

이 프로젝트는 누구나 자유롭게 기여할 수 있습니다. 🤭

## 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.
