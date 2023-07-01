/* eslint-disable no-console */
import React, { useEffect, useState } from 'react'
import { Button, Table, Popconfirm, Toast, ButtonGroup, Avatar } from '@douyinfe/semi-ui'
import { IconReply, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import ModalAddComment from '@/components/comment/add'
import ModalUpdateComment from '@/components/comment/update'
import CommentSearchForm from '@/components/comment/search'
import { getFirstWord, getRandomColor } from '@/utils/utils'
import Label from '@douyinfe/semi-ui/lib/es/form/label'

const Index: React.FC = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setPage] = useState(1)
	const [updateData,setUpdateData]=useState({})

  // 文章标题下拉框
  const [options,setOptions] = useState([])
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
			title: '评论内容',
			dataIndex: 'body',
      width: 300,
			key: 'body'
		},
    {
			title: '文章标题',
			dataIndex: 'post.title',
			width: 300,
			key: 'post.title'
		},
    {
      title:'评论人',
      dataIndex:'',
			align: 'center',
      key:'',
      render:(record)=>{
        return(
          <>
            <Avatar color={record.customer.color?record.customer.color:getRandomColor()} style={{ margin: 4 }} alt={record.customer.nickname}>{getFirstWord(record.customer.nickname)}</Avatar>
            <Label>{record.customer.nickname}</Label>
          </>
        )
      }
    },
    {
      title: '评论时间',
			dataIndex: 'createdAt',
			align: 'center',
			key: 'createdAt'
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
				const content = record.children ? '该项还存在子项' : ''
				return (
					<>
						<Button style={{ marginLeft: 10 }} onClick={()=>onUpdate(record)}>
              <IconReply />
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
			depth: 0,
			parent:'',
			deleteAt: null,
      post:{
        title:'就爱看clans流程'
      },
      customer:{
        nickname:'王得到',
				color:''
      },
      body:'爱吹牛四川拿骚萨斯开始',
			children: [
				{
					key: 11,
          depth: 1,
          parent:'1',
          deleteAt: null,
          customer:{
            nickname:'王得到'
          },
          post:{
            title:'就爱看clans流程'
          },
          body:'奥克斯你擦迫使你哦擦拭',
          children: [
            {
              key: 111,
              depth: 2,
              parent:'1',
              customer:{
                nickname:'王得到'
              },
              deleteAt: null,
              post:{
                title:'就爱看clans流程'
              },
              body:'哦怕v啊惧怕',
            },
            {
              key: 112,
              depth: 2,
              parent:'1',
              customer:{
                nickname:'王得到'
              },
              deleteAt: null,
              post:{
                title:'就爱看clans流程'
              },
              body:'和货物v阿斯顿擦拭',
            }
          ]
				},
				{
					key: 12,
          depth: 1,
          parent:'1',
          deleteAt: null,
          customer:{
            nickname:'王得到'
          },
          post:{
            title:'就爱看clans流程'
          },
          body:'西安可能CPA叫偶怕谁',
				}
			]
		},
		{
			key: 2,
			depth: 0,
			parent:'',
			deleteAt: null,
      customer:{
        nickname:'王得到'
      },
      post:{
        title:'吧v怕送派军舰前往我去看了的'
      },
      body:'爱吹牛四川拿骚萨斯开始',
			children: [
				{
					key: 21,
          depth: 1,
          parent:'2',
          deleteAt: null,
          customer:{
            nickname:'王得到'
          },
          post:{
            title:'吧v怕送派军舰前往我去看了的'
          },
          body:'奥克斯你擦迫使你哦擦拭',
          children: [
            {
              key: 211,
              depth: 2,
              parent:'21',
              deleteAt: null,
              customer:{
                nickname:'王得到'
              },
              post:{
                title:'吧v怕送派军舰前往我去看了的'
              },
              body:'哦怕v啊惧怕',
            },
            {
              key: 212,
              depth: 2,
              parent:'21',
              deleteAt: null,
              customer:{
                nickname:'王得到'
              },
              post:{
                title:'吧v怕送派军舰前往我去看了的'
              },
              body:'和货物v阿斯顿擦拭',
            }
          ]
				},
				{
					key: 22,
          depth: 1,
          parent:'2',
          deleteAt: null,
          customer:{
            nickname:'王得到'
          },
          post:{
            title:'就爱看clans流程'
          },
          body:'西安可能CPA叫偶怕谁',
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
    setOptions(selectList)
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
			
      <div style={{marginBottom:20,justifyContent:'space-between'}}>
        <CommentSearchForm></CommentSearchForm>
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
				dataSource={data}
				pagination={{
					currentPage,
					pageSize: pageSize,
					total: data.length,
					onPageChange: handlePageChange
				}}
				loading={loading}
			/>

			<ModalAddComment visible={visibleAdd} setVisible={setVisibleAdd} selectList={options}></ModalAddComment>
			<ModalUpdateComment visible={visibleUpdate} setVisible={setVisibleUpdate} selectList={options} initValues={updateData}></ModalUpdateComment>
		</>
	)
}

export default Index
