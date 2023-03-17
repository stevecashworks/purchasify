import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ApiEntry } from "../../App";
import firebaseApp from '../../fire'

const uploadToFirebase= async(file,type,filename,path,data,nav)=>{
 

const storage = getStorage(firebaseApp);
console.log('path:',path)
const storageRef = ref(storage, `${path}/${filename}`);

const uploadTask = uploadBytesResumable(storageRef, file);

await uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:break;
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    console.log(error)
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      
      const {categories,price,name,description}=data

      if(type==="products"){fetch(`${ApiEntry}/products/add`,{
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        name,
        displayImage:downloadURL,
        categories:categories.split(',').filter(x=>x!==" "),
        description,
        price


        
    })
}).then((res=>res.json())).then(data=>{if(data.success){nav(0)}})

}
else{
  fetch(`${ApiEntry}/user/register`,{
    method:'POST',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        ...data,
        image:downloadURL


        
    })
}).then((res=>res.json())).then(data=>{if(data.success){nav(0)}})

}

    });
    
  }
  );
  

    
}
export default uploadToFirebase