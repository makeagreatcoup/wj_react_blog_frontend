/* eslint-disable no-console */
import { Button, Col, DatePicker, Form, Row } from '@douyinfe/semi-ui'
import React, { useState } from 'react'

const Index = () => {

	const onSubmit = (values) => {
		console.log(values)
	}
	const onReset = (formApi) => {
    formApi.reset()
    setDataValueArr([])
    formApi.setValue('createAt',[])
		// form.resetFields();
		// fetchData();
	}
  const onChangeDate=(formApi,e)=>{
    setDataValueArr(e)
    formApi.setValue('createAt',e)
  }

  const [dataValueArr,setDataValueArr]=useState([]);

  const getWidthStyle = {width:150};
  const getDatePickerWidthStyle = {width:350}
  const allParam=[{key: '0',value:'0',label: '全部'}]
  
	const customerOptions = []
	return (
		<>
			<Form layout="horizontal" labelPosition="left" labelAlign="right" onSubmit={onSubmit} >
				{({ formState, values, formApi }) => (
					<>
						<Row style={{width:'100%'}}>
							<Col span={20}>
								<Row gutter={[8, 16]} >
									<Col span={6}>
										<Form.Input style={getWidthStyle} field="title" label="标题" placeholder="请输入文章标题" />
									</Col>
									<Col span={6}>
										<Form.Select style={getWidthStyle} field="customer.nickname" label="评论人" placeholder="请选择评论人">
											{[
												...allParam,
												...customerOptions
											].map((item) => (
												<Form.Select.Option key={item.key} value={item.value}>
													{item.label}
												</Form.Select.Option>
											))}
										</Form.Select>
									</Col>
                  <Col span={12}>
										<DatePicker  insetLabel="评论日期" type="dateRange"  style={getDatePickerWidthStyle} onChange={(e)=>onChangeDate(formApi,e)} value={dataValueArr}/>
									</Col>
								</Row>
							</Col>
							<Col span={4}>
								<Button onClick={()=>onReset(formApi)}>重置</Button>
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
