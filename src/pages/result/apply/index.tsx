import React from 'react'
import { Empty } from '@douyinfe/semi-ui'
import { IllustrationSuccess, IllustrationSuccessDark } from '@douyinfe/semi-illustrations'

const Index: React.FC = () => {
	return (
		<Empty
			title={'允许访问'}
			image={<IllustrationSuccess style={{ width: 400, height: 400 }} />}
			darkModeImage={<IllustrationSuccessDark style={{ width: 400, height: 400 }} />}
			description="这是允许页"
		></Empty>
	)
}

export default Index
