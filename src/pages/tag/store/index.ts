/* eslint-disable no-console */
import create from '../../../store/create';

export const DataName='tagPage'
type StoreState = {
  pageSize: number
}
const initialState: StoreState = {
  pageSize: 10,
}
const extraActions = (set,get) => ({
  updateState: (state: StoreState) => {

    return set({
      ...state,
      pageSize:state.pageSize})
  },
})
const useStateStore = create<StoreState, ReturnType<typeof extraActions>>(
  initialState,
  extraActions,
  DataName
)

export default useStateStore;