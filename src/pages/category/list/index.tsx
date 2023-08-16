/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Table, Popconfirm, Toast } from '@douyinfe/semi-ui'
import { IconEdit, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import ModalAddCategory from '@/components/category/add'
import ModalUpdateCategory from '@/components/category/update'
import useStateStore from '../store'
import { remove, tree } from '@/config/api/category'
import { useDebounceFetch } from '@/hooks/useDebounce'
import { useDropdownTree } from '@/hooks/useDropdownTree'

const Index: React.FC = () => {
	const [loading, setLoading] = useState(false)
	const [updateData, setUpdateData] = useState({})
	// 是否开启软删除
	const [trash, setTrash] = useState('none')

	const [visibleAdd, setVisibleAdd] = useState(false)
	const [visibleUpdate, setVisibleUpdate] = useState(false)

	const { pageSize, updateState } = useStateStore((state) => state)

	const [selectData, setSelectData] = useState([]);
	const columns = useMemo(
		() =>
			[
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
						const content = record.children&&record.children.length ? (
						<><span>该项还存在子项,</span><br/><span style={{color:'red'}}>删除后子分类将上升一级</span></>) : ''
						return (
							<>
								<Button style={{ marginLeft: 10 }} onClick={() => onUpdate(record)}>
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
			] as ColumnProps[],
		[]
	)
	const createData = () => {
		setVisibleAdd(true)
	}

	const onDeleteConfirm = useCallback(async (id) => {
		await remove({ id })
			.then((rsp) => {
				Toast.success('删除成功')
				fetchData()
			})
			.catch((err) => {
				console.log(err)
			})
	}, [])
	const onUpdate = useCallback((record) => {
		setVisibleUpdate(true)
		setUpdateData(record)
	}, [])

	const handlePageChange = ( _pageSize: number) => {
		updateState({ pageSize: _pageSize })
		// setPage(()=>_currentPage)
	}

	const selectList = useDropdownTree(selectData,'name')
	const fetchFunc = async ()=>{
		await tree({})
		.then((rsp) => {
			console.log(rsp)
			const { items} = rsp.data
			setSelectData(items)
		})
	}
	const debouncedFetch = useDebounceFetch(fetchFunc); 
	const fetchData = async () => {
		setLoading(true)
		await debouncedFetch()
		.then(()=>{
			setLoading(false)
		})
	}

	useEffect(()=>{
		fetchData()
	},[])

	const dealData = () => {
		// let flag = false
		// if (!data) return
		// data.forEach((item) => {
		// 	if (item.deleteAt) {
		// 		flag = true
		// 		return
		// 	}
		// 	if (item.children && item.children.length > 0) {
		// 		item.children.forEach((it) => {
		// 			if (it.deleteAt) {
		// 				flag = true
		// 				return
		// 			}
		// 		})
		// 	}
		// })
		return true
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
				dataSource={selectList}
				pagination={{
					// currentPage,
					pageSize,
					// total,
					onPageSizeChange: handlePageChange,
					showSizeChanger: true,
					pageSizeOpts: [5, 10, 20, 50]
				}}
				size="small"
				loading={loading}
			/>

			<ModalAddCategory
				visible={visibleAdd}
				setVisible={setVisibleAdd}
				selectList={selectList}
				refreshData={fetchData}
			></ModalAddCategory>
			<ModalUpdateCategory
				visible={visibleUpdate}
				setVisible={setVisibleUpdate}
				selectList={selectList}
				initValues={updateData}
				refreshData={fetchData}
			></ModalUpdateCategory>
		</>
	)
}

export default Index
