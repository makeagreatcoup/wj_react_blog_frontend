/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Modal, Form, useFormApi } from '@douyinfe/semi-ui'
import { save, update } from '@/config/api/comment';

const FormApiComponent=({setFormApi,selectList,errmsg,errmsg2})=>{
	const formApi=useFormApi()
	useEffect(() => {
    setFormApi(formApi);
  }, [formApi]);
	return (
		<>
			<Form.Select
				field="post.title"
				label="文章标题"
				placeholder="请选择"
				style={{ width: 300 }}
				optionList={selectList}
				rules={[{ required: true, message: errmsg2 }]}
				disabled={true}
			></Form.Select>
			<Form.TextArea
					style={{ width: 300,height: 120 }}
					field='body'
					label='当前评论'
					placeholder='请输入评论'
					rules={[{ required: true, message: errmsg }]}
					disabled={true}
			/>
			<Form.TextArea
					style={{ width: 300,height: 120 }}
					field='reply'
					label='回复评论'
					placeholder='请输入评论'
					rules={[{ required: true, message: errmsg }]}
			/>
		</>
	)
}


const ModalUpdateComment : React.FC<Record<any,any>> = ({visible,setVisible,selectList,initValues,refreshData}) => {
	const [formApi,setFormApi]=useState(null);
	// 待优化
	const errmsg='该项为必填项'
	const errmsg2='该项为必选项'

  const handleSubmit = async(values) => {
		
		values.post=values.post?.id ?? ''
		values.body = values.reply
		values.customer = values.customer?.id ?? ''
		values.parent = values.id
		values.id=undefined
    console.log(values)
		await save(values).then(rsp=>{
			console.log(rsp)
			refreshData()
			setVisible(false)
		}).catch(e=>{
			console.log(e)
		})
		setVisible(false)
	}
  const formValidate=(values)=>{
    const errors={}as any
    if(values.post.title==null){
      errors.post=errmsg2
    }
		if(values.body==null){
      errors.body=errmsg
    }
		if(values.reply==null){
      errors.reply=errmsg
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
					<FormApiComponent setFormApi={setFormApi} selectList={selectList} errmsg={errmsg} errmsg2={errmsg2}></FormApiComponent>
				</Form>
			</Modal>
  )
}

export default ModalUpdateComment