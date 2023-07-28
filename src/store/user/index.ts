/* eslint-disable no-console */
import React from 'react'
import create from '../create';

export const loginDataName='loginData'
type LoginState = {
  logged: boolean
  token: string,
}
const initialState: LoginState = {
  logged: false,
  token: '',
}
const extraActions = set => ({
  updateState: (state: LoginState) => {
    return set({
      ...state,
      logged:state.logged,
      token:state.token
    })
  },
})
const userStateStore = create<LoginState, ReturnType<typeof extraActions>>(
  initialState,
  extraActions,
  loginDataName
)

export default userStateStore;