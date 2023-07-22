import _create from 'zustand';
import { persist } from 'zustand/middleware'

type Actions<T> ={
  [P in keyof T & string as `set${Capitalize<P>}`]:(value: T[P])=>void
}
const resetters: (() => void)[] = []

const create = <State,A=object>(initialState,extraActions?)=>{
  // const store=_create<State & Actions<State> & A>(
  //   (set,get)=>({
  //   ...initialState,
  //   ...Object.keys(initialState).reduce((total,key)=>{
  //     const functionName=`set${key[0].toUpperCase()}${key.slice(1)}`
  //     total[functionName] = (value:State[keyof State]) => set({...total, [key]: value })
  //     return total
  //   },{}),
  //   ...(extraActions?extraActions(set,get):{})
  // }))
  const store=_create<State & Actions<State> & A>(
    persist((
      (set,get)=>({
          ...initialState,
          ...Object.keys(initialState).reduce((total,key)=>{
            const functionName=`set${key[0].toUpperCase()}${key.slice(1)}`
            total[functionName] = (value:State[keyof State]) => set({...total, [key]: value })
            return total
          },{}),
          ...(extraActions?extraActions(set,get):{})
        })
    ),{
      name: 'root', 
      getStorage:()=>localStorage
  })
  )
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
export default create;