/* eslint-disable no-console */
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Table, Popconfirm, Toast, Typography, Tag,Image, TagGroup } from '@douyinfe/semi-ui'
import { IconEdit, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import { getColor } from '@/utils/utils'
import PostSearch from '@/components/blog/search'

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
			title: '标题',
			dataIndex: 'title',
			width: 200,
			key: 'title'
		},
		{
			title: '描述',
			dataIndex: 'summary',
			width: 200,
			key: 'summary'
		},
		{
			title: '封面',
			dataIndex: 'cover',
			width: 100,
      align:'center',
			key: 'cover',
      render:(record)=>{
        return(
          <>
            <Image
            width={50}
            height={50}
            src={record}
            preview={{
                src: record
            }}
        />
          </>
        )
      }
		},
		{
			title: '所属分类',
			dataIndex: 'type',
      align:'center',
      width:100,
			key: 'type'
		},
		{
			title: '标签',
			dataIndex: 'tags',
			key: 'tags',
      align:'center',
      width:100,
      render:(record)=>{
        const tagList = record.map(item => ({
          color: getColor(item.color),
          children: item.title,
          style:{margin:'0 auto'}
        }));
				return(
					<>
            <TagGroup maxTagCount={2} tagList={tagList} />
					</>
				)
			}
		},
		{
			title: '是否发布',
			dataIndex: 'publishedAt',
			key: 'publishedAt',
      align:'center',
      width:100,
      render:(record)=>{
				return(
					<>
						<Typography.Text strong={true} type={record?'success':'danger'}>{record?'已发布':'未发布'}</Typography.Text>
					</>
				)
			}
		},
		{
			title: '状态',
			dataIndex: 'state',
			align:'center',
			key: 'state',
      width:100,
			render:(record)=>{
				return(
					<>
						<Typography.Text strong={true} type={record==='ON'?'success':'danger'}>{record}</Typography.Text>
					</>
				)
			}
		},
		{
			title: '创建时间',
			dataIndex: 'createdAt',
      align:'center',
      width:100,
			key: 'createdAt'
		},

		{
			title: '操作',
			dataIndex: '',
			key: '',
			width: 200,
      fixed: 'right',
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
  const scroll = useMemo(() => ({ x: 1200 }), []);
  const srcList = useMemo(() => ([
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/greenleaf.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/colorful.jpg",
]), []); 
	const data1 = [
		{
			key: 1,
			title: '标签1',
			summary: '啊擦撒内存空间拉萨',
			cover: srcList[0],
			state:'ON',
      type:'分类1',
      tags:[{
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
      },],
      publishedAt:'asdasfasd'
		},
		{
			key: 2,
			title: '标签2',
			summary: '啊擦撒内存空间拉萨',
			cover: srcList[1],
			state:'ON',
      type:'分类1',
      tags:[
      {
        key: 3,
        title: '标签3',
        summary: '啊擦撒内存空间拉萨',
        color: 'grey',
        state:'ON'
      }],
      publishedAt:'asdasfasd'
		},
		{
			key: 3,
			title: '标签3',
			summary: '啊擦撒内存空间拉萨',
			cover: srcList[2],
			state:'ON',
      type:'分类1',
      tags:[{
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
      }],
      publishedAt:''
		},
		{
			key: 4,
			title: '标签4',
			summary: '啊擦撒内存空间拉萨',
			cover: srcList[3],
			state:'ON',
      type:'分类1',
      tags:[{
        key: 4,
        title: '标签4',
        summary: '啊擦撒内存空间拉萨',
        color: 'indigo',
        state:'ON',
        publishedAt:''
      },
      {
        key: 5,
        title: '标签5',
        summary: '啊擦撒内存空间拉萨',
        color: 'light-blue',
        state:'OFF'
      }]
		},
		{
			key: 5,
			title: '标签5',
			summary: '啊擦撒内存空间拉萨',
			cover: srcList[3],
			state:'OFF',
      type:'分类1',
      tags:[{
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
      },{
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
      }],
      publishedAt:''
		},

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
			{/* <Button onClick={createData} type="primary" style={{ marginBottom: 10 }}>
				新增
			</Button>
			<Button type="warning" disabled={dealData()} style={{ marginBottom: 10, marginLeft: 10, display: trash }}>
				回收站
			</Button> */}
      <PostSearch></PostSearch>
      <Table
				columns={columns}
				defaultExpandAllRows
        style={{height:100}}
				dataSource={data}
				pagination={{
					currentPage,
					pageSize: pageSize,
					total: data.length,
					onPageChange: handlePageChange
				}}
        size='small'
        scroll={scroll}
				loading={loading}
			/>
			

		</>
	)
}

export default Index
