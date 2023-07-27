/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Button, Table, Popconfirm, Toast, Tag, Typography } from '@douyinfe/semi-ui'
import { IconEdit, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import ModalAddtag from '@/components/tag/add'
import ModalUpdatetag from '@/components/tag/update'
import { getColor } from '@/utils/utils'
import { list, remove } from '@/config/api/tag'

const Index: React.FC = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setPage] = useState(1)
	const [pageSize, setPageSize] = useState(5)
	const [total, setTotal] = useState(0)
	const [updateData,setUpdateData]=useState({})
	// 是否开启软删除
	const [trash, setTrash] = useState('none')

	const [visibleAdd, setVisibleAdd] = useState(false)
	const [visibleUpdate, setVisibleUpdate] = useState(false)



	const columns = [
		{
			title:'序号',
			dataIndex:'key',
			render:(text, record, index) => {
				return index+1+(currentPage-1)*pageSize
			}
		},
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
						<Popconfirm title="确定要删除？" content={content} onConfirm={()=>onDeleteConfirm(record.id)}>
							<Button style={{ marginLeft: 10 }}>
								<IconDelete />
							</Button>
						</Popconfirm>
					</>
				)
			}
		}
	] as ColumnProps[]

	const onDeleteConfirm = async(id) => {
		await remove({id})
		.then((rsp)=>{
			Toast.success('删除成功')
			fetchData()
		})
		.catch((err)=>{console.log(err)})
	}
	const onUpdate=(record)=>{
		setVisibleUpdate(true)
		setUpdateData(record)
	}

	const handlePageChange = (_currentPage: number, _pageSize: number) => {
		setPageSize(_pageSize)
		setPage(_currentPage)
		fetchData()
	}
	const fetchData = async () => {
		setLoading(true)
		await list({page:currentPage,limit:pageSize})
		.then((rsp)=>{
			const {items,meta}=rsp.data;
			setData(items as [])
			setTotal(meta.totalItems||0)
		})
		.catch((err)=>{console.log(err)})
		setLoading(false)
		dealData()
		setTrash('')
	}
	useEffect(() => {
		fetchData()
	}, [currentPage,pageSize])
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
					pageSize,
					total,
					onChange: handlePageChange,
					showSizeChanger:true,
					pageSizeOpts:[5, 10, 20, 50]
				}}
				size='small'
				loading={loading}
			/>

			<ModalAddtag visible={visibleAdd} setVisible={setVisibleAdd} refreshData={fetchData}></ModalAddtag>
			<ModalUpdatetag visible={visibleUpdate} setVisible={setVisibleUpdate} initValues={updateData} refreshData={fetchData}></ModalUpdatetag>
		</>
	)
}

export default Index
