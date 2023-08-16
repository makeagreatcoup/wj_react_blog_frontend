/* eslint-disable no-console */
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Table, Popconfirm, Toast, Typography, Tag,Image, TagGroup } from '@douyinfe/semi-ui'
import { IconEdit, IconDelete } from '@douyinfe/semi-icons'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import { getColor } from '@/utils/utils'
import PostSearch from '@/components/blog/search'
import { useNavigate  } from 'react-router-dom';
import useStateStore from '../store'
import { list, remove } from '@/config/api/post'
import { useDebounceFetch } from '@/hooks/useDebounce'
import { useDropdownTree } from '@/hooks/useDropdownTree'
import { useDropdown } from '@/hooks/useDropdown'
import useCategoryStore from '@/pages/category/store/useStore'
import useTagStore from '@/pages/tag/store/useStore'
import { format } from 'date-fns';

const Index: React.FC = () => {

	const history = useNavigate();
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(false)
	const [currentPage, setPage] = useState(1)
	// 是否开启软删除
	const [trash, setTrash] = useState('none')
	const { pageSize, updateState } = useStateStore((state) => state)
	const [total, setTotal] = useState(0)
	const [search, setSearch] = useState({})

	// const [categoryOptions, setCategoryOptions] = useState([])
	const columns = useMemo(()=>[
		{
			title: '标题',
			dataIndex: 'title',
			width: 200,
			className: 'first-col',
			key: 'title'
		},
		{
			title: '描述',
			dataIndex: 'summary',
			width: 200,
			className: 'first-col',
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
			dataIndex: 'category',
      align:'center',
			className: 'first-col',
      width:100,
			key: 'category',
			render:(record)=>{
				if(!record)return
				return record.name
			}
		},
		{
			title: '标签',
			dataIndex: 'tags',
			key: 'tags',
      align:'center',
      width:100,
      render:(record)=>{
				if(!record)return
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
      width:150,
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
			title: '操作',
			dataIndex: '',
			key: '',
			width: 150,
      fixed: 'right',
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
	] as ColumnProps[],[])
  const scroll = useMemo(() => ({ x: 1200 }), []);
  const srcList = useMemo(() => ([
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/sky.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/greenleaf.jpg",
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/colorful.jpg",
]), []); 

	useEffect(() => {
		fetchData()
		fetchCategoryData()
		fetchTagData()
	}, [])
	useEffect(() => {
		if (currentPage === 1) {
			fetchData()
		}
		setPage(1)
	}, [search])
	const {categoryData,fetchCategoryData} = useCategoryStore(state=>state)
	const categoryOptions = useDropdownTree(categoryData,'name')

	const {tagData,fetchTagData} = useTagStore(state=>state)
	const tagOptions = useDropdown(tagData,'title')


	const fetchFunc = async () => {
		await list({ ...search,page:currentPage,limit:pageSize})
		.then((rsp)=>{
			console.log(rsp)
			const {items,meta}=rsp.data;
			setData(items as [])
			setTotal(meta.totalItems||0)
		})
		.catch((err)=>{console.log(err)})
	}
	const debouncedFetch = useDebounceFetch(fetchFunc)
	
	const fetchData = async () => {
		setLoading(true)
		await debouncedFetch().then(() => {
			setLoading(false)
		})
		dealData()
		setTrash('')
	}
	const handleSearch = (e: any) => {
		setSearch({ ...e })
	}
	const handlePageChange = (_currentPage: number, _pageSize: number) => {
		updateState({ pageSize: _pageSize })
		setPage(_currentPage)
	}
	const onUpdate=(record)=>{
		console.log(record)
		history('/blog/update',{state:record})
	}
	const onDeleteConfirm = useCallback(async (id) => {
		await remove({id})
		.then((rsp)=>{
			Toast.success('删除成功')
			fetchData()
		})
		.catch((err)=>{console.log(err)})
	},[])


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
      <PostSearch categoryOptions={categoryOptions} tagOptions={tagOptions} setSearch={handleSearch}></PostSearch>
      <Table
				columns={columns}
				defaultExpandAllRows
        style={{height:100}}
				dataSource={data}
				pagination={{
					currentPage,
					pageSize: pageSize,
					total: total,
					onChange: handlePageChange
				}}
        size='small'
        scroll={scroll}
				loading={loading}
			/>
			

		</>
	)
}

export default Index
