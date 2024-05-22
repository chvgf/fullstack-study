import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  //
  //
  //
  // test
  function updateClock() {
    const clockElement = document.getElementById("clock");
    if (!clockElement) return;

    const now: any = new Date();
    const hours: string = String(now.getHours()).padStart(2, "0");
    const minutes: string = String(now.getMinutes()).padStart(2, "0");
    const seconds: string = String(now.getSeconds()).padStart(2, "0");

    clockElement.textContent = `${hours}:${minutes}:${seconds}`;
  }

  // 매초마다 updateClock 함수를 호출
  setInterval(updateClock, 1000);

  // 초기 시계 상태 업데이트
  updateClock();
  // test
  //
  //
  //

  // 01_1
  const add1 = (a: number, b: number) => {
    console.log(a + b);
  };
  add1(1, 2);
  // add(2, 3, 4);
  // add("hellow", 1);

  // 01_2
  const showItem = (arr: number[]) => {
    arr.forEach((item) => {
      console.log(item);
    });
  };
  // showItem(1, 2, 3);
  showItem([1, 2, 3]);

  // 02_1
  // ts 기본타입덜
  let car: string = "grandeur";
  let age: number = 30;
  let isAdult: boolean = true;

  let numArr: number[] = [1, 2, 3];
  let numArr2: Array<number> = [1, 2, 3];
  let strArr: string[] = ["a", "b", "c"];
  let srtArr2: Array<string> = ["a", "b", "c"];

  let nu: null = null;
  let un: undefined = undefined;

  // 02_2
  let b: [string, number];
  b = ["z", 1];
  // b = [1 ,'z'] 이건안됨
  // b[0].toLocaleLowerCase() 메소드들 확인

  // 02_3
  enum Os {
    Window = 3,
    Ios = 10,
    Android,
  }
  console.log(Os); /* Os 객체 */
  console.log(Os[3]); /* window */
  console.log(Os.Window); /* 3 */

  let myOs: Os;
  myOs = Os.Window;

  // 03_1
  interface Junwoo {
    name: string;
    age: number;
    isAdult: boolean;
    car?: string /* 옵셔널 체이닝 있 없 */;
    readonly id: number; // 읽기 전용 속성
  }
  const 준우짠: Junwoo = {
    name: "준우짠",
    age: 30,
    isAdult: true,
    // car: "IG",
    id: 969696,
  };
  console.log(준우짠.name);

  /* 함수타입 */
  interface Add {
    (num1: number, num2: number, str1: number): number;
  }
  const add: Add = function (x, y, z) {
    return x + y + z;
  };
  add(1, 2, 3);

  interface IsAdult {
    (age: number): boolean;
  }
  const a: IsAdult = (age) => {
    return age > 19;
  };
  a(10);

  // 꽁꽁얼어붙은 한강 위로 고양이가 걸어다닙니 도 도 도~~~ 배고프다

  interface Box<T> {
    contents: T;
  }

  const stringBox: Box<string> = { contents: "Hello, World" };
  const numberBox: Box<number> = { contents: 42 };

  console.log(stringBox.contents); // "Hello, World"
  console.log(numberBox.contents); // 42

  interface Shape {
    color: string;
    area(): number;
  }

  class Circle implements Shape {
    constructor(public radius: number, public color: string) {}

    area(): number {
      return Math.PI * this.radius ** 2;
    }
  }

  const circle = new Circle(5, "red");
  console.log(circle.color); // "red"
  console.log(circle.area()); // 78.53981633974483
  return (
    <div>
      준우짠짠짜라라란
      <div id="clock" className="clock"></div>
    </div>
  );
}
export default App;
