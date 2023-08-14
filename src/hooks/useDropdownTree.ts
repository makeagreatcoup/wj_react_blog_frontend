/* eslint-disable no-console */
import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash'; 

/**
 * 构造树形结构的表格
 * @param fetchFunc 
 * @param delay 
 * @returns 
 */
export function useDropdownTree(data,label?) {
	const dropdownData = useMemo(() => {
		const next = (items, level) => {
			return items.map((item) => {
				let labelItem={}
				if(label){
					labelItem = {
						label: item[label]?item[label]:'',
						value: item.id,
					}
				}
				const baseItem={
					...item,
					depth: level,
					key: item.id,
					parent: item.parent?.id,
					children: item.children && item.children.length ? next(item.children, level + 1) : [],
				}
				return {
					...baseItem,
					...labelItem,
				}
			})
		}
		return next(data, 0)
	}, [data])
  return dropdownData;
}