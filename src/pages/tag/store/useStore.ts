/* eslint-disable no-console */
import { searchList } from '@/config/api/tag';
import { create } from 'zustand';

type StoreState = {
  tagData: [];
  fetchTagData: any;
}
// const initialState: StoreState = {
//   items: [],
// }
// const extraActions = (set,get) => ({
//   items:[],
//   fetchState: async() => {
//     await tree({})
// 		.then((rsp) => {
//       console.log(rsp)
// 			const { items} = rsp.data
// 		})
//     return set({items})
//   },
// })
const useTagStore = create<StoreState>(set => ({
  tagData: [],
  fetchTagData: async () => {
    console.log('fetchTagData')
    await searchList().then(rsp => {
      const data = rsp.data
      set({ tagData:data.items });
    })
  } 
}))

export default useTagStore;