import { tree } from '@/config/api/category';
import { create } from 'zustand';

type StoreState = {
  categoryData: any;
  fetchCategoryData: any;
}

const useCategoryStore = create<StoreState>(set => ({
  categoryData: [],
  fetchCategoryData: async () => {
    await tree({}).then(rsp => {
      const data = rsp.data
      set({ categoryData:data.items });
    })
  } 
}))

export default useCategoryStore;