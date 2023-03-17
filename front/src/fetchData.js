const fetchData=async(endPoint,method,onSuccess,token,body)=>{
     const options={method,headers:{"Content-Type":"application/json"}}
     if(token){options.headers.tk=token};
     if(body){options.body=JSON.stringify(body)}
    try {
         const  fetched=await fetch(endPoint,options)
         const data=await fetched.json()
         if(data.success){
            onSuccess(data.result)
         }
          

         
    } catch (error) {
        console.log(error)
        
    }
}
export  default fetchData