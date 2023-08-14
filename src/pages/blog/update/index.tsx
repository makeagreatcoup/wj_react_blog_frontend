/* eslint-disable no-console */
import { Button, Col, Form, Row, TabPane, Tabs, Tag, Toast, Typography } from '@douyinfe/semi-ui'
import React, { useEffect, useState } from 'react'

import { TagColor } from '@douyinfe/semi-ui/lib/es/tag'
import UploadFile from '@/components/common/Upload'
import ForEditor from '@/components/common/ForEditor'

import { errorMsg } from '@/utils/utils'
import { ValidateStatus } from '@douyinfe/semi-ui/lib/es/input'
import { useLocation } from 'react-router-dom'
import { detail, save } from '@/config/api/post'
import useCategoryStore from '@/pages/category/store/useStore'
import { useDropdownTree } from '@/hooks/useDropdownTree'
import useTagStore from '@/pages/tag/store/useStore'
import { useDropdown } from '@/hooks/useDropdown'

type BlogProps = {
	id: string
	title: string
	summary: string
	body: string
	cover: string
	state: string
	type: string
	category: {id:string}
	tags: any
	keywords: any
	publishedAt: Date
}

const Index = () => {
	const { state } = useLocation()
	const [formValue, setFormValue] = useState(null)
	useEffect(() => {
		fetchCategoryData()
		fetchTagData()
		if (state) {
			const values = state as BlogProps
			setFormValue({
				id: values.id,
				title: values.title,
				summary: values.summary,
				body: values.body,
				cover: values.cover,
				type: values.type,
				state: values.state === 'ON' ? true : false,
				category: values.category?values.category.id:'',
				tags: values.tags ? values.tags.map((item) => item.id) : [],
				keywords: values.keywords,
				publishStatus: values.publishedAt ? true : false
			})
		}
	}, [])

	const { categoryData, fetchCategoryData } = useCategoryStore((state) => state)
	const categoryOptions = useDropdownTree(categoryData, 'name')

	const { tagData, fetchTagData } = useTagStore((state) => state)
	const tagOptions = useDropdown(tagData, 'title')


	return (
		<>
			{formValue ? (
				<BlogForm categoryOptions={categoryOptions} tagOptions={tagOptions} initValues={formValue}></BlogForm>
			) : null}
		</>
	)
}

export default Index

const BlogForm: React.FC<Record<any, any>> = ({ categoryOptions, tagOptions, initValues }) => {
	const [open, setOpen] = useState(false)

	const [saveLoading, setSaveLoading] = useState(false)
	const [fileUrl, setFileUrl] = useState('')
	const [html, setHtml] = useState('')
	const [fileActiveKey, setFileActiveKey] = useState('1')
	const [validateStatus, setValidateStatus] = useState('default' as ValidateStatus)
	useEffect(() => {
		if (initValues && initValues.cover) {
			setFileActiveKey('2')
		} else {
			setFileActiveKey('1')
		}
		if (initValues && initValues.body) {
			setHtml(initValues.body)
		} else {
			fetchHtml(initValues.id)
		}
	}, [])
	const fetchHtml = async (id) => {
		await detail({ id })
			.then((rsp) => {
				console.log(rsp)
				const data = rsp.data
				setHtml(data?.body)
			})
			.catch((e) => {
				console.log(e)
				setSaveLoading(false)
			})
	}
	const onSubmit = async (values) => {
		console.log(values)
		values.cover = fileUrl
		values.body = html
		values.type = 'html'
		values.publishedAt = values.publishStatus ? new Date() : null
		values.state = values.state ? 'ON':'OFF'
		if (!values.title) {
			Toast.error(errorMsg[0])
			return
		}
		if (!values.body) {
			Toast.error(errorMsg[1])
			return
		}
		setSaveLoading(true)
		await save(values)
			.then((rsp) => {
				console.log(rsp)
				setTimeout(() => {
					Toast.success('保存成功')
					setSaveLoading(false)
				}, 200)
			})
			.catch((e) => {
				console.log(e)
				setSaveLoading(false)
			})
	}
	const validate = (val, values) => {
		if (!val) {
			setValidateStatus('warning')
		} else {
			setValidateStatus('success')
		}
		return ''
	}

	const onChangeSwitch = () => {
		return setOpen(!open)
	}
	return (
		<>
			<Form layout="horizontal" onSubmit={onSubmit} initValues={initValues}>
				<Row style={{ width: '100%' }}>
					<Col span={12}>
						<Row gutter={[8, 8]}>
							<Col>
								<Form.Input
									field="title"
									label="标 题"
									placeholder="请输入文章标题"
									validate={validate}
									validateStatus={validateStatus}
								/>
							</Col>
							<Col>
								<Form.TextArea field="summary" label="描 述" maxCount={200} showClear placeholder="请输入文章描述" />
							</Col>
							<Col>
								<Form.TagInput field="keywords" label="关键字" placeholder="请输入文章关键字" />
							</Col>
							<Col span={12}>
								<Row gutter={[8, 8]}>
									<Col>
										<Form.TreeSelect
											style={{ width: '100%' }}
											field="category"
											label="分类"
											dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
											treeData={categoryOptions}
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
											{/* {selectTags.map((item) => (
												
												<Form.Select.Option key={item.key} value={item.value}>
													<Tag color={item.color as TagColor}>{item.label}</Tag>
												</Form.Select.Option>
											))} */}
											{tagOptions.map((item) => (
												<Form.Select.Option key={item.key} value={item.value}>
													<Tag color={item.color as TagColor}>{item.label}</Tag>
												</Form.Select.Option>
											))}
										</Form.Select>
									</Col>
									<Col>
										<Row>
											<Col span={12}>
												<Form.Switch field="state" label="状态" onChange={onChangeSwitch} />
											</Col>
											<Col span={12}>
												<Form.Switch field="publishStatus" label="发布" onChange={onChangeSwitch} />
											</Col>
										</Row>
									</Col>
								</Row>
							</Col>
							<Col span={12}>
								<Typography.Title heading={6} style={{ fontSize: 14 }}>
									封面
								</Typography.Title>
								<Tabs type="button" activeKey={fileActiveKey} onChange={setFileActiveKey}>
									<TabPane tab="传文件" itemKey="1">
										<UploadFile
											fileUrl={(e) => {
												setFileUrl(e)
											}}
										></UploadFile>
									</TabPane>
									<TabPane tab="填网址" itemKey="2">
										<Form.Input field="cover" noLabel />
									</TabPane>
								</Tabs>
							</Col>
						</Row>
					</Col>
					<Col span={12} style={{ height: '100%' }}>
						<div style={{ height: '90%' }}>
							<ForEditor
								initHtml={html}
								htmlCallback={(html) => {
									setHtml(html)
								}}
							/>
						</div>
						<div
							style={{
								height: '10%',
								display: 'flex',
								flexWrap: 'wrap',
								alignContent: 'flex-end',
								justifyContent: 'flex-end'
							}}
						>
							<Button htmlType="submit" loading={saveLoading}>
								保存并重置
							</Button>
						</div>
					</Col>
				</Row>
			</Form>
		</>
	)
}
