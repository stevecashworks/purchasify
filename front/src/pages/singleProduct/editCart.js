import { ApiEntry } from "../../App";
import { addToCart } from "../../redux/slices/ShoppingSlice";
export const removeFromCart=async(productId,dispatch,setAlert)=>{
    await fetch(`${ApiEntry}/cart/remove/${productId}`,{
        method:"post",
        headers:{
            "Content-Type":"application/json",
            "tk":localStorage.getItem("token")
        }
        
    }).then(res=>res.json()).then(data=>{
        if(data.success){
            dispatch(addToCart(data.result));
            setAlert('product was removed from your cart')
            setTimeout(()=>{
                setAlert('')
            },2000)
        }
    })
}

export const AddToCart=async(id, condition,fn,quantity,setInfo,dispatch)=>{
  if(!condition){
    fn('/register')
  }
  else if(quantity>0){
     await fetch(`${ApiEntry}/cart/add/${id}`,{
    method:"post",
    headers:{
        "Content-Type":"application/json",
        "tk":localStorage.getItem("token")
    },
    body:JSON.stringify({quantity})
 }).then(res=>res.json()).then(data=>{
 if(data.success){
    dispatch(addToCart(data.result))
    setInfo("Product was added succesfully");

    setTimeout(()=>{setInfo("")},2000)
 } else if(data.result.includes('your cart')){
    setInfo("product already exists in your cart");
    setTimeout(()=>{setInfo("")},2000)
 }

})
  } 
  else{
    alert("Quantity must be more  than 0")
  }
 }
