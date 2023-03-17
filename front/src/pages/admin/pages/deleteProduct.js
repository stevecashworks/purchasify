
 const deleteProduct=async(id, move)=>{
const proceed=window.confirm('Are you sure you want to delete this product?')
if(proceed){

  const fetched =await fetch(`http://localhost:3000/api/v3/products/delete/${id}`,{
    method:"DELETE",
    headers:{
      "Content-Type":'application/json'
        }
        
      }).then(res=>res.json()).then(data=>{console.log(data);if(data.success){move(0)}})
      
      
      
    }
 }
 export default  deleteProduct