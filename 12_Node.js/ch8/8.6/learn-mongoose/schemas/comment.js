const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;
const CommentSchema = new Schema({
  commenter: {
    // type: mongoose.Schema.Types.ObjectId, // 구조분해할당 안하면 이렇게
    type: ObjectId, // ObjectId는 몽고디비의 데이터 타입
    required: true,
    ref: 'User', // 어떤(users) 컬렉션의 ObjectId 인지 관계 설정 => JOIN 같은 기능을 사용할 수 있음
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // 기본값은 현재 시간으로
  }
});

// 몽구스는 자동으로 복수형으로 변경하고 소문자로 변환한 후 이들 데이터베이스 컬렉션 이름으로 사용
module.exports = mongoose.model('Comment', CommentSchema); // 'Comment'는 comments 컬렉션으로 변환됨

// (정리)
// 몽구스를 이용하여 기능의 확장 및 재한을 둘 수 있음 => 마치 SQL RDB처럼 사용
// 몽고디비의 장점은 자유로운 확장성인데 스키마를 만든다?
// => JS로 DB를 다루고 싶지만 SQL처럼 쓰고 싶어서
// => 일반적인(대중적인) 서비스들은 대부분의 데이터들이 구조를 갖고 있고 서로 간의 관계가 있음