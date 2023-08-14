/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Table, Popconfirm, Toast, ButtonGroup } from '@douyinfe/semi-ui'
import { IconReply, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import ModalAddComment from '@/components/comment/add'
import ModalUpdateComment from '@/components/comment/update'
import CommentSearchForm from '@/components/comment/search'
import useStateStore from '../store'
import { remove, treePaginate } from '@/config/api/comment'
import { titleList } from '@/config/api/post'
import { searchList } from '@/config/api/customer'
import { useDebounceFetch } from '@/hooks/useDebounce'
import { useDropdownTree } from '@/hooks/useDropdownTree'
import { useDropdown } from '@/hooks/useDropdown'
import { format } from 'date-fns'

const Index: React.FC = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)

	const [updateData, setUpdateData] = useState({})

	// 文章标题下拉框
	const [options, setOptions] = useState([])
	//用户下拉框
	const [customerOptions, setCustomerOptions] = useState([])
	// 是否开启软删除
	const [trash, setTrash] = useState('none')

	const [visibleAdd, setVisibleAdd] = useState(false)
	const [visibleUpdate, setVisibleUpdate] = useState(false)
	const { pageSize, updateState } = useStateStore((state) => state)
	const [currentPage, setPage] = useState(1)
	const [total, setTotal] = useState(0)
	//查询条件
	const [search, setSearch] = useState({})

	const columns = useMemo(
		() =>
			[
				{
					title: '评论内容',
					dataIndex: 'body',
					width: 300,
					className: 'first-col',
					key: 'body'
				},
				{
					title: '文章标题',
					dataIndex: 'post.title',
					width: 300,
					className: 'first-col',
					key: 'post.title'
				},
				{
					title: '评论人',
					dataIndex: 'customer',
					align: 'center',
					className: 'first-col',
					key: 'customer',
					render: (record) => {
						return (
							<>
								{/* <Avatar color={record.customer.color?record.customer.color:getRandomColor()} style={{ margin: 4,width:40,height:40 }} alt={record.customer.nickname}>{getFirstWord(record.customer.nickname)}</Avatar> */}
								{record.nickname}
							</>
						)
					}
				},
				{
					title: '评论时间',
					dataIndex: 'createdAt',
					align: 'center',
					key: 'createdAt',
					render:(record)=>{
						return (
							<>
								{format(new Date(record), 'yyyy-MM-dd HH:MM')}
							</>
						)
					}
				},
				{
					title: '层级',
					dataIndex: 'depth',
					align: 'center',
					key: 'depth'
				},

				{
					title: '操作',
					dataIndex: '',
					key: '',
					width: 200,
					align: 'center',
					render: (text, record, index) => {
						const content =
							record.children && record.children.length ? (
								<>
									<span>该项还存在子项,</span>
									<br />
									<span style={{ color: 'red' }}>删除后子评论将同步删除</span>
								</>
							) : (
								''
							)
						return (
							<>
								{record.depth >= 5 ? null : (
									<Button style={{ marginLeft: 10 }} onClick={() => onUpdate(record)}>
										<IconReply />
									</Button>
								)}

								<Popconfirm title="确定要删除？" content={content} onConfirm={() => onDeleteConfirm(record.id)}>
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

	const selectTitleList = useDropdown(options, 'title')
	const selectCustomerList = useDropdown(customerOptions, 'nickname')
	const selectList = useDropdownTree(data)

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
	const fetchFunc = async () => {
		await treePaginate({ ...search, page: currentPage, limit: pageSize })
			.then((rsp) => {
				console.log(rsp)
				const { items, meta } = rsp.data
				setData(items as [])
				setTotal(meta.totalItems || 0)
			})
	}
	const debouncedFetch = useDebounceFetch(fetchFunc)
	const fetchData = async () => {
		setLoading(true)
		await debouncedFetch().then(() => {
			setLoading(false)
		})
	}
	const fetchTitleList = async () => {
		await titleList()
			.then((rsp) => {
				console.log(rsp)
				const { items } = rsp.data
				setOptions(items)
				// setTotal(items.length || 0)
			})
			.catch((err) => {
				console.log(err)
			})
	}
	const fetchCustomerList = async () => {
		await searchList()
			.then((rsp) => {
				console.log(rsp)
				const { items } = rsp.data
				setCustomerOptions(items)
				// setTotal(items.length || 0)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const onUpdate = (record) => {
		setVisibleUpdate(true)
		setUpdateData(record)
	}
	const handlePageChange = (_currentPage: number, _pageSize: number) => {
		updateState({ pageSize: _pageSize })
		setPage(_currentPage)
	}
	const handleSearch = (e: any) => {
		setSearch({ ...e })
	}
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
			if (item.children?.length > 0) {
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

	useEffect(() => {
		fetchTitleList()
		fetchCustomerList()
	}, [])
	useEffect(() => {
		fetchData()
	}, [currentPage, pageSize])
	useEffect(() => {
		if (currentPage === 1) {
			fetchData()
		}
		setPage(1)
	}, [search])

	return (
		<>
			<div style={{ marginBottom: 20, justifyContent: 'space-between' }}>
				<CommentSearchForm
					setSearch={handleSearch}
					selectTitleList={selectTitleList}
					selectCustomerList={selectCustomerList}
				></CommentSearchForm>
			</div>
			<ButtonGroup>
				<Button onClick={createData} type="primary" style={{ marginBottom: 10 }}>
					新增
				</Button>
				<Button type="warning" disabled={dealData()} style={{ marginBottom: 10, marginLeft: 10, display: trash }}>
					回收站
				</Button>
			</ButtonGroup>
			<Table
				columns={columns}
				defaultExpandAllRows
				dataSource={selectList}
				pagination={{
					currentPage,
					pageSize,
					total,
					onChange: handlePageChange,
					showSizeChanger: true,
					pageSizeOpts: [5, 10, 20, 50]
				}}
				size="small"
				loading={loading}
			/>

			<ModalAddComment
				visible={visibleAdd}
				setVisible={setVisibleAdd}
				selectList={selectTitleList}
				refreshData={fetchData}
			></ModalAddComment>
			<ModalUpdateComment
				visible={visibleUpdate}
				setVisible={setVisibleUpdate}
				selectList={selectTitleList}
				initValues={updateData}
				refreshData={fetchData}
			></ModalUpdateComment>
		</>
	)
}

export default Index
