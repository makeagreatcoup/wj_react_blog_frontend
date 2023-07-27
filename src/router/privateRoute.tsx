import React, { FC } from 'react'
import { Navigate } from 'react-router-dom'
import { RouteProps, useLocation } from 'react-router'
import Empty from '@/components/empty'
import useStore from '@/store/user'

const PrivateRoute: FC<RouteProps> = (props) => {
	const location = useLocation()
	const { pathname } = location
	const logged = useStore((state) => state.logged)

	return logged ? (
		pathname === '/' ? (
			<Navigate to={{ pathname: `/dashboard/workbeach` }} replace />
		) : (
			props.element
		)
	) : (
		<Empty title="没有权限" description="您还没有登录，请先去登录" type="403" />
	)
}
  
export default PrivateRoute
