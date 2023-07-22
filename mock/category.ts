/* eslint-disable no-console */
import { MockMethod } from 'vite-plugin-mock'
export default [
	{
		url: '/api/categories/list',
		method: 'post',
		timeout: 1000,
		response: () => {
			return {
				code: 200,
				data: [
					{
						key: 1,
						name: '分类1',
						depth: 0,
						customOrder: 0,
						parent:'',
						deleteAt: null,
						children: [
							{
								name: '分类1-1',
								depth: 1,
								parent:'1',
								customOrder: 0,
								deleteAt: null
							},
							{
								name: '分类1-2',
								depth: 1,
								customOrder: 0,
								deleteAt: null
							}
						]
					},
					{
						key: 2,
						name: '分类2',
						depth: 0,
						customOrder: 0,
						deleteAt: null,
						children: [
							{
								key: 21,
								name: '分类2-1',
								depth: 0,
								parent:'2',
								customOrder: 0,
								deleteAt: null
							},
							{
								key: 22,
								name: '分类2-2',
								depth: 0,
								parent:'2',
								customOrder: 0,
								deleteAt: null
							}
						]
					}
				]
			}
		}
	},
	{
		url: '/api/categories/create',
		method: 'post',
		timeout: 1000,
		response: ()=>{
			return {
				code: 200,
				data: {
					username: 'xieyezi'
				}
			}
		}
	}
] as MockMethod[]

// const Mock = require('mockjs');
// const categoryMockData = Mock.mock({
//   'id|+1': 1,
//   name: '@ctitle(3, 8)',
//   customOrder: '@integer(0, 100)',
//   posts: [
//     {
//       id: '@integer(1, 10)',
//       // Include relevant fields from the PostEntity here
//     },
//     {
//       id: '@integer(1, 10)',
//       // Include relevant fields from the PostEntity here
//     },
//   ],
//   depth: 0,
//   parent: {
//     id: '@integer(1, 10)',
//     name: '@ctitle(3, 8)',
//     // Include relevant fields from the CategoryEntity here
//   },
//   children: [
//     {
//       id: '@integer(1, 10)',
//       name: '@ctitle(3, 8)',
//       // Include relevant fields from the CategoryEntity here
//     },
//     {
//       id: '@integer(1, 10)',
//       name: '@ctitle(3, 8)',
//       // Include relevant fields from the CategoryEntity here
//     },
//   ],
//   deleteAt: '@datetime',
// });

// console.log(categoryMockData);