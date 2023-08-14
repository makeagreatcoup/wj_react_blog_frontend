/* eslint-disable no-console */
import { Button, Col, DatePicker, Form, Row } from '@douyinfe/semi-ui'
import React, { useState } from 'react'

const Index : React.FC<Record<any,any>> = ({setSearch,selectTitleList,selectCustomerList}) => {
	const onSubmit = (values) => {
		console.log(values)
		setSearch(values)
	}
	const onReset = (formApi) => {
		formApi.reset()
		// form.resetFields();
		// fetchData();
	}

	const getWidthStyle = { width: 150 }
	const allParam = [{ key: '0', value: undefined, label: '全部' }]

	return (
		<>
			<Form layout="horizontal" labelPosition="left" labelAlign="right" onSubmit={onSubmit}>
				{({ formState, values, formApi }) => (
					<>
						<Row style={{ width: '100%' }}>
							<Col span={20}>
								<Row gutter={[8, 16]}>
									<Col span={6}>
									<Form.Select
										style={getWidthStyle}
										field="postId"
										label="文章标题"
										placeholder="请选择相关文章"
									>
											{[...allParam, ...selectTitleList].map((item) => (
												<Form.Select.Option key={item.key} value={item.value}>
													{item.label}
												</Form.Select.Option>
											))}
									</Form.Select>
									</Col>
									<Col span={6}>
										<Form.Select
											style={getWidthStyle}
											field="customerId"
											label="评论人"
											placeholder="请选择评论人"
										>
											{[...allParam, ...selectCustomerList].map((item) => (
												<Form.Select.Option key={item.key} value={item.value}>
													{item.label}
												</Form.Select.Option>
											))}
										</Form.Select>
									</Col>
								</Row>
							</Col>
							<Col span={4}>
								<Button onClick={() => onReset(formApi)}>重置</Button>
								<Button htmlType="submit" style={{ marginLeft: 20 }} type="primary">
									搜索
								</Button>
							</Col>
						</Row>
					</>
				)}
			</Form>
		</>
	)
}

export default Index
