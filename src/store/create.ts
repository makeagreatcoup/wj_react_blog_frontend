import { create } from 'zustand';
import {  createJSONStorage, persist } from 'zustand/middleware'

type Actions<T> ={
  [P in keyof T & string as `set${Capitalize<P>}`]:(value: T[P])=>void
}
const resetters: (() => void)[] = []

const _create = <State,A=object>(initialState,extraActions?,persistName?)=>{
  let store
  if(persistName){
    // 持久化
    store=create<State & Actions<State> & A>()(
      persist(
        (set,get)=>(
          {
            ...initialState,
            ...Object.keys(initialState).reduce((total,key)=>{
              const functionName=`set${key[0].toUpperCase()}${key.slice(1)}`
              total[functionName] = (value:State[keyof State]) => set({...total, [key]: value })
              return total
            },{}),
            ...(extraActions?extraActions(set,get):{})
          }
          )
      ,{
        name: persistName, 
        storage:createJSONStorage(()=>localStorage)
    })
    )
  }else{
    store=create<State & Actions<State> & A>(
      (set,get)=>({
      ...initialState,
      ...Object.keys(initialState).reduce((total,key)=>{
        const functionName=`set${key[0].toUpperCase()}${key.slice(1)}`
        total[functionName] = (value:State[keyof State]) => set({...total, [key]: value })
        return total
      },{}),
      ...(extraActions?extraActions(set,get):{})
    }))
  }

  resetters.push(() => {
    store.setState(initialState)
  })

  return store
}
export const resetAllStores = () => {
  for (const resetter of resetters) {
    resetter()
  }
}
export default _create;