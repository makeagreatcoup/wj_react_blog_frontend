/* eslint-disable no-console */
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// import { v4 as uuidv4 } from 'react-uuid';


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  // ...
  storageBucket: 'gs://wjblogfirebase.appspot.com'
  // storageBucket:'gs://wjblogfirebase2.appspot.com'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


export const uploadFile = (file, fileType = 'images', progressCallback?) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, fileType);
    const fileRef = ref(storageRef, file.name);
    const uploadTask = uploadBytesResumable(fileRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        // 计算上传进度
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // 调用进度回调函数更新进度
        if (progressCallback) {
          progressCallback(progress);
        }
      },
      (error) => {
        // 错误处理
        reject(error);
      },
      () => {
        // 上传完成后的操作
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL);
        }).catch((error) => {
          reject(error);
        });
      }
    );
  });
};


// export const deleteFile=()=>{
//   const desertRef = ref(storage, 'images/desert.jpg');

//   // Delete the file
//   deleteObject(desertRef).then((e) => {
//     // File deleted successfully
//   }).catch((error) => {
//     // Uh-oh, an error occurred!
//   });
// }

