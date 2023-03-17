import createCustomError from '../../errors/customError.js';
import cartModel from '../../models/Cart.js'
import productModel from '../../models/Products.js'
 //gets all users carts 
export const getAllCarts=async(req,res,next)=>{
    try {
        const carts =await cartModel.find()
        res.status(200).json({success:true, result:carts}) 
    } catch (error) {
        next(createCustomError(500,error.message))
    }
}
 export const addToCart=async(req,res,next)=>{
const productId=req.params.id;
const userId=req.user.id
const {quantity}=req.body
console.log(quantity)
try {
     const cart=await cartModel.findOne({userId})
     
     const  {products}=cart;
     

     // check if product already exists in the cart, if it does, we do not add it

     const productExists=products.some(product=>productId===product.productId)
     const   product=products.find(product=>product.productId==productId)
     console.log(product)
     let quantityHasChanged=false
     if(product){

          quantityHasChanged=product.quantity!==quantity
     }
     
    
     const thisProduct=await productModel.findById(productId)
     if(!productExists){
        // we need to get the products price so we can add it to our cart's total;
        const updatedCart= await cartModel.findOneAndUpdate({userId:userId},{$push:{products:{productId,quantity:req.body.quantity}},$inc:{total:((thisProduct.price*quantity)),noOfItems:1}},{new:true})
    return    res.status(201).json({success:true,result:updatedCart})
      
     }
   
     else if(quantityHasChanged){
    console.log()
     const updatedCart= await cartModel.findOneAndUpdate({userId},{$set:{products:[...products.filter(product=>product.productId!==productId),{productId,quantity}]},$inc:{total:((thisProduct.price*quantity)-(thisProduct.price*product.quantity))}},{new:true})
    //  console.log(updatedCart) 
     return res.status(201).json({success:true,result:updatedCart})  
    
    }
    else{
            
        return next(createCustomError(500,'This product is already in your cart'))
    }

     
     
} catch (error) {
    console.log(error)
     next(createCustomError(500,error.message))
}

  

}
export const getCartProducts=async(req,res,next)=>{
 const userId=req.user.id;
 try {
    const cart=await cartModel.findOne({userId})
    
     const {products}=cart;
  const fetchedProduct= await Promise.all(products.map((product)=>productModel.findById(product.productId)))
   const result= fetchedProduct.flat()   
  res.status(200).json({success:true,result}) 
 } catch (error) {
     next(createCustomError(500,error.message))
 }
  
}
export const  removefromCart=async(req,res,next)=>{
     const userId=req.user.id;
     console.log(req.params.id)
     try {
         const thisProduct=await productModel.findById(req.params.id)
         const  thisCart=await cartModel.findOne({userId})
        

         const productInCart= thisCart.products.some(product=>product.productId===String(thisProduct._id))     
         console.log(productInCart)
         if(productInCart){
             const {quantity}=thisCart.products.find(x=>x.productId===String(thisProduct._id));
             console.log(quantity)


          const  updatedCart=await cartModel.findOneAndUpdate({userId},{$pull:{products:{productId:req.params.id}},$inc:{total:Number(`-${(thisProduct.price*quantity)}`),noOfItems:-1}},{new:true})
           console.log("UpdatedCart",updatedCart) 
          res.status(201).json({success:true,result:updatedCart})
    }
    else{
        next(createCustomError(404,"product was not found"))
    }
    } catch (error) {
        console.log(error)
        next(createCustomError(500,error.message))
    }
    
}
export const getCart=async(req,res,next)=>{
     const userId=req.user.id
     try{
        const userCart= await cartModel.findOne({userId})
        console.log(userCart)
        res.status(200).json({success:true,result:userCart})
     }
     catch(err){
         next(createCustomError(500,error.message))
     }
}