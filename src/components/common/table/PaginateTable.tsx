import { Form, Table } from '@douyinfe/semi-ui'
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table'
import React from 'react'

type Props = {
  columns: ColumnProps[],
  dataSource: any[],
  currentPage?: number,
  pageSize?: number,
  total?: number,
  onChange?: any,
  loading:boolean,
}

const Index: React.FC<Props> = ({
  columns,
  dataSource,
  currentPage = 1,
  pageSize = 10,
  total = 0,
  onChange,
  loading
}) => {

  
  return (
    <>
			<Table
				columns={columns}
				defaultExpandAllRows
				dataSource={dataSource}
				pagination={{
					currentPage,
					pageSize,
					total,
					onChange: onChange,
					showSizeChanger:true,
					pageSizeOpts:[5, 10, 20, 50]
				}}
				size='small'
				loading={loading}
			/>
			
		</>
  )
}
export default Index