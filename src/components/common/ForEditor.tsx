/* eslint-disable no-console */
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor, IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { uploadFile } from './Firebase'
import { Toast } from '@douyinfe/semi-ui'

type InsertFnType = (url: string, alt: string, href: string) => void
type InsertVideoFnType = (url: string, poster: string ) => void

interface EditorProps {
	initHtml:string,
  htmlCallback?:any;
}

const ForEditor: React.FC<EditorProps> =  ({initHtml,htmlCallback}) => {
	const editorConfig: Partial<IEditorConfig> = {
		// TS 语法
		MENU_CONF: {}

		// 其他属性...
	}

	// 修改 uploadImage 菜单配置
	editorConfig.MENU_CONF['uploadImage'] = {
		// 自定义上传
		async customUpload(file: File, insertFn: InsertFnType) {
			// file 即选中的文件
			// 最后插入图片
			uploadFile(file, undefined)
				.then((downloadURL) => {
					insertFn(downloadURL as string, file.name, downloadURL as string)
					// 进行上传完成后的操作
				})
				.catch((error) => {
					Toast.error('上传服务异常')
					// 处理错误情况
				})
		}
	}
  editorConfig.MENU_CONF['uploadVideo'] = {
    // 自定义上传
    async customUpload(file: File, insertFn: InsertVideoFnType) {  // TS 语法
    // async customUpload(file, insertFn) {                   // JS 语法
        // file 即选中的文件
        // 自己实现上传，并得到视频 url poster
        uploadFile(file, "video")
				.then((downloadURL) => {
					insertFn(downloadURL as string, file.name)
					// 进行上传完成后的操作
				})
				.catch((error) => {
					Toast.error('上传服务异常')
					// 处理错误情况
				})
    }
}
	// editor 实例
	const [editor, setEditor] = useState<IDomEditor | null>(null)

	// 编辑器内容
	const [html, setHtml] = useState('')

	// 模拟 ajax 请求，异步设置 html
	useEffect(() => {
		if(initHtml){
			setTimeout(() => {
				setHtml(initHtml)
			}, 100)
		}
	}, [initHtml])

	// 工具栏配置
	const toolbarConfig: Partial<IToolbarConfig> = {} // TS 语法
	// 及时销毁 editor ，重要！
	useEffect(() => {
		return () => {
			if (editor == null) return
			editor.destroy()
			setEditor(null)
		}
	}, [editor])
  const onChange=(editor)=>{
		if(editor.getHtml()==='<p><br></p>'){
			return 
		}
    setHtml(editor.getHtml())
		if(htmlCallback){
			htmlCallback(editor.getHtml())
		}
  }
	return (
		<>
			<div style={{ zIndex: 100 }}>
				<Toolbar
					editor={editor}
					defaultConfig={toolbarConfig}
					mode="default"
					style={{ borderBottom: '1px solid #ccc' }}
				/>
				<Editor
					defaultConfig={editorConfig}
					value={html}
					onCreated={setEditor}
					onChange={onChange}
					mode="default"
					style={{ height: '250px', overflowY: 'hidden' }}
          
				/>
			</div>
			{/* <div style={{ marginTop: '15px' }}>{html}</div> */}
		</>
	)
}

export default ForEditor
