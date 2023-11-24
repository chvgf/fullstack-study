# npm
노드 패키지 매니저

## --save 옵션은 package.json의 dependency 항목에 모듈을 추가한다는 의미
npm5 버전부터는 --save 옵션을 기본 옵션으로 적용됨
즉, --save를 사용하지 않아도 dependencies에 항목을 추가
--save 옵션은 더이상 쓰지 않아도 기본으로 사용되는 기능으로 생략 가능

## 옵션을 통해 dependency에 어떻게 저장할 것인지 알아봅시다.
(1) -P or --save-prod : package.json의 dependencies에 패키지를 등록합니다.(default)
(2) -D or --save-dev : package.json의 devDepndencies에 패키지를 등록합니다.
(3) -O or --save-optional : package.json의 optionalDependencies에 패키지를 등록합니다.
(4) --no-save : dependencies에 패키지를 등록하지 않습니다

### dependencies
어플리케이션을 배포할 때 사용할 라이브러리들이 담겨있는 곳

### devdependencies
어플리케이션을 개발할 때 테스트용으로 사용할 수는 있지만 배포할때는 필요없는 라이브러리들이 담겨있는 곳

## 글로벌(전역) 설치
npm install --global 패키지명 또는 npm i -g 패키지명
장점: 모든 프로젝트와 콘솔에서 패키지를 사용 가능
단점: 
1) 한번 설치된 버전으로 계속 사용
2) 설치된 버전 및 업데이트 확인이 어려움
3) 글로벌 업데이트 시 기존 프로젝트에 영향
4) CRA처럼 변경사항이 잦은 경우 불편

## npx(Node Package eXecute)
Run a command from a local or remote npm package
npx도 모듈의 일종
패키지를 로컬에 저장하지 않고 매번 최신 버전을 임시로 불러와 실행 시킨 후에 다시 그 파일은 없어지는 방식
명령어로 쓰는 애들은 npx로 사용하면 좋음(예: CRA)
(참고) 실행순서: 로컬 -> 글로벌 -> 존재하지 않으면 NPM(npmjs.com) 리모트에서 최신 버전을 받아와 실행

# yarn 소개
실무에서 리액트 프로젝트를 할 때 yarn을 많이 사용
페북에서 만든 패키지 매니저
npm과 가장 큰 차이는 성능!

## npm VS yarn
npm은 여러 패키지를 설치할 경우 패키지가 완전히 설치될 때까지 기다렸다가 다른 패키지로 이동한다.  
yarn은 이 작업들을 병렬로 설치하기 때문에 성능과 속도가 향상된다는 장점이 있다.

(주의) npm과 yarn은 lock파일이 다름
npm: package-lock.json
yarn: yarn.lock
github에서 새롭게 클론 받았을때 node_modules가 없는 상황 또는 다른 팀원이 새로운 패키지 설치 시
npm install 또는 yarn을 해줘야 프로젝트에 필요한 패키지가 설치됨

### 명령어 차이
npm: npm install styled-components
yarn: yarn add styled-components

참고 자료:
https://velog.io/@nxnaxx/React-%EA%B0%9C%EB%B0%9C-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%B6%95-yarn%EA%B3%BC-CRA-%EC%84%A4%EC%B9%98
