import { createSlice } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// export interface CounterState {
//   value
// }

const initialState= {
  value: 0,
  username:"",
  user_id:"",
  useremail:""
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
    changeuserusername:(state,action)=>{
        state.username=action.payload
    },
    changeemail:(state,action)=>{
        state.useremail=action.payload
    },
    changeuserid:(state,action)=>{
        state.user_id=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount,changeuserusername,changeemail,changeuserid } = counterSlice.actions

export default counterSlice.reducer