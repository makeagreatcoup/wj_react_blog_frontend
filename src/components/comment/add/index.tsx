/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Modal, Form, useFormApi } from '@douyinfe/semi-ui'

const FormApiComponent=({setFormApi,selectList,errmsg,errmsg2})=>{
	const formApi=useFormApi()
	
	useEffect(() => {
    setFormApi(formApi);
  }, [formApi]);
	return (
		<>
			<Form.Select
				field="post"
				label="文章标题"
				placeholder="请选择"
				style={{ width: 300 }}
				optionList={selectList}
				rules={[{ required: true, message: errmsg2 }]}
			></Form.Select>
			<Form.TextArea
					style={{ width: 300,height: 120 }}
					field='body'
					label='评论'
					placeholder='请输入评论'
					rules={[{ required: true, message: errmsg }]}
			/>
		</>
	)
}


const ModalAddComment : React.FC<Record<any,any>> = ({visible,setVisible,selectList}) => {

	const [formApi,setFormApi]=useState(null);
	// 待优化todo
	const errmsg='该项为必填项'
	const errmsg2='该项为必选项'


  const handleSubmit = (values) => {
		console.log(values)
		setVisible(false)
	}
  const formValidate=(values)=>{
    const errors={}as any
    if(values.post==null){
      errors.post=errmsg2
    }
		if(values.body==null){
      errors.body=errmsg
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
				title="新增"
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
				>
					<FormApiComponent setFormApi={setFormApi} selectList={selectList} errmsg={errmsg} errmsg2={errmsg2}></FormApiComponent>
				</Form>
			</Modal>
  )
}

export default ModalAddComment