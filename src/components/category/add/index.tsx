/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Modal, Form, useFormApi } from '@douyinfe/semi-ui'
import { save } from '@/config/api/category';

const FormApiComponent = ({ setFormApi, selectList, errmsg }) => {
	const formApi = useFormApi()

	useEffect(() => {
    setFormApi(formApi);
  }, [formApi]);
	return (
		<>
			<Form.TreeSelect
				field="parent"
				label="父分类"
				placeholder="请选择"
				style={{ width: 300 }}
				treeData={selectList}
				dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			></Form.TreeSelect>
			<Form.Input
				field="name"
				label="分类名称"
				style={{ width: 300 }}
				placeholder="请输入分类名称"
				rules={[{ required: true, message: errmsg }]}
			></Form.Input>
			<Form.InputNumber
				field="customOrder"
				label="文章排序优先级"
				initValue={0}
				style={{ width: 300 }}
			></Form.InputNumber>
		</>
	)
}

const ModalAddCategory: React.FC<Record<any, any>> = ({ visible, setVisible, selectList,refreshData }) => {
	const [formApi, setFormApi] = useState(null)
	const errmsg = '该项为必填项'

	const handleSubmit = async(values) => {
		console.log(values)
		await save(values).then(rsp=>{
			console.log(rsp)
			refreshData()
			setVisible(false)
		}).catch(e=>{
			console.log(e)
		})
	}
	const formValidate = (values) => {
		const errors = {} as any
		if (values.name == null) {
			errors.name = errmsg
		}
		if (Object.keys(errors).length === 0) {
			return null
		}
		return errors
	}
	const onOk = () => {
		formApi.submitForm()
	}

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
			<Form onSubmit={handleSubmit} validateFields={formValidate}>
				<FormApiComponent setFormApi={setFormApi} selectList={selectList} errmsg={errmsg}></FormApiComponent>
			</Form>
		</Modal>
	)
}

export default ModalAddCategory
