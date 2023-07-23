import _create from 'zustand';
import { persist } from 'zustand/middleware'

type Actions<T> ={
  [P in keyof T & string as `set${Capitalize<P>}`]:(value: T[P])=>void
}
const resetters: (() => void)[] = []

const zustandStorage = localStorage; 

const getStorage=(persistName)=>{
  const storage = zustandStorage;
  const data = storage.getItem(persistName);
  if (data) {
    const { expire, value } = JSON.parse(data);
    const now = Date.now();
    if (expire && now >= expire) {
      // 已过期,不返回
      return undefined;
    } else {
      return value;
    }
  }
  return undefined
}

const create = <State,A=object>(initialState,extraActions?,persistName?)=>{
  let store
  if(persistName){
    // 持久化
    store=_create<State & Actions<State> & A>(
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
        name: persistName, 
        getStorage: getStorage(persistName),

    })
    )
  }else{
    store=_create<State & Actions<State> & A>(
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
export default create;