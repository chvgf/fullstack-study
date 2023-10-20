import { useState } from "react";

const students = [
  {
    id: '1',
    name: '천준우',
    email: 'chvgf@naver.com'
  },
  {
    id: '2',
    name: '유재석',
    email: 'you@example.com'
  },
  {
    id: '3',
    name: '이이경',
    email: '22kyung@example.com'
  },
  {
    id: '4',
    name: '이미주',
    email: 'joo@example.com'
  }
];

// 출석부 컴포넌트
function AttendanceBook() {
  console.log(students);
  

  return (
    <ul>
      {/* Quiz: 배열을 반복 랜더링 해보기 */}
      {students.map((a, index) => <li key={a.id}> {a.name} {a.email} </li>)}
    </ul>
  );
}

export default AttendanceBook;