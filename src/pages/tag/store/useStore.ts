/* eslint-disable no-console */
import { searchList } from '@/config/api/tag';
import { create } from 'zustand';

type StoreState = {
  tagData: [];
  fetchTagData: any;
}
const useTagStore = create<StoreState>(set => ({
  tagData: [],
  fetchTagData: async () => {
    await searchList().then(rsp => {
      const data = rsp.data
      set({ tagData:data.items });
    })
  } 
}))

export default useTagStore;