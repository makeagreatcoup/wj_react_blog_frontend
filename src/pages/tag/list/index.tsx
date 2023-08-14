/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Table, Popconfirm, Toast, Tag, Typography } from '@douyinfe/semi-ui'
import { IconEdit, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import ModalAddtag from '@/components/tag/add'
import ModalUpdatetag from '@/components/tag/update'
import { getColor } from '@/utils/utils'
import { list, remove } from '@/config/api/tag'
import useStateStore from '@/pages/tag/store'

import { useDebounceFetch } from '@/hooks/useDebounce'

const Index: React.FC = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	const [updateData,setUpdateData]=useState({})
	// 是否开启软删除
	const [trash, setTrash] = useState('none')

	//持久化pageSize
	const {pageSize,updateState} = useStateStore(state=>state)

	const [visibleAdd, setVisibleAdd] = useState(false)
	const [visibleUpdate, setVisibleUpdate] = useState(false)

	const columns = useMemo(()=>{
		return [
		{
			title:'序号',
			dataIndex:'number',
			key:'number',
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
				const content = record.children&&record.children.length ? '该项还存在子项' : ''
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
	] as ColumnProps[]},[])

	const onDeleteConfirm = useCallback(async (id) => {
		await remove({id})
		.then((rsp)=>{
			Toast.success('删除成功')
			fetchData()
		})
		.catch((err)=>{console.log(err)})
	},[])
	const onUpdate=useCallback((record)=>{
		setVisibleUpdate(true)
		setUpdateData(record)
	},[])

	const handlePageChange = (_currentPage: number, _pageSize: number) => {
		updateState({pageSize:_pageSize})
		setPage(_currentPage)
	}
	
	const fetchFunc =async () => {
		await list({page:currentPage,limit:pageSize})
		.then((rsp)=>{
			console.log(rsp)
			const {items,meta}=rsp.data;
			setData(items as [])
			setTotal(meta.totalItems||0)
		})
		.catch((err)=>{
			console.log(err)})
	}
	const debouncedFetch = useDebounceFetch(fetchFunc); 

	const fetchData = async () => {
		setLoading(true)
		await debouncedFetch()
		.then(()=>{
			setLoading(false)
		})
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
