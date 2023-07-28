/* eslint-disable no-console */
import React, { FC } from 'react'
import { Layout, Nav, Button, Avatar, Badge, Dropdown, RadioGroup, Radio } from '@douyinfe/semi-ui'
import { IconBell, IconHelpCircle } from '@douyinfe/semi-icons'
import Breadcrumb from '../breadcrumb'
import useStore from '@/store/common/global'
import Tags from '../tags'
import '../../index.scss'
import userStateStore from '@/store/user'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/config/api/user'

const { Header } = Layout

const Index: FC = () => {
	const locale = useStore((state) => state.locale)
	const {updateState} = userStateStore(state => state);
	const navigate = useNavigate();
	const changeLocale = useStore((state) => state.changeLocale)

	const selectLocale = (locale: 'zh_CN' | 'en_GB') => {
		changeLocale(locale)
		localStorage.setItem('semi_locale', locale)
	}

	const question = () => {
		window.open('https://github.com/xieyezi/semi-design-pro/issues')
	}
	const logoutClick = async(type) =>{
		console.log(type)
		if(type){
			console.log('退出本地')
			updateState({
				logged: false,
				token: '' 
			})
			navigate('/login', { replace: true })

		}else{
			console.log('退出登录')
			await logout().then(res=>{
				updateState({
					logged: false,
					token: '' 
				})
				navigate('/login', { replace: true })
			}).catch(err=>{
				console.log(err)
			});
		}




	}
	return (
		<Header className="layout-header">
			<Nav
				mode="horizontal"
				header={<Breadcrumb />}
				footer={
					<>
						<Button
							theme="borderless"
							icon={<IconHelpCircle size="large" />}
							style={{
								color: 'var(--semi-color-text-2)',
								marginRight: '12px'
							}}
							onClick={question}
						/>
						<Badge count={5} type="danger">
							<Button
								theme="borderless"
								icon={<IconBell />}
								style={{
									color: 'var(--semi-color-text-2)',
									marginRight: '12px'
								}}
							/>
						</Badge>

						<Dropdown
							render={
								<Dropdown.Menu>
									<Dropdown.Item>个人中心</Dropdown.Item>
									<Dropdown.Item>个人设置</Dropdown.Item>
									<Dropdown.Item onClick={()=>logoutClick(0)}>退出登录</Dropdown.Item>
									{/* <Dropdown.Item onClick={()=>logoutClick(1)}>退出本地(测试)</Dropdown.Item> */}
								</Dropdown.Menu>
							}
						>
							<Avatar color="orange" size="small">
								semi
							</Avatar>
						</Dropdown>

						<RadioGroup type="button" defaultValue={locale} style={{ marginLeft: '20px' }}>
							<Radio value={'zh_CN'} onChange={() => selectLocale('zh_CN')}>
								中文
							</Radio>
							<Radio value={'en_GB'} onChange={() => selectLocale('en_GB')}>
								EN
							</Radio>
						</RadioGroup>
					</>
				}
			></Nav>
			<Tags />
		</Header>
	)
}

export default Index
