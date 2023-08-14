/* eslint-disable no-console */
import { tree } from "@/config/api/category"
import { useDebounceFetch } from "@/hooks/useDebounce";
import { useCallback, useEffect, useMemo, useState } from "react"
import {useAsyncFunc} from '../../../hooks/useAsyncFunc'


export function useCategoryData() {
  const [data, setData] = useState([])
  const [total, setTotal] = useState(0)
  console.log('开始获取')
	const categoryFetch = async () => {
    console.log('准备获取')
    return await tree({})
		// .then((rsp) => {
    //   console.log('获取数据')
    //   console.log(rsp)
		// 	const { items} = rsp.data
		// 	setData(items)
		// 	setTotal(items.length || 0)
		// })
	}
  const { loading, value } = useAsyncFunc(categoryFetch, []);
  console.log(loading)
  console.log(value)
  		// 	setData(items)
		// 	setTotal(items.length || 0)
  const categoryData = useMemo(()=>{
    if(value){
      const { items} = value.data
      setData(items)
    }

    return data
  },[value])
  const categoryTotal = useMemo(()=>{
    if(value){
      const { items} = value.data
      setData(items.length)
    }
    return total
  },[total])
  useEffect(()=>{
    console.log('启动')
    categoryFetch()
  },[])
  return { categoryData, categoryTotal,categoryFetch} ;
}