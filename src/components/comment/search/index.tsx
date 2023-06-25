import React from 'react'
import { Button, Form, Toast } from "@douyinfe/semi-ui";

const CommentSearchForm=({options})=>{
  const onSubmit=(values)=>{
    Toast.success('提交成功')
  }


  return (
    <>
      <Form 
          
          layout='horizontal'
          labelPosition='left'
          labelAlign='right'
        >
          {({ formState, values, formApi }) => (
            <>
              <Form.Select label="文章" field='name' style={{ width: 400 }} optionList={options}>
              </Form.Select>
              <Button type="primary" htmlType="submit" className="btn-margin-right" onClick={()=>onSubmit(values)}>提交</Button>
            </>
          )}

        </Form>
    </>
  )
}
export default CommentSearchForm;