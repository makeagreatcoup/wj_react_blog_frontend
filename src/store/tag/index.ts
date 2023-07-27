/* eslint-disable no-console */
import create from '../create';

export const DataName='tagPage'
type TagPageState = {
  pageSize: number
  expire?: number
}
const initialState: TagPageState = {
  pageSize: 5,
}
const extraActions = (set,get) => ({
  getState:()=>{
    const storage = localStorage;
    const storedData = JSON.parse(storage.getItem(DataName))||{}
    return storedData?.value?.pageSize || 5;
  },
  updateState: (state: TagPageState) => {
    const storage = localStorage;
    // 计算过期时间戳
    const expireInHour = 24; 
    // const expire = state.expire||Date.now() + expireInHour * 60 * 60 * 1000;
    const expire = state.expire?state.expire:undefined
    // 先从本地存储获取原有数据
    const storedData = JSON.parse(storage.getItem(DataName))||{}
    // 合并原有的 value 而不是直接覆盖
    const newData = {
      ...storedData,
      value: {
        ...(storedData.value||{}),
        ...state
      },
      expire  
    }
    // 将数据和过期时间存入本地存储
    storage.setItem(DataName, JSON.stringify(newData));
    return set(state)
  },
})
const useStateStore = create<TagPageState, ReturnType<typeof extraActions>>(
  initialState,
  extraActions,
  DataName
)

export default useStateStore;