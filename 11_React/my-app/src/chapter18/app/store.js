import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import productReducer from "../features/productSlice";

// 1. Redux Store 만들기
// 전역 state를 보관하는 저장소
// configureStore를 Redux DevTools 설정이 자동으로 추가됨
// (Redux DevTools는 크롬 웹 스토어에서 따로 설치!)
export const store = configureStore({
  // 4. Redux Store에 Reducer 추가하기
  // 리듀서를 Store에 등록을 해야 컴포넌트들이 전역 state를 사용 가능
  reducer: {
    counter: counterReducer,
    product: productReducer
  }
});

// (참고)
// 한 개의 프로젝트는 단 하나의 스토어만 가질 수 있음
// Store 안에는 현재 전역 상태와 리듀서가 들어가 있음

// Redux Application Data Flow
// https://ko.redux.js.org/tutorials/essentials/part-1-overview-concepts#redux-application-data-flow
