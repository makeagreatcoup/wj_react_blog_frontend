/* eslint-disable no-console */
import BlogSwitch from '@/components/common/BlogSwitch'
import { Button, Col, DatePicker, Form, Input, Row, TabPane, Tabs, Tag, TextArea, Typography } from '@douyinfe/semi-ui'
import React, { useState } from 'react'

import { TagColor } from '@douyinfe/semi-ui/lib/es/tag'
import UploadFile from '@/components/common/Upload'
import ForEditor from '@/components/common/ForEditor'


const Index = () => {
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

	const [list, updateList] = useState([])

	const [dataValueArr, setDataValueArr] = useState([])
	const [open, setOpen] = useState(false)

  const [saveLoading, setSaveLoading] = useState(false);


	const getWidthStyle = {}
	const getDatePickerWidthStyle = { width: 400 }
	const allParam = []

	const categoriesArr = [
		{
			key: '1',
			label: '分类1',
			children: [
				{
					key: '11',
					label: '分类1-1',
					depth: 1,
					parent: '1',
					customOrder: 0,
					deleteAt: null
				},
				{
					key: '12',
					label: '分类1-2',
					depth: 1,
					customOrder: 0,
					deleteAt: null
				}
			]
		},
		{
			key: '2',
			label: '分类2',
			depth: 0,
			customOrder: 0,
			deleteAt: null,
			children: [
				{
					key: '21',
					label: '分类2-1',
					depth: 0,
					parent: '2',
					customOrder: 0,
					deleteAt: null
				},
				{
					key: '22',
					label: '分类2-2',
					depth: 0,
					parent: '2',
					customOrder: 0,
					deleteAt: null
				}
			]
		}
	]
	const tagsArr = [
		{ key: '1', value: '1', label: '标签1', color: 'amber' },
		{ key: '2', value: '2', label: '标签2', color: 'blue' },
		{ key: '3', value: '3', label: '标签3', color: 'cyan' },
		{ key: '4', value: '4', label: '标签4', color: 'green' }
	]
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
			<Form layout="horizontal" onSubmit={onSubmit}>
				{({ formState, values, formApi }) => (
					<>
						<Row style={{ width: '100%' }}>
							<Col span={12}>
								<Row gutter={[8, 8]}>
									<Col>
										<Form.Input style={getWidthStyle} field="title" label="标 题" placeholder="请输入文章标题" />
									</Col>
									<Col>
										<Form.TextArea
											field="summary"
											label="描 述"
											maxCount={200}
											showClear
											placeholder="请输入文章描述"
										/>
									</Col>
									<Col>
										<Form.TagInput style={getWidthStyle} field="title" label="关键字" placeholder="请输入文章关键字" />
									</Col>
									<Col span={12}>
										<Row gutter={[8, 8]}>
											<Col>
												<Form.TreeSelect
													style={{ width: '100%' }}
													field="category"
													label="分类"
													dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
													treeData={categoriesArr}
													placeholder="请选择分类"
												/>
											</Col>
											<Col>
												<Form.Select
													multiple
													maxTagCount={2}
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
											<Col>
												<Row>
													<Col span={12}>
														<Form.Switch field="state" label="状态" onChange={onChangeSwitch} initValue={true} />
													</Col>
													<Col span={12}>
														<Form.Switch
															field="publishStatus"
															label="发布"
															onChange={onChangeSwitch}
															initValue={true}
														/>
													</Col>
												</Row>
											</Col>
										</Row>
									</Col>
									<Col span={12}>
										<Typography.Title heading={6} style={{ fontSize: 14 }}>
											封面
										</Typography.Title>
										<Tabs type="button">
											<TabPane tab="传文件" itemKey="1">
												<UploadFile fileUrl={(e)=>{console.log(e)}}></UploadFile>
											</TabPane>
											<TabPane tab="填网址" itemKey="2">
												<Form.Input field="cover" noLabel />
											</TabPane>
										</Tabs>
									</Col>
								</Row>
							</Col>
							<Col span={12} style={{height:'100%'}}>
                <div style={{height:'90%',overflow:'scroll'}}>
                  <ForEditor />
                </div>
                <div style={{height:'10%',display:'flex',flexWrap:'wrap',alignContent:'flex-end',justifyContent:'flex-end'}}>
                  <Button loading={saveLoading} onClick={() => setSaveLoading(true)} >保存并重置</Button>
                </div>
							</Col>
						</Row>
					</>
				)}
			</Form>
		</>
	)
}

export default Index
