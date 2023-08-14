/* eslint-disable no-console */
import React from 'react'
import create from '../create';

export const loginDataName='loginData'
type LoginState = {
  logged: boolean
  token: string,
  user:any
}
const initialState: LoginState = {
  logged: false,
  token: '',
  user:{}
}
const extraActions = set => ({
  updateState: (state: LoginState) => {
    return set({
      ...state,
      logged:state.logged,
      token:state.token,
      user:state.user
    })
  },
  resetState:()=>{
    return set({
      logged:false,
      token:'',
      user:{}
    })
  }
})
const userStateStore = create<LoginState, ReturnType<typeof extraActions>>(
  initialState,
  extraActions,
  loginDataName
)

export default userStateStore;