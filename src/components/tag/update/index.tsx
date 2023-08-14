/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Modal, Form, useFormApi, Tag } from '@douyinfe/semi-ui'
import { colorList } from '@/utils/utils'
import { TagColor } from '@douyinfe/semi-ui/lib/es/tag'
import { update } from '@/config/api/tag'

const FormApiComponent=({setFormApi,selectList,errmsg})=>{
	const formApi=useFormApi()
	useEffect(() => {
    setFormApi(formApi);
  }, [formApi]);
	return (
		<>
			<Form.Input
				field="title"
				label="标签名称"
				style={{ width: 300 }}
				placeholder="请输入标签名称"
				rules={[{ required: true, message: errmsg }]}
			></Form.Input>
			<Form.Input 
			field='summary' 
			label="标签描述" 
			placeholder="请输入标签名称"
			 style={{ width: 300 }}
			></Form.Input>
			<Form.Select
				field="color"
				label="颜色"
				placeholder="请选择"
				style={{ width: 300 }}
				optionList={selectList}
			>
				<Form.Select.Option>
					{formApi.getValue('color')}
				</Form.Select.Option>
			</Form.Select>
			
			<Form.Switch 
			field='state' 
			label='状态'
			labelPosition='left'
			initValue={formApi.getValue('state')==='ON'} 
			onChange={(v, e) => {formApi.setValue('state',v?'ON':'OFF')}}></Form.Switch>

		</>
	)
}


const ModalUpdateTag : React.FC<Record<any,any>> = ({visible,setVisible,initValues,refreshData}) => {

	const [formApi,setFormApi]=useState(null);
	const colorSelectList=[];
	const errmsg='该项为必填项'
	colorList.forEach(e=>{
		colorSelectList.push({
			value:e,label:
				(<Tag color={e as TagColor}>{e}</Tag>
				)
			,key:e
		})
	})

  const handleSubmit = async(values) => {
		values.state=values.state?'ON':'OFF'
		console.log(values)
		await update(values).then(rsp=>{
			console.log(rsp)
			refreshData()
			setVisible(false)
		}).catch(e=>{
			console.log(e)
		})
	}
  const formValidate=(values)=>{
    const errors={}as any
    if(values.title==null){
      errors.title=errmsg
    }
		if(values.color==null){
      errors.color=errmsg
    }
		if(Object.keys(errors).length === 0){
			return null
		}
    return errors
  }
	const onOk=()=>{
		formApi.submitForm()
  };

  return (
    <Modal
				title="修改"
				visible={visible}
				style={{ width: 400 }}
				onOk={onOk}
				onCancel={() => {
					setVisible(false)
				}}
				okText={'确认'}
				cancelText={'取消'}
				maskClosable={false}
			>
				
				<Form 
					onSubmit={handleSubmit} 
					validateFields={formValidate} 
					initValues={initValues}
				>
					<FormApiComponent setFormApi={setFormApi} selectList={colorSelectList} errmsg={errmsg}></FormApiComponent>
				</Form>
			</Modal>
  )
}

export default ModalUpdateTag