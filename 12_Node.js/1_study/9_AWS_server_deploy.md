# AWS에 Node.js 서버 배포하기
node app.js 또는 nodemon app.js로 내 컴퓨터에서 서버를 운영할 수 있음
(http://IPv4주소:포트번호 치면 접속 가능)
내 컴퓨터를 24시간 켜둘 것이 아니므로 
안정적인 클라우드 서비스의 컴퓨터를 빌려서 서버 띄우기

서버를 배포(운영)하기 위한 여러 가지 서비스가 존재
EC2, Elastic Beanstalk, Lightsail, API Gateway + Lambda, ...

- EC2: 가장 유명하고 대표적인 서비스로 그냥 컴퓨터 한대를 빌리는 서비스
다양한 설정 및 필요한 서비스 연결을 직접 해야 하는 부분이 많음
설정이 복잡하고 문제가 생겼을 때 해결도 어려움
프리 티어 1년 무료(조건: t2.micro, 750시간/월)

- Elastic Beanstalk: 코드만 올리면 알아서 자동으로 EC2 인스턴스(=가상 컴퓨터) 빌려서
npm install 및 node app.js 로 서버 실행하고 무료 도메인도 하나 연결해줌
사용자가 많아지면 확장도 쉽게 가능하고 버전 관리도 해주고 서버 다운 시 자동 재시작도 해줌
코드 업로드만 잘하면 됨
단점은 설정이 조금 복잡하고 설정을 잘못하거나 문제가 생겼을 때 해결도 조금 어려움
프리 티어 1년 무료(조건: t2.micro, 750시간/월)

- Lightsail: 컴퓨터 한대를 빌려서 간단하게 앱 배포가 가능한 서비스
EC2의 앱 배포용 베리 심플&이지 버전(기존 AWS 서비스가 너무 복잡하기에 탄생)
EC2에 비해 가격이 저렴하고 고정 가격 플랜이 있음(요금 폭탄 걱정이 덜함)
특히, DB와 storage까지 같이 구성하면 이득임
초기 인스턴스 설정의 거의 모든 것이라 할 정도로 아주 쉽고 UI가 직관적임
단점은 커스터마이징의 제약이 있음
인스턴스의 스펙이 마음에 안들어 스케일 업을 하고자 한다면 새로운 인스턴스를 생성해야 함
유동적으로 스펙을 조정할 수 없음(EC2는 사용량이 많아지면 알아서 스케일 업/다운)
프리 티어 상관없이 첫 세 달간 무료로 사용 가능(조건: 750시간/월)

## 배포전 체크
AWS 컴퓨터도 MongoDB에 접속해야 하니까
MongoDB Atlas 들어가서 Network access 메뉴에서
접속 가능 IP를 0.0.0.0/0으로 모든 IP에서 접속할 수 있게 설정

## Lightsail
1) Let's get started 또는 Create instance 버튼 누르기
2) 인스턴스 위치: 기본적으로 서울이 선택 - 리전은 여러분의 위치와 가까울수록 속도에 이점이 있음
3) 플랫폼: 리눅스/유닉스, 블루프린트: Node.js 선택
4) 인스턴스 계획: 월 $3.5 계획을 선택(월 $10 계획까지는 첫 세 달간 무료로 사용할 수 있음) 
세 달 뒤에 과금되지 않으려면 그 전에 인스턴스를 제거하면 됨
5) Create Instance 버튼을 눌러 인스턴스를 생성
(테스트) 인스턴스 화면에 나오는 퍼블릭 IP에 브라우저로 접근하면 Congratulations! 화면이 뜨는지 확인
기본적으로 비트나미(Bitnami) 서버가 실행되고 있는데, 이 서버를 종료하고 우리의 goniboard 서버를 띄울 예정

goniboard 서버를 이 인스턴스에 배포
6) 인스턴스 화면에서 Connect using SSH(SSH를 사용하여 연결) 버튼 누르기
이 SSH는 Lightsail 인스턴스와 연결되어 있습니다. 노드는 이미 설치되어 있으므로
7) git clone을 사용해 깃허브에 올렸던 소스 코드를 내려받기
~$ git clone https://github.com/geoblo/goniboard.git
8) Lightsail에서는 기본적으로 비트나미 아파치(Bitnami apache) 서버가 켜져 있음
노드 서버와 같이 쓸 수는 없으므로 아파치 서버를 종료하는 명령어를 입력
~$ cd /opt/bitnami
~$ sudo ./ctlscript.sh stop apache
9) 다시 goniboard 폴더로 이동해 .env 생성하기
실무에서는 .env를 깃허브에 올리면 안 되고 원래 Lightsail 서버 내에서 생성해야 함
~$ cd ~/goniboard
~$ sudo vim .env

(참고) vi/vim 명령어 정리
https://inpa.tistory.com/entry/LINUX-%F0%9F%93%9A-Vi-Vim-%EC%97%90%EB%94%94%ED%84%B0-%EB%8B%A4%EB%A3%A8%EA%B8%B0-%EB%AA%85%EB%A0%B9%EC%96%B4-%F0%9F%92%AF-%EC%A0%95%EB%A6%AC
10) npm 패키지를 설치하고 서버를 실행
~$ npm ci
~$ sudo npm i -g pm2
~$ sudo NODE_ENV=production PORT=80 pm2 start app.js -i 0
-i(instance): 멀티 프로세스 옵션, 0은 CPU 코어 개수만큼 프로세스를 생성한다는 뜻
프로세스 간에 메모리를 공유하지 못하므로 공유하는 것(세션 등)이 없도록 설계
공유해야하는 데이터가 있다면 데이터베이스를 사용해야 함 

(참고)
프로세스 종료
~$ sudo pm2 kill

서버 재시작
~$ sudo pm2 reload all

로그 확인 명령어 2가지
~$ sudo pm2 log
~$ sudo pm2 monit
11) 퍼블릭 IP를 확인한 뒤, http://퍼블릭IP로 접속
위 주소를 다른 기기에서도 입력 후 접속 테스트
이제 퍼블릭 IP만 알면 다른 사람들도 여러분의 서비스에 접속 가능

(참고1) 퍼블릭 IP 대신 goniboard.com과 같은 도메인을 사용하고 싶다면, 
도메인 판매처에서 도메인을 구입한 후 AWS의 Route 53 서비스에서 연결(물론 AWS에서 도메인도 판매함)
(참고2) https로 접속하기 위해서는 도메인 구입과 인증서 발급 같은 별도 설정이 필요
(참고3) 수정된 소스 코드 반영하기
추후 소스 코드를 수정해서 업데이트된 내용으로 배포하고 싶을 때는 git clone이 아니라 git pull 명령어를 이용
서버를 재시작하면 변경된 내용이 반영

# 마지막 주의 사항
실습을 마치고 나면 요금이 부과되는 일이 없도록
Elastic Beanstalk 환경 삭제, EC2 인스턴스 삭제, S3 버킷 삭제
Lightsail Delete 메뉴에서 인스턴스 삭제
무료로 배포할 수 있는 서비스를 원한다면 Heroku(heroku.com)나 OpenShift(openshift.com)를 찾아볼 것!