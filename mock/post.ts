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

// const postMockData = Mock.mock({
//   'id|+1': 1,
//   title: '@ctitle(5, 10)',
//   body: '@cparagraph(10, 20)',
//   summary: '@cparagraph(2, 4)',
//   cover: '@image("200x200", "#ccc", "#FFF", "Mock Cover")',
//   state: '@pick(["ON", "OFF"])',
//   keywords: ['@word', '@word', '@word'],
//   type: '@pick(["MD", "HTML"])',
//   publishedAt: '@datetime',
//   customOrder: '@integer(0, 100)',
//   category: {
//     id: '@integer(1, 10)',
//     name: '@ctitle(3, 8)',
//   },
//   tags: [
//     {
//       id: '@integer(1, 10)',
//       title: '@ctitle(3, 5)',
//       summary: '@cparagraph(1)',
//       color: '@color',
//       state: '@pick(["ON", "OFF"])',
//     },
//     {
//       id: '@integer(1, 10)',
//       title: '@ctitle(3, 5)',
//       summary: '@cparagraph(1)',
//       color: '@color',
//       state: '@pick(["ON", "OFF"])',
//     },
//   ],
//   comments: [
//     {
//       id: '@integer(1, 10)',
//       body: '@csentence(10, 20)',
//       depth: 0,
//       post: {
//         id: '@integer(1, 10)',
//         // Include relevant fields from the PostEntity here
//       },
//       customer: {
//         id: '@integer(1, 10)',
//         nickname: '@cname',
//         // Include relevant fields from the CustomerEntity here
//       },
//     },
//     {
//       id: '@integer(1, 10)',
//       body: '@csentence(10, 20)',
//       depth: 0,
//       post: {
//         id: '@integer(1, 10)',
//         // Include relevant fields from the PostEntity here
//       },
//       customer: {
//         id: '@integer(1, 10)',
//         nickname: '@cname',
//         // Include relevant fields from the CustomerEntity here
//       },
//     },
//   ],
//   commentCount: '@integer(0, 100)',
//   deleteAt: '@datetime',
// });

// console.log(postMockData);