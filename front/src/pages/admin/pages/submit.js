import { ApiEntry } from "../../../App";
import firebaseApp from "../../../fire";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


const submit=async(imageWasChanged, updatedData,previousData,file,nav)=>{
//firstly, I check if image or datat was changed to avoid needless API calls, I only make API calls if changes were made by the user
         
    const dataWasChanged=Object.keys(updatedData).some(key=>updatedData[key]!==previousData[key]);
    if(dataWasChanged||imageWasChanged){
        if(file&&imageWasChanged){
            
const storage = getStorage(firebaseApp);
const storageRef = ref(storage, `${'products'}/${file.name}`);

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
      

      fetch(`${ApiEntry}/products/edit/${previousData._id}`,{
    method:'PUT',
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify({
        ...updatedData,
        displayImage:downloadURL


        
    })
}).then((res=>res.json())).then(data=>{if(data.success){nav(0)}})

}

    );
    
  }
  );

        }
        else{

            fetch(`${ApiEntry}/products/edit/${previousData._id}`,{
                method:'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(updatedData)
            }).then((res=>res.json())).then(data=>{if(data.success){nav(0)}})
            
            
        }
    }


}
 export default submit
