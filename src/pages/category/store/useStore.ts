/* eslint-disable no-console */
import { tree } from '@/config/api/category';
import { create } from 'zustand';

type StoreState = {
  categoryData: any;
  fetchCategoryData: any;
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
const useCategoryStore = create<StoreState>(set => ({
  categoryData: [],
  fetchCategoryData: async () => {
    console.log('fetchCategoryData');
    await tree({}).then(rsp => {
      const data = rsp.data
      set({ categoryData:data.items });
    })
  } 
}))

export default useCategoryStore;