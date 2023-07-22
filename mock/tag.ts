/* eslint-disable no-console */
import { MockMethod } from 'vite-plugin-mock'
export default [
	{
		url: '/api/login',
		method: 'post',
		timeout: 1000,
		response: (payload: { username: string; password: string; role: string }) => {
			const { username, password } = payload
			return {
				code: 200,
				data: {
					username: 'admin',
					password: 'admin',
					role: 'admin',
					token: 'ASFSjskfhjsshjfhsajkfheuisbjsfjasfs'
				}
			}
		}
	},
	{
		url: '/api/logout',
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

// const tagMockData = Mock.mock({
//   'id|+1': 1,
//   title: '@ctitle(3, 5)',
//   summary: '@cparagraph(1)',
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
//   color: '@color',
//   state: '@pick(["ON", "OFF"])',
// });

// console.log(tagMockData);