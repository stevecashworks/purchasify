
import createCustomError from '../../errors/customError.js'
import productsModel from '../../models/Products.js'

// This adds a new product (admins only)

export const addProduct=async(req,res,next)=>{
 try {
      const newProduct=await productsModel.create(req.body)
      res.status(201).json({success:true,result:`product ${newProduct.name} was added successfully `})
    
 } catch (error) {
        next(createCustomError(500,error.message))
}
}

//get all saved Products (all Users)
export const getAllProducts=async(req,res,next)=>{
    try {
        const allProducts= await productsModel.find()
        res.status(200).json({success:true,result:allProducts})
        
    } catch (error) {
     next(createCustomError(500,error.message))
    }
 }
 // single Product
 export const getSingleProduct=async(req,res,next)=>{
    const  productId=req.params.id;
    try {
        const thisProduct=await productsModel.findById(productId);
        res.status(200).json({success:true,result:thisProduct})
    } catch (error) {
        next(createCustomError(500,error.message))
    }
 }
 // clear all products (admins only)
 export const clearProducts=async(req,res,next)=>{
    try {
         await productsModel.deleteMany()
         res.status(201).json({success:true,result:'all products were cleared'})
    } catch (error) {
        next(createCustomError(500,error.message)) 
    }
 }

 // Only admins can delete products

 export const deleteProduct=async(req,res,next)=>{
   const productId=req.params.id;
   try{

       await productsModel.findByIdAndDelete(productId)   
        res.status(201).json({success:true,result:"product was succesfully deleted"});

    }catch(err){
 next( createCustomError(500,err.message))
   }
 }
 // edit products (admins only)
  export const editProduct=async(req,res,next)=>{
    const productId=req.params.id
    try {
        const updatedProduct=await productsModel.findByIdAndUpdate(productId, {$set:req.body},{new:true})
    res.status(201).json({success:true, result:updatedProduct})    
    } catch (error) {
      next(createCustomError(500,error))   
    }
    
  }
  // get products by category
export const getByCategory=async(req,res,next)=>{
      const cat=req.query.cat;
      try {
         const  products= await productsModel.find({categories:{$in:cat}}).limit(50)
            res.status(200).json({success:true, result:products})
        } catch (error) {
         next(createCustomError(500,error.message))         
      }
}
//
 export const getFilteredProduct=async(req,res,next)=>{
 const {validFilters}=req.body
  const queryObject={}
  if(validFilters.min||validFilters.max){
  queryObject.price={}
  }
   validFilters.forEach(filter=>{
    switch(filter.fieldName){
      case "name": queryObject['name']={$regex:filter.value};break; 
      case "min": queryObject['price']={...queryObject.price,$gte:filter.value};break; 
      case "max": queryObject['price']={...queryObject.price,$lte:filter.value};break; 
      case "category": queryObject['category']={$in:filter.value};break;
      
    }
   
   })
   console.log(queryObject)
   try{

     if(validFilters.length==0){
    const products=await productsModel.find()
      console.log(products)
       return res.status(200).json({success:true,result:products})
      
    }
    else{
      const products=await productsModel.find(queryObject)
    console.log(products)
  return res.status(200).json({success:true,result:products})
    }
    
    
  } catch(err){
    next(createCustomError(500,err.message))
  }
   
 }

// sort by new time
 