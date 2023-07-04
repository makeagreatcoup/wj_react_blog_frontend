/* eslint-disable no-console */
import { Toast } from '@douyinfe/semi-ui'
import React, { useState } from 'react'
import { uploadFile } from './Firebase'
import FileCard from './UploadItem'

const UploadFile = ({fileUrl}) => {
	const [error, setError] = useState(false)
  const [success, setSuccess]=useState(false)
  const [percent, setPercent] = useState(0)

	const fileCallback = (file) => {
    console.log(file)
		uploadFile(file, undefined, (process) => {
			setPercent(process)
		})
			.then((downloadURL) => {
        setSuccess(true)
        fileUrl(downloadURL)
				console.log('File available at', downloadURL)
				// 进行上传完成后的操作
			})
			.catch((error) => {
				Toast.error('上传服务异常')
        setError(true)
				// 处理错误情况
			})
	}
	return (
		<>
			
			<FileCard 
      number={1}
      percent={percent}
      setPercent={setPercent}
      fileCallback={fileCallback}
      onError={error}
      setError={setError}
      onSuccess={success}
      setSuccess={setSuccess}
			></FileCard>
		</>
	)
}

export default UploadFile
