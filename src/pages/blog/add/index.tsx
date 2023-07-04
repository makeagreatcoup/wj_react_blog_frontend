/* eslint-disable no-console */
import { Button, Col, Form, Row, TabPane, Tabs, Tag, Toast, Typography } from '@douyinfe/semi-ui'
import React, { useEffect, useState } from 'react'

import { TagColor } from '@douyinfe/semi-ui/lib/es/tag'
import UploadFile from '@/components/common/Upload'
import ForEditor from '@/components/common/ForEditor'

import { errorMsg } from '@/utils/utils'
import { ValidateStatus } from '@douyinfe/semi-ui/lib/es/input'
import { useLocation } from 'react-router-dom'

const Index = () => {
  const location=useLocation();
  const {state}=location;
  const [formValue,initFormValue] = useState({})
  const [open, setOpen] = useState(false)

  const [saveLoading, setSaveLoading] = useState(false);
  const [fileUrl,setFileUrl] =useState('')
  const [html,setHtml]=useState('')
  const [fileActiveKey,setFileActiveKey]=useState('1')

  const [validateStatus, setValidateStatus] = useState("default" as ValidateStatus);
  console.log(location)
  useEffect(()=>{
    console.log(state)
    if(state){
      console.log(state)
      initFormValue(state)
    }
  },[])
	const onSubmit = (values) => {
		console.log(values)
    values.cover=fileUrl;
    values.body=html;
    values.type="html";
    values.publishedAt=values.publishStatus?new Date():null

    if(!values.title){
      Toast.error(errorMsg[0])
      return;
    }
    if(!values.body){
      Toast.error(errorMsg[1])
      return;
    }
    setSaveLoading(true)
    setTimeout(()=>{
      console.log(values)
      setSaveLoading(false)
    },3000)
	}
  const validate=(val,values)=>{
    if(!val){
      setValidateStatus("warning")
    }else{
      setValidateStatus("success")
    }
    return '';
  }


	const onChangeSwitch = () => {
		return setOpen(!open)
	}



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

	return (
		<>
			<Form layout="horizontal" onSubmit={onSubmit} initValues={formValue}>
				{({ formState, values, formApi }) => (
					<>
						<Row style={{ width: '100%' }}>
							<Col span={12}>
								<Row gutter={[8, 8]}>
									<Col>
										<Form.Input field="title" label="标 题" placeholder="请输入文章标题" validate={validate} validateStatus={validateStatus}/>
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
										<Tabs type="button" activeKey={fileActiveKey} onChange={setFileActiveKey}>
											<TabPane tab="传文件" itemKey="1">
												<UploadFile fileUrl={(e)=>{setFileUrl(e)}}></UploadFile>
											</TabPane>
											<TabPane tab="填网址" itemKey="2">
												<Form.Input field="cover" noLabel />
											</TabPane>
										</Tabs>
									</Col>
								</Row>
							</Col>
							<Col span={12} style={{height:'100%'}}>
                <div style={{height:'90%'}}>
                  <ForEditor initHtml='' htmlCallback={(html)=>{setHtml(html)}}/>
                </div>
                <div style={{height:'10%',display:'flex',flexWrap:'wrap',alignContent:'flex-end',justifyContent:'flex-end'}}>
                  <Button htmlType="submit" loading={saveLoading}  >保存并重置</Button>
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
