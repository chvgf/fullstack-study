// 내장 모듈: Node.js에서 이미 모듈로 만들어 놓은 것을 편하게 가져와 사용, 가져올때는 require();
// os 모듈: 운영체제의 정보를 담고 있는 모듈
const os = require('os'); // 내장 모듈은 경로 대신 이름만 적어주면 됨(설치한 라이브러리를 가져와 쓸 때랑 동일)

console.log('운영체제 정보---------------------------------');
console.log('os.arch():', os.arch());
console.log('os.platform():', os.platform());
console.log('os.type():', os.type());
console.log('os.uptime():', os.uptime());
console.log('os.hostname():', os.hostname());
console.log('os.release():', os.release());

console.log('경로------------------------------------------');
console.log('os.homedir():', os.homedir());
console.log('os.tmpdir():', os.tmpdir());

console.log('cpu 정보--------------------------------------');
console.log('os.cpus():', os.cpus()); // 컴퓨터의 코어 정보
console.log('os.cpus().lengthh:',os.cpus().length); // 컴퓨터의 코어 개수만큼 서버를 띄우고 싶을 때 할용

console.log('메모리 정보-----------------------------------');
console.log('os.freemem():', os.freemem());
console.log('os.totalmem():', os.totalmem());