import { configureStore } from "redux";

/* 6. 스토어 만들기 */
const store = configureStore(reducer); // 상단에 import 필수

/* 7. store 내장 함수 사용 */
// 7-1) render 함수
const render = () => {
  const state = store.getState(); // 현재 상태 불러옴
  // 토글 처리
  if (state.toggle) {
    divToggle.classList.add("active");
  } else {
    divToggle.classList.remove("active");
  }
  // 카운터 처리
  counter.innerText = state.counter;
};
// (+) reducer();는 직접 호출하지 않아도 됨!
// => Redux 스토어가 내부적으로 리듀서를 호출하기 때문
reducer();
store.subscribe(render); /* 8.상태 업데이트 시, render 함수 호출 */

/* 9.액션 발생시키기 */
divToggle.onclick = () => {
  store.dispatch(toggleSwitch());
};
btnIncrease.onclick = () => {
  store.dispatch(increase(1));
};
btnDecrease.onclick = () => {
  store.dispatch(decrease());
};

// 7-2) subscribe 함수
const listener = () => {
  console.log("상태가 업데이트됨");
};
const unsubscribe = store.subscribe(listener);

unsubscribe(); // 추후 구독을 비활성화할 때 함수를 호출

/* 1. DOM 레퍼런스 만들기 */
const divToggle = document.querySelector(".toggle");
const counter = document.querySelector("h1");
const btnIncrease = document.querySelector("#increase");
const btnDecrease = document.querySelector("#decrease");

/* 2. 액션 이름 정의 */
const TOGGLE_SWITCH = "TOGGLE_SWITCH";
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";

/* 3. 액션 생성 함수 */
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = (difference) => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });

/* 4, 초깃값 설정 */
const initialState = {
  toggle: false,
  counter: 0,
};

/* 5. 리듀서 함수 정의 */
// 리듀서 함수 맨 처음 호출 시 state가 undefined임.
// undefined일 때 => initialState를 기본값으로 사용
function reducer(state = initialState, action) {
  // action.type에 따라 다른 작업을 처리
  switch (action.type) {
    case TOGGLE_SWITCH:
      return {
        ...state, // 상태의 불변성은 유지하되 데이터에 변화를 일으킴
        toggle: !state.toggle,
      };
    case INCREASE:
      return {
        ...state,
        counter: state.counter + action.difference,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };
    default:
      return state;
  }
}
