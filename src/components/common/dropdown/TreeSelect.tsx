import React from 'react'
import { Form } from '@douyinfe/semi-ui'
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree'

type Props = {
	field: string
	label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal
	options: TreeNodeData[]
	placeholder: string,
  style: React.CSSProperties
}

const Index: React.FC<Props> = ({ field, label, placeholder, style,options }) => {

	return (
		<>
			<Form.TreeSelect
				style={style}
				field={field}
				label={label}
				placeholder={placeholder}
				treeData={options}
				dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
			></Form.TreeSelect>
		</>
	)
}
export default Index