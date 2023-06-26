/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Button, Table, Popconfirm, Toast, Tag, Typography } from '@douyinfe/semi-ui'
import { IconEdit, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import ModalAddtag from '@/components/tag/add'
import ModalUpdatetag from '@/components/tag/update'
import { getColor } from '@/utils/utils'

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
		setUpdateData(record)
	}
	const columns = [
		{
			title: '标签名称',
			dataIndex: 'title',
			width: 200,
			key: 'title'
		},
		{
			title: '标签描述',
			dataIndex: 'summary',
			width: 400,
			key: 'summary'
		},
		{
			title: '标签颜色',
			dataIndex: 'color',
			align:'center',
			key: 'color',
			render:(record)=>{
				return(
					<>
						{/* {['amber', 'blue', 'cyan', 'green', 'grey', 'indigo',  
                'light-blue', 'light-green', 'lime', 'orange', 'pink',  
                'purple', 'red', 'teal', 'violet', 'yellow', 'white'
            ].map(item => (<Tag color={item} key={item}> {item} </Tag>))} */}
						<Tag color={getColor(record)}>{getColor(record)}</Tag>
					</>
				)
			}
		},
		{
			title: '状态',
			dataIndex: 'state',
			align:'center',
			key: 'state',
			render:(record)=>{
				return(
					<>
						<Typography.Text strong={true} type={record==='ON'?'success':'danger'}>{record}</Typography.Text>
					</>
				)
			}
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
			title: '标签1',
			summary: '啊擦撒内存空间拉萨',
			color: 'blue',
			state:'ON'
		},
		{
			key: 2,
			title: '标签2',
			summary: '啊擦撒内存空间拉萨',
			color: 'cyan',
			state:'ON'
		},
		{
			key: 3,
			title: '标签3',
			summary: '啊擦撒内存空间拉萨',
			color: 'grey',
			state:'ON'
		},
		{
			key: 4,
			title: '标签4',
			summary: '啊擦撒内存空间拉萨',
			color: 'indigo',
			state:'ON'
		},
		{
			key: 5,
			title: '标签5',
			summary: '啊擦撒内存空间拉萨',
			color: 'light-blue',
			state:'OFF'
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
		flag=false
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

			<ModalAddtag visible={visibleAdd} setVisible={setVisibleAdd} selectList={selectList}></ModalAddtag>
			<ModalUpdatetag visible={visibleUpdate} setVisible={setVisibleUpdate} initValues={updateData}></ModalUpdatetag>
		</>
	)
}

export default Index
