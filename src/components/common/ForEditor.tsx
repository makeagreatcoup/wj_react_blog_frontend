/* eslint-disable no-console */
import React, { useRef } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { SimpleUploadAdapter } from '@ckeditor/ckeditor5-upload';

// const ForEditor = () => {
//   const editorRef = useRef<any>();
//   const addImg = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     // const res = await upload(formData);
//     const res = [
//       {
//         hash: 'FgOETQ8j4Zpygl6WWpZQ_75N20Sf',
//         key: '3a4e66a577cde9b8e8c5550dc51aaaba.png',
//         url: 'http://img.nevergiveupt.top/3a4e66a577cde9b8e8c5550dc51aaaba.png',
//       },
//     ];
//     if (res) {
//       editorRef.current.$img2Url(file.name, res[0].url);
//     }
//   };
//   return (
//     <Editor
//       height='90%'
//       ref={(el) => (editorRef.current = el)}
//       addImg={(file) => addImg(file)}
//       placeholder="请撰写文章"
//     />
//   )
// }
const ForEditor = () => {
	return (<></>
		// <CKEditor
		// 	editor={ClassicEditor}
		// 	data="<p>Hello from CKEditor 5!</p>"
		// 	onReady={(editor) => {
		// 		// You can store the "editor" and use when it is needed.
		// 		console.log('Editor is ready to use!', editor)
        
		// 	}}
      
		// 	config={{
    //     // plugins:[ SimpleUploadAdapter ],  
		// 		// simpleUpload: {
		// 		// 	uploadUrl: '',
		// 		// 	withCredentials: true,
		// 		// 	headers: {
		// 		// 		'X-CSRF-TOKEN': 'CSRF-Token',
		// 		// 		Authorization: 'Bearer <JSON Web Token>'
		// 		// 	},
    //       // 
		// 		// },
    //     toolbar:['undo', 'redo',
    //     '|', 'heading',
    //     '|', 'bold', 'italic',
    //     '|', 'link', 'uploadImage', 'insertTable', 'mediaEmbed',
    //     '|', 'bulletedList', 'numberedList', 'outdent', 'indent']
		// 	}}
		// 	onChange={(event, editor) => {
		// 		const data = editor.getData()
		// 		console.log({ event, editor, data })
		// 	}}
		// 	onBlur={(event, editor) => {
		// 		console.log('Blur.', editor)
		// 	}}
		// 	onFocus={(event, editor) => {
		// 		console.log('Focus.', editor)
		// 	}}
    //   onError={(event,editor)=>{
    //     console.log('Error.', editor)
    //   }}
		// />
	)
}

export default ForEditor
