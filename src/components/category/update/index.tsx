/* eslint-disable no-console */
import React, { useState } from 'react'
import { Modal, Form, useFormApi } from '@douyinfe/semi-ui'

const FormApiComponent=({setFormApi,selectList,errmsg})=>{
	const formApi=useFormApi()
	setFormApi(formApi)
	return (
		<>
			<Form.Select
				field="region"
				label="父分类"
				placeholder="请选择"
				style={{ width: 300 }}
				optionList={selectList}
			></Form.Select>
			<Form.Input
				field="name"
				label="分类名称"
				style={{ width: 300 }}
				placeholder="请输入分类名称"
				rules={[{ required: true, message: errmsg }]}
			></Form.Input>
      <Form.InputNumber 
      field='customOrder' 
      label="文章排序优先级" 
      style={{ width: 300 }}
      ></Form.InputNumber>

		</>
	)
}


const ModalUpdateCategory : React.FC<Record<any,any>> = ({visible,setVisible,selectList,initValues}) => {
	const [formApi,setFormApi]=useState(null);
	const errmsg='该项为必填项'

  const handleSubmit = (values) => {
    // todo
		setVisible(false)
	}
  const formValidate=(values)=>{
    const errors={}as any
    if(values.name==null){
      errors.name=errmsg
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
					style={{ width: 400 }}
          initValues={initValues}
				>
					<FormApiComponent setFormApi={setFormApi} selectList={selectList} errmsg={errmsg}></FormApiComponent>
				</Form>
			</Modal>
  )
}

export default ModalUpdateCategory