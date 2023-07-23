import React, { lazy, FC, ComponentType, Suspense, useEffect } from 'react'
import { RouteObject } from 'react-router'
import { useRoutes } from 'react-router-dom'
import { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent } from './config'
import LoginPage from '@/pages/login'
import LayoutPage from '@/pages/layout'
import Empty from '@/components/empty'
import userStateStore, { loginDataName } from '@/store/user'

const DashboardWorkbeach = lazy(() => import('@/pages/dashboard/workbeach'))
const DashboardAnlyanis = lazy(() => import('@/pages/dashboard/anlyanis'))
const DashboardMonitor = lazy(() => import('@/pages/dashboard/monitor'))

const FormBasic = lazy(() => import('@/pages/form/basic'))
const FormStep = lazy(() => import('@/pages/form/step'))
const FormAdvanced = lazy(() => import('@/pages/form/advanced'))

const ListSearch = lazy(() => import('@/pages/list/search'))
const ListInquire = lazy(() => import('@/pages/list/inquire'))
const ListStandard = lazy(() => import('@/pages/list/standard'))
const ListCard = lazy(() => import('@/pages/list/card'))

const DetailBasic = lazy(() => import('@/pages/detail/basic'))
const DetailAdvanced = lazy(() => import('@/pages/detail/advanced'))

const ResultSuccess = lazy(() => import('@/pages/result/success'))
const ResultFailed = lazy(() => import('@/pages/result/failed'))
const ResultApply = lazy(()=>import('@/pages/result/apply'))

const Abnormal403 = lazy(() => import('@/pages/abnormal/403'))
const Abnormal404 = lazy(() => import('@/pages/abnormal/404'))
const Abnormal500 = lazy(() => import('@/pages/abnormal/500'))

const UserCenter = lazy(() => import('@/pages/user/center'))
const UserSettings = lazy(() => import('@/pages/user/settings'))

const routeList: RouteObject[] = [
	{
		path: '/',
		element: <WrapperRouteComponent element={<LayoutPage />} titleId="" auth />,
		children: [
			{
				path: 'dashboard/workbeach',
				element: <WrapperRouteComponent element={<DashboardWorkbeach />} titleId="工作台" auth />
			},
			{
				path: 'dashboard/anlyanis',
				element: <WrapperRouteComponent element={<DashboardAnlyanis />} titleId="分析页" auth />
			},
			{
				path: 'dashboard/monitor',
				element: <WrapperRouteComponent element={<DashboardMonitor />} titleId="监控页" auth />
			},
			{
				path: 'blog/list',
				element: <WrapperRouteComponent component={lazy(() => import('@/pages/blog/list'))} titleId="文章列表" auth />

			},
			{
				path: 'blog/add',
				element: <WrapperRouteComponent component={lazy(() => import('@/pages/blog/add'))} titleId="发布新文章" auth />
			},
			{
				path: 'blog/update',
				element: <WrapperRouteComponent component={lazy(() => import('@/pages/blog/update'))} titleId="修改文章" auth />
			},
			{
				path: 'project/list',
				element: <WrapperRouteComponent component={lazy(() => import('@/pages/project/list'))} titleId="项目列表" auth />
			},
			{
				path: 'comment/article',
				element: <WrapperRouteComponent component={lazy(() => import('@/pages/comment/article'))} titleId="文章评论" auth />

			},
			{
				path: 'comment/project',
				element: <WrapperRouteComponent component={lazy(() => import('@/pages/comment/project'))} titleId="项目评论" auth />
			},
			{
				path: 'category/list',
				element: <WrapperRouteComponent component={lazy(() => import('@/pages/category/list'))} titleId="分类管理" auth />

			},
			{
				path: 'tag/list',
				element: <WrapperRouteComponent component={lazy(() => import('@/pages/tag/list'))} titleId="标签管理" auth />

			},

			{
				path: 'form/basic',
				element: <WrapperRouteComponent element={<FormBasic />} titleId="基础表单页" auth />
			},
			{
				path: 'form/step',
				element: <WrapperRouteComponent element={<FormStep />} titleId="分步表单页" auth />
			},
			{
				path: 'form/advanced',
				element: <WrapperRouteComponent element={<FormAdvanced />} titleId="高级表单页" auth />
			},
			{
				path: 'list/search',
				element: <WrapperRouteComponent element={<ListSearch />} titleId="搜索列表页" auth />
			},
			{
				path: 'list/inquire',
				element: <WrapperRouteComponent element={<ListInquire />} titleId="查询表格页" auth />
			},
			{
				path: 'list/standard',
				element: <WrapperRouteComponent element={<ListStandard />} titleId="标准列表页" auth />
			},
			{
				path: 'list/card',
				element: <WrapperRouteComponent element={<ListCard />} titleId="卡片列表页" auth />
			},
			{
				path: 'detail/basic',
				element: <WrapperRouteComponent element={<DetailBasic />} titleId="基础详情页" auth />
			},
			{
				path: 'detail/advanced',
				element: <WrapperRouteComponent element={<DetailAdvanced />} titleId="高级详情页" auth />
			},
			{
				path: 'result/success',
				element: <WrapperRouteComponent element={<ResultSuccess />} titleId="结果成功页" auth />
			},
			{
				path: 'result/failed',
				element: <WrapperRouteComponent element={<ResultFailed />} titleId="结果失败页" auth />
			},
			{
				path: 'result/apply',
				element: <WrapperRouteComponent element={<ResultApply />} titleId="结果允许页" auth />
			},
			{
				path: 'abnormal/403',
				element: <WrapperRouteComponent element={<Abnormal403 />} titleId="403" auth />
			},
			{
				path: 'abnormal/404',
				element: <WrapperRouteComponent element={<Abnormal404 />} titleId="404" auth />
			},
			{
				path: 'abnormal/500',
				element: <WrapperRouteComponent element={<Abnormal500 />} titleId="500" auth />
			},
			{
				path: 'user/center',
				element: <WrapperRouteComponent element={<UserCenter />} titleId="用户中心页" auth />
			},
			{
				path: 'user/settings',
				element: <WrapperRouteComponent element={<UserSettings />} titleId="用户设置页" auth />
			}
		]
	},
	{
		path: 'login',
		element: <WrapperRouteWithOutLayoutComponent element={<LoginPage />} titleId="登录" />
	},
	{
		path: '*',
		element: (
			<WrapperRouteWithOutLayoutComponent
				element={<Empty title="找不到咯" description="这里什么也没有~" type="404" />}
				titleId="404"
			/>
		)
	}
]

const RenderRouter: FC = () => {
	// 初始加载login登录数据，避免刷新时重置登录状态
	useEffect(() => {
		const data = localStorage.getItem(loginDataName);
		if (data) {
			userStateStore.setState(JSON.parse(data).value);
		} 
	}, []);
	const element = useRoutes(routeList)
	return element
}

export default RenderRouter
