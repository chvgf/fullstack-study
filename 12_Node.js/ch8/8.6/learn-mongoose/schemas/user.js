const mongoose = require('mongoose');

const { Schema } = mongoose;
const userSchema = new Schema({ // 스키마 정의: RDB의 테이블 처럼 정해진 데이터만 들어갈 수 있게 강제함
  // 필드 작성
  // _id 필드는 생략해도 기본적으로 ObjectId가 들어감
  name: { // 옵션에 따라 몽구스가 검사를 해줌
    type: String, // 자바스크립트 데이터 타입
    required: true, // 필수  required => 필수인지 아닌지
    unique: true, // 고유한 값이어야 함(인덱스로 쓰임)
  },
  age: {
    type: Number,
    required: true,
  },
  married: {
    type: Boolean,
    required: true,
  },
  comment: String, // 옵션이 type 밖에 없을 때는 간단하게 생략 가능
  createdAt: {
    type: Date,
    default: Date.now, // 기본값은 현재 시간으로
  }
});

// 몽구스는 자동으로 복수형으로 변경하고 소문자로 변환한 후 이들 데이터베이스 컬렉션 이름으로 사용
module.exports = mongoose.model('User', userSchema); // 'User'는 users 컬렉션으로 변환됨

// (정리)
// 몽구스를 이용하여 기능의 확장 및 재한을 둘 수 있음 => 마치 SQL RDB처럼 사용
// 몽고디비의 장점은 자유로운 확장성인데 스키마를 만든다?
// => JS로 DB를 다루고 싶지만 SQL처럼 쓰고 싶어서
// => 일반적인(대중적인) 서비스들은 대부분의 데이터들이 구조를 갖고 있고 서로 간의 관계가 있음