import React from 'react'
import create from '../create';

type LoginState = {
  logged: boolean
  token: string
}
const initialState: LoginState = {
  logged: false,
  token: ''
}
const extraActions = set => ({
  updateLoginState: (state: LoginState) => set(state),
})
const userStateStore = create<LoginState, ReturnType<typeof extraActions>>(
  initialState,
  extraActions
)

export default userStateStore;