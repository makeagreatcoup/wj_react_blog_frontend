import { Form } from '@douyinfe/semi-ui'
import Title from '@douyinfe/semi-ui/lib/es/typography/title'
import React from 'react'

type BlogSwitchProps = {
  field: string,
  label: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal,
  initValue?: boolean,
  checkedText?: string,
  uncheckedText?: string,
  onChange: (checked: boolean, e: React.ChangeEvent<HTMLInputElement>) => void,
}

const BlogSwitch: React.FC<BlogSwitchProps> = ({
  field,
  label,
  initValue = true,
  checkedText = 'ON',
  uncheckedText = 'OFF',
  onChange
}) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Title heading={6} style={{ fontSize: 14 }}>
        {label}
      </Title>
      <Form.Switch field={field} label onChange={onChange} initValue={initValue} checkedText={checkedText} uncheckedText={uncheckedText} />
    </div>
  )
}
export default BlogSwitch