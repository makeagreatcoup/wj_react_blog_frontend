/* eslint-disable no-console */
import { useState, useCallback, useMemo } from 'react';
import { debounce } from 'lodash'; 

/**
 * 构造下拉框option
 * @param fetchFunc 
 * @param delay 
 * @returns 
 */
export function useDropdown(items,label) {
		if (!items.length) return []
		return items.map((item, index) => {
			return {
				value: item.id,
				label: item[label]?item[label]:'',
				otherKey: index,
				key:item.id,
				color:item.color
			}
		})
}