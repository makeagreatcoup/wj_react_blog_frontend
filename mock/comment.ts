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

// // 生成 CommentEntity 的 Mock 数据
// const commentMockData = Mock.mock({
//   'body': '@cparagraph',
//   'depth': 0,
//   'post': {
//     'id|+1': 1,
//     // Include relevant fields from the PostEntity here
//   },
//   'customer': {
//     'id|+1': 1,
//     'nickname': '@cname',
//     // Include relevant fields from the CustomerEntity here
//   },
//   'parent': null, // Set parent to null for now
//   'children': [],
// });

// console.log(commentMockData);