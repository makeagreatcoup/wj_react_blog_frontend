/* eslint-disable no-console */
import { Button } from '@douyinfe/semi-ui'
import React, { useEffect, useRef, useState } from 'react'
import { cssClasses } from '@douyinfe/semi-foundation/upload/constants'
import cls from 'classnames'
import { IconUpload, IconClose ,IconUploadError} from '@douyinfe/semi-icons'

interface FileCardProps {
  number: number;
  percent: number
  setPercent: any;
  onError?:boolean;
  setError:any;
  onSuccess?:boolean;
  setSuccess:any;
  fileCallback:any
}

const FileCard: React.FC<FileCardProps> = ({number,percent,setPercent,onError=false,setError,onSuccess,setSuccess,fileCallback}) => {
	const [disabled, setDisabled] = useState(false)

	const prefixCls = cssClasses.PREFIX
	const mainCls = `${prefixCls}-file-list-main`
	const fileListCls = cls(`${prefixCls}-file-list`)

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState([]);


  useEffect(() => {
    if (fileList.length === number && !disabled) {
      setDisabled(true);
    }else{
      setDisabled(false)
    }
  }, [fileList]);

  const handleFileChange = props => {
    const file = props.target.files[0];
    fileCallback(file)
    const reader = new FileReader();
    reader.onload = () => {
      setFileList(prevFileList => {
        const updatedFileList = [...prevFileList, {name:file.name,url:reader.result,size:file.size}];
        return updatedFileList;
      });
    };
    reader.readAsDataURL(file);
  };

  const processStyle={
     background: 'var(--semi-color-success)', 
     width: `${percent}%` 
  }
  const onDelete = index =>{
    const list=[...fileList]
    list.splice(index, 1);
    setFileList(list)
  }
  const handleClick = () => {
    setPercent(0);
    setError(false);
    setSuccess(false)
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

	return (
    <>
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        onClick={(event) => {
          event.currentTarget.value = null; // 清空文件选择
        }}
      />
      <Button icon={<IconUpload />} theme="light" onClick={handleClick} disabled={disabled}>选择文件</Button>
    </div>
    <div className={fileListCls}>
			{/* <div className={titleCls}>
				<span className={`${titleCls}-choosen`}>已选择</span>
				<span role="button" tabIndex={0} onClick={onClear} className={`${titleCls}-clear`}>
					清除
				</span>
			</div> */}
			<div className={mainCls} role="list" aria-label="file list">
				{fileList.map((file, index) => {
					return (
						<div role="listitem" className={`semi-upload-file-card ${onError?'semi-upload-file-card-fail':''}`}  key={index}>
							<div className="semi-upload-file-card-preview">
								<img
									src={file.url}
									alt={file.name}
								/>
							</div>
							<div className="semi-upload-file-card-info-main">
								<div className="semi-upload-file-card-info-main-text">
									<span className="semi-upload-file-card-info-name">{file.name}</span>
									<span>
										<span className="semi-upload-file-card-info-size">{Math.floor(file.size/1024)}KB</span>
									</span>
								</div>
                {!onSuccess&&!onError?
                    (
                      <div
                        className="semi-progress semi-progress-horizontal"
                        role="progressbar"
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={0}
                        aria-label="uploading file progress"
                        style={{ width: '100%'}}
                      >
                        <div
                          className="semi-progress-track"
                          aria-hidden="true"
                          style={{ backgroundColor: 'var(--semi-color-fill-0)' }}
                        >
                          <div
                            className="semi-progress-track-inner"
                            aria-hidden="true"
                            style={processStyle}
                          ></div>
                        </div>
                      </div>
                    ):""}
								<div className="semi-upload-file-card-info-main-control">
									<span className="semi-upload-file-card-info-validate-message">
                    {onError?
                    (
                      <>
                        <IconUploadError style={{color:'red'}}/>
                        <span style={{color:'red'}}>上传失败</span>
                      </>
                    ):""}
                  </span>
								</div>
							</div>
							<button
								className="semi-button semi-button-tertiary semi-button-size-small semi-button-borderless semi-upload-file-card-close semi-button-with-icon semi-button-with-icon-only"
								type="button"
								aria-disabled="false"
							>
                <IconClose onClick={()=>onDelete(index)}/>
							</button>
						</div>
					)
				})}
			</div>
		</div>
    </>
		
	)
}
export default FileCard
