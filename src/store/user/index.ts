/* eslint-disable no-console */
import React from 'react'
import create from '../create';

export const loginDataName='loginData'
type LoginState = {
  logged: boolean
  token: string,
  expire?: number
}
const initialState: LoginState = {
  logged: false,
  token: '',
}
const extraActions = set => ({
  updateLoginState: (state: LoginState) => {
    const storage = localStorage;

    // 计算过期时间戳
    const expireInHour = 24; 
    const expire = state.expire||Date.now() + expireInHour * 60 * 60 * 1000;

    // 先从本地存储获取原有数据
    const storedData = JSON.parse(storage.getItem(loginDataName))

    // 合并原有的 value 而不是直接覆盖
    const newData = {
      ...storedData,
      value: {
        ...storedData.value,
      },
      expire  
    }
    // 将数据和过期时间存入本地存储
    storage.setItem(loginDataName, JSON.stringify(newData));
    console.log(storage)
    return set(state)
  },
})
const userStateStore = create<LoginState, ReturnType<typeof extraActions>>(
  initialState,
  extraActions,
  loginDataName
)

export default userStateStore;