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
				itemKey: '2-2',
				text: 'app.menu.blog.add',
				path: '/blog/add'
			},
			{
				itemKey: '2-1',
				text: 'app.menu.blog.list',
				path: '/blog/list'
			},

		]
	},
	{
		itemKey: '3',
		text: 'app.menu.project',
		icon: IconEdit,
		items: [
			{
				itemKey: '3-1',
				text: 'app.menu.project.list',
				path: '/project/list'
			}
		]
	},
	{
		itemKey: '4',
		text: 'app.menu.comment',
		icon: IconGridRectangle,
		items: [
			{
				itemKey: '4-1',
				text: 'app.menu.comment.article',
				path: '/comment/article'
			},
			{
				itemKey: '4-2',
				text: 'app.menu.comment.project',
				path: '/comment/project'
			},
		]
	},
	{
		itemKey: '5',
		text: 'app.menu.category',
		icon: IconApps,
		items: [
			{
				itemKey: '5-1',
				text: 'app.menu.category.list',
				path: '/category/list'
			},

		]
	},
	{
		itemKey: '6',
		text: 'app.menu.tag',
		icon: IconApps,
		items: [
			{
				itemKey: '6-1',
				text: 'app.menu.tag.list',
				path: '/tag/list'
			},

		]
	},
	{
		itemKey: '7',
		text: 'app.user',
		icon: IconUser,
		items: [
			{
				itemKey: '7-1',
				text: 'app.user.center',
				path: '/user/center'
			},
			{
				itemKey: '7-2',
				text: 'app.user.settings',
				path: '/user/settings'
			}
		]
	}
]

export default MENU_CONFIG
