/* eslint-disable no-console */
import { useState, useCallback } from 'react';
import { debounce } from 'lodash'; 

/**
 * 防抖hook
 * @param fetchFunc 防抖请求函数
 * @param delay 
 * @returns 
 */
export function useDebounceFetch(fetchFunc, delay = 100) {

  const debouncedFetch = useCallback(
    (...args) =>
      new Promise((resolve, reject) => {
        const debounced = debounce(async () => {
          try {
            const result = await fetchFunc(...args);
            resolve(result);
          } catch (error) {
            reject(error);
          } finally {
          }
        }, delay);

        debounced();
      }),
    [fetchFunc, delay]
  );

  return debouncedFetch;

}