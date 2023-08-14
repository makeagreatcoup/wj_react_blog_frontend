/* eslint-disable no-console */
import { Button, Col, DatePicker, Form, Row, Tag } from '@douyinfe/semi-ui'
import { TagColor } from '@douyinfe/semi-ui/lib/es/tag'
import React, { useEffect, useState } from 'react'

const Index: React.FC<Record<any, any>> = ({ categoryOptions, tagOptions }) => {
	const onSubmit = (values) => {
		console.log(values)
	}
	const onReset = (formApi) => {
		formApi.reset()
		setDataValueArr([])
		formApi.setValue('createAt', [])
		// form.resetFields();
		// fetchData();
	}
	const onChangeDate = (formApi, e) => {
		setDataValueArr(e)
		formApi.setValue('createAt', e)
	}

	const onChangeSwitch = () => {
		return setOpen(!open)
	}

	const [dataValueArr, setDataValueArr] = useState([])
	const [open, setOpen] = useState(false)

	const [categoriesArr, setCategoryData] = useState([])
	const [tagsArr, setTagData] = useState([])
	const getWidthStyle = { width: 150 }
	const getDatePickerWidthStyle = { width: 400 }
	const allParam = [{ key: '0', value: undefined, label: '全部' }]

	useEffect(() => {
		setCategoryData({ ...allParam, ...categoryOptions })
	}, [categoryOptions])
	useEffect(() => {
		setTagData(tagOptions)
	}, [tagOptions])
	const statusOptions = [
		{ key: '1', value: 'ON', label: 'ON' },
		{ key: '2', value: 'OFF', label: 'OFF' }
	]
	const publishStatusOptions = [
		{ key: '1', value: '1', label: '已发布' },
		{ key: '2', value: '2', label: '未发布' }
	]
	return (
		<>
			<Form layout="horizontal" labelPosition="left" labelAlign="right" onSubmit={onSubmit}>
				{({ formState, values, formApi }) => (
					<>
						<Row style={{ width: '100%' }}>
							<Col span={20}>
								<Row gutter={[8, 16]}>
									<Col span={6}>
										<Form.TreeSelect
											style={{...getWidthStyle,
												whiteSpace:"nowrap"}}
											field="category"
											label="分类"
											placeholder="请选择分类"
											treeData={categoryOptions}
											dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
										></Form.TreeSelect>
									</Col>
									<Col span={6}>
									<Form.Select
													multiple
													maxTagCount={1}
													style={{ width: '100%' }}
													field="tags"
													label="标签"
													placeholder="请选择标签"
												>
													{tagsArr.map((item) => (
														<Form.Select.Option key={item.key} value={item.value}>
															<Tag color={item.color as TagColor}>{item.label}</Tag>
														</Form.Select.Option>
													))}
												</Form.Select>
									</Col>
									<Col span={6}>
										<Form.Select style={getWidthStyle} field="status" label="状态" placeholder="请选择文章状态">
											{[...allParam, ...statusOptions].map((item) => (
												<Form.Select.Option key={item.key} value={item.value}>
													{item.label}
												</Form.Select.Option>
											))}
										</Form.Select>
									</Col>
									<Col span={6}>
										<Form.Select
											style={getWidthStyle}
											field="publishStatus"
											label="发布"
											placeholder="请选择文章发布状态"
										>
											{[...allParam, ...publishStatusOptions].map((item) => (
												<Form.Select.Option key={item.key} value={item.value}>
													{item.label}
												</Form.Select.Option>
											))}
										</Form.Select>
									</Col>
								</Row>
								<Row gutter={[8, 16]}>
									<Col span={12}>
										<DatePicker
											insetLabel="创建日期"
											type="dateRange"
											style={getDatePickerWidthStyle}
											onChange={(e) => onChangeDate(formApi, e)}
											value={dataValueArr}
										/>
									</Col>
									<Col span={6}>
										<Form.Switch field="trashed" label="回收站" onChange={onChangeSwitch} />
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
