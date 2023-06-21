import React, { FC, Suspense } from 'react'
import { RouteProps } from 'react-router'
import PrivateRoute from './privateRoute'
import SuspendFallbackLoading from '@/components/fallback-loading'

export interface WrapperRouteProps extends RouteProps {
	/** document title id */
	titleId: string
	/** authorization？ */
	auth?: boolean
	// 加入函数式组件
	component?:React.ComponentType<any>;
}

const PublicRoute = (props) => {
	return props.element
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({ element,titleId, auth,component:Component ,...props }) => {
	const WitchRoute = auth ? PrivateRoute : PublicRoute
	if (titleId) {
		document.title = titleId
	}
	
	// 加入Component
	const routeElement = element || (
    <Component {...props} />
  );
  return <WitchRoute element={routeElement} />;
}

const WrapperRouteWithOutLayoutComponent: FC<WrapperRouteProps> = ({ titleId, auth, ...props }) => {
	if (titleId) {
		document.title = titleId
	}

	return <Suspense fallback={<SuspendFallbackLoading message="正在加载中" />}>{props.element}</Suspense>
}

export { WrapperRouteComponent, WrapperRouteWithOutLayoutComponent }
