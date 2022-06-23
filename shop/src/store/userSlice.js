import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name : 'user',
  // initialState : 'kim',
  initialState : { name : 'kim', age : 20 },
  reducers : {
    changeName(state){ // parameter : 기존 state 뜻함
      // return 'john ' + state
      return { name : 'park', age : 20 }
      // state.name = 'park'
    },
    // increase(state){
    //   state.age += 1
    // },
    increase(state, action){
      state.age += action.payload
    },
  }
})

export let { changeName, increase } =  user.actions; //state 변경함수들 남음

export default user;