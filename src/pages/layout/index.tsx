import React, { Suspense } from 'react'
import { Layout } from '@douyinfe/semi-ui'
import Header from './components/header'
import Sider from './components/sider'
import Footer from './components/footer'
import { Outlet } from 'react-router-dom'
import SuspendFallbackLoading from '@/components/fallback-loading'

import './index.scss'

const { Content } = Layout

const Index: React.FC = () => {
	return (
		<Layout className="layout-page">
			<Sider />
			<Layout style={{overflow:'hidden'}}>
				<Header />
				<Content className="layout-content" style={{overflow:'auto'}}>
					<Suspense fallback={<SuspendFallbackLoading message="正在加载中" />}>
						<Outlet />
					</Suspense>
				</Content>
				<Footer />
			</Layout>
		</Layout>
	)
}

export default Index
