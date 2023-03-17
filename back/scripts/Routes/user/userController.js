 import customerModel from '../../models/customers.js'
 import bcrypt from 'bcrypt'
 import  Jwt  from 'jsonwebtoken'
 import { config } from 'dotenv';
 import cartModel from '../../models/Cart.js'
 import createCustomError from '../../errors/customError.js';
 config();
 //take password out of the data, we don't want to send it to the user
  function removePassword(obj){
    const {password,... others}=obj._doc;
    return others
 } 
 
 //register a customer 

  export const  register=async( req,res,next)=>{
 
    const  {password}=req.body
    
     const hashedPassword=await bcrypt.hash(password,10);
     
    try {
        
        
        const newUser=await customerModel.create({...req.body, password:hashedPassword})
        // a new cart is created with the generated id for the user
             const userId= newUser._id
             const newCart= await cartModel.create({userId})    
        const accessToken= await Jwt.sign({id:newUser._id,isAdmin:newUser.isAdmin},process.env.jwt_Secret);
    
        
        res.status(200).json({success:true,result: {...removePassword(newUser),accessToken}});
         
    } catch (error) {
        next(createCustomError(500,error.message))
    }
     

  }

  // Login
  

  export const login=async( req,res,next)=>{
    const {email,password}=req.body
    
     try {
        const thisUser= await customerModel.findOne({email:email});
        if(!thisUser){
                next(createCustomError(404, `A user with the email: ${email} was not found`))
        }
        else{

            const passwordIsCorrect=  await bcrypt.compare(password, thisUser.password)
            
            if(!passwordIsCorrect){
                next(createCustomError(403,'password is not correct'))
            }   
            else{
                 const accessToken=Jwt.sign({id:thisUser._id,isAdmin:thisUser.isAdmin},process.env.jwt_Secret)
                res.status(200).json({success:true,result:{...removePassword(thisUser),accessToken}})
            }
        }
     } catch (error) {
         res.status(500).json({success:false,result:error.message})
     }
     
     
  }

  // get all users (admins only)

    export const getAllUsers=async(req,res,next)=>{
        
        try {
    

               const allUsers= await customerModel.find();
               res.status(200).json({success:true, result:allUsers})
            
           } catch (error) {
                    next(createCustomError(500,error.message))
        }
    }


// edit a user 

 export const editUser=async(req,res,next)=>{
      const {user}= req
      const {isAdmin}=user
       const sameUser=user.id===req.params.id;
       if(sameUser||isAdmin){
        try {
            const updated= await customerModel.findByIdAndUpdate(req.params.id,{$set:req.body}, {new:true});
            res.status(201).json({success:true, result:updated})
            
        } catch (error) {
                     next(createCustomError(500,error.message))
        } 

       }
       else{
            next(createCustomError(403,'You do not have rights to perform this action'))
    }
 }
 export const deleteUser=async(req,res,next)=>{
    console.log('hello') 
    const {user}= req;
    //  const {isAdmin}=user
     // if the user id matches the params id we know this user owns  the account  
    //  const sameUser=req.params.id===user.id;
     

     
     // only allow admin or the said user to delete or modify account;
     if(true/*||sameUser*/){
        try {
             await customerModel.findByIdAndDelete(req.params.id);
             res.status(201).json({success:true,result:'user was deleted succesfully'})
        } catch (error) {
            console.log(error)
                next(createCustomError(500,error.message))
        }
        
     }
     else{
  next(createCustomError(403,'You dont have rights to this action'))
    }
     
       
    

 }
 export const getUserByToken=async(req,res,next)=>{
       const userId=req.user.id;
    
       try {
          const  thisUser=await customerModel.findById(userId)
          const {password, ...others}= thisUser._doc
          res.status(200).json({success:true, result:others})

       } catch (error) {
                next(createCustomError(500,error.message))      
       }
 }



  