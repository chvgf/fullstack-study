// crypto 모듈: 암호화를 도와주는 모듈
// 단방향 암호화: 암호화는 가능하지만 복호화는 거의 불가능
const crypto = require('crypto');

// 비밀번호를 서버(DB)에 그대로 저장하는 건 위험
// 암호화해서 저장하는게 좋음 => 그래야 DB가 털려도 원래 비번을 알 수 없음
// 정확히는 해시 기법: 문자열을 고정된 길이의 다른 문자열로 변환하는 것
// 다양한 해시 알고리즘: md5, sha1, sha256, sha512, sha3, pbkdf2, bcrypt, scrypt 등..
console.log('base64:', crypto.createHash('sha512').update('암호화할 비밀번호').digest('base64'));
console.log('hex:', crypto.createHash('sha512').update('암호화할 비밀번호').digest('hex'));

// Q: 비밀번호를 해시화(해싱)해서 저장했는데 다시 원래 비밀번호로 못 돌리면 어떻게 로그인하는지?
// A: 해시와 됐을 때 항상 같은 결과를 보장, 서버에서는 해시화 된 결과끼리 비교