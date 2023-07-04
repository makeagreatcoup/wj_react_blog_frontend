/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Button, Table, Popconfirm, Toast } from '@douyinfe/semi-ui'
import { IconEdit, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import ModalAddCategory from '@/components/category/add'
import ModalUpdateCategory from '@/components/category/update'

const Index: React.FC = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setPage] = useState(1)
	const [updateData,setUpdateData]=useState({})
	// 是否开启软删除
	const [trash, setTrash] = useState('none')

	const [visibleAdd, setVisibleAdd] = useState(false)
	const [visibleUpdate, setVisibleUpdate] = useState(false)
	const pageSize = 10

	const onDeleteConfirm = () => {
		Toast.success('删除成功')
	}
	const onUpdate=(record)=>{
		setVisibleUpdate(true)
		console.log(record)
		setUpdateData(record)
	}
	const columns = [
		{
			title: '分类名称',
			dataIndex: 'name',
			width: 500,
			key: 'name'
		},
		{
			title: '层级',
			dataIndex: 'depth',
			key: 'depth'
		},
		{
			title: '文章排序优先级',
			dataIndex: 'customOrder',
			key: 'customOrder'
		},

		{
			title: '操作',
			dataIndex: '',
			key: '',
			width: 200,
			align: 'center',
			render: (text, record, index) => {
				const content = record.children ? '该项还存在子项' : ''
				return (
					<>
						<Button style={{ marginLeft: 10 }} onClick={()=>onUpdate(record)}>
							<IconEdit />
						</Button>
						<Popconfirm title="确定要删除？" content={content} onConfirm={onDeleteConfirm}>
							<Button style={{ marginLeft: 10 }}>
								<IconDelete />
							</Button>
						</Popconfirm>
					</>
				)
			}
		}
	] as ColumnProps[]

	const data1 = [
		{
			key: 1,
			name: '分类1',
			depth: 0,
			customOrder: 0,
			parent:'',
			deleteAt: null,
			children: [
				{
					name: '分类1-1',
					depth: 1,
					parent:'1',
					customOrder: 0,
					deleteAt: null
				},
				{
					name: '分类1-2',
					depth: 1,
					customOrder: 0,
					deleteAt: null
				}
			]
		},
		{
			key: 2,
			name: '分类2',
			depth: 0,
			customOrder: 0,
			deleteAt: null,
			children: [
				{
					key: 21,
					name: '分类2-1',
					depth: 0,
					parent:'2',
					customOrder: 0,
					deleteAt: null
				},
				{
					key: 22,
					name: '分类2-2',
					depth: 0,
					parent:'2',
					customOrder: 0,
					deleteAt: null
				}
			]
		}
	]

	const selectList = [
		{ value: '', label: '', otherKey: 0 },
		{ value: 'abc', label: '抖音', otherKey: 1 },
		{ value: 'ulikecam', label: '轻颜相机', otherKey: 2 },
		{ value: 'jianying', label: '剪映', otherKey: 3 },
		{ value: 'toutiao', label: '今日头条', otherKey: 4 }
	]

	const handlePageChange = (page) => {
		fetchData(page)
	}
	const fetchData = async (currentPage = 1) => {
		setLoading(true)
		setPage(currentPage)
		const dataSource = await new Promise((res, rej) => {
			setTimeout(() => {
				res(data1)
			}, 300)
		})
		setLoading(false)
		setData(dataSource as [])
		dealData()
		setTrash('')
	}
	useEffect(() => {
		fetchData()
	}, [])
	const createData = () => {
		setVisibleAdd(true)
	}
	const dealData = () => {
		let flag = false
		data.forEach((item) => {
			if (item.deleteAt) {
				flag = true
				return
			}
			if (item.children.length > 0) {
				item.children.forEach((it) => {
					if (it.deleteAt) {
						flag = true
						return
					}
				})
			}
		})
		return !flag
	}



	return (
		<>
			<Button onClick={createData} type="primary" style={{ marginBottom: 10 }}>
				新增
			</Button>
			<Button type="warning" disabled={dealData()} style={{ marginBottom: 10, marginLeft: 10, display: trash }}>
				回收站
			</Button>

			<Table
				columns={columns}
				defaultExpandAllRows
				dataSource={data}
				pagination={{
					currentPage,
					pageSize: pageSize,
					total: data.length,
					onPageChange: handlePageChange
				}}
				loading={loading}
			/>

			<ModalAddCategory visible={visibleAdd} setVisible={setVisibleAdd} selectList={selectList}></ModalAddCategory>
			<ModalUpdateCategory visible={visibleUpdate} setVisible={setVisibleUpdate} selectList={selectList} initValues={updateData}></ModalUpdateCategory>
		</>
	)
}

export default Index
