/* eslint-disable no-console */
import create from '../create';

export const DataName='tagPage'
type TagPageState = {
  pageSize: number
}
const initialState: TagPageState = {
  pageSize: 5,
}
const extraActions = (set,get) => ({
  // getState:()=>{
  //   // console.log(useStateStore.getItem(DataName))
  //   const storage = localStorage;
  //   const storedData = JSON.parse(storage.getItem(DataName))||{}
  //   return storedData?.value?.pageSize || 5;
  // },
  updateState: (state: TagPageState) => {

    return set({
      ...state,
      pageSize:state.pageSize})
  },
})
const useStateStore = create<TagPageState, ReturnType<typeof extraActions>>(
  initialState,
  extraActions,
  DataName
)

export default useStateStore;