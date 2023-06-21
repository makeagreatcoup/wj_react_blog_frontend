import {
	IconHome,
	IconEdit,
	IconGridRectangle,
	IconApps,
	IconTickCircle,
	IconAlertTriangle,
	IconUser
} from '@douyinfe/semi-icons'

export interface MenuItem {
	itemKey: string
	text: string
	icon?: React.ReactNode
	path?: string
	items?: MenuItem[]
	component?: React.ComponentType<any>
}

const MENU_CONFIG: MenuItem[] = [
	{
		itemKey: '1',
		text: 'app.menu.dashboard',
		icon: IconHome,
		items: [
			{
				itemKey: '1-1',
				text: 'app.menu.dashboard.workbeach',
				path: '/dashboard/workbeach'
			},
			{
				itemKey: '1-2',
				text: 'app.menu.dashboard.anlyanis',
				path: '/dashboard/anlyanis'
			},
			{
				itemKey: '1-3',
				text: 'app.menu.dashboard.monitor',
				path: '/dashboard/monitor'
			}
		]
	},
	{
		itemKey: '2',
		text: 'app.menu.blog',
		icon: IconEdit,
		items: [
			{
				itemKey: '2-1',
				text: 'app.menu.blog.article',
				path: '/blog/article'
			},
			{
				itemKey: '2-2',
				text: 'app.menu.blog.project',
				path: '/blog/project'
			}
		]
	},
	{
		itemKey: '3',
		text: 'app.menu.comment',
		icon: IconGridRectangle,
		items: [
			{
				itemKey: '3-1',
				text: 'app.menu.comment.article',
				path: '/comment/article'
			},
			{
				itemKey: '3-2',
				text: 'app.menu.comment.project',
				path: '/comment/project'
			},
		]
	},
	{
		itemKey: '4',
		text: 'app.menu.category',
		icon: IconApps,
		items: [
			{
				itemKey: '4-1',
				text: 'app.menu.category.list',
				path: '/category/list'
			},

		]
	},
	{
		itemKey: '5',
		text: 'app.user',
		icon: IconUser,
		items: [
			{
				itemKey: '5-1',
				text: 'app.user.center',
				path: '/user/center'
			},
			{
				itemKey: '5-2',
				text: 'app.user.settings',
				path: '/user/settings'
			}
		]
	}
]

export default MENU_CONFIG
