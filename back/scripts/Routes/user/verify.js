import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
export const verifytoken= (req,res,next)=>{
    const token=req.headers.tk
    jwt.verify(token,process.env.jwt_Secret,(err,data)=>{
  
        if(err){
            res.status(403).json({success:false,result:'user authentication failed'})
        }
        else{
            req.user=data;
            next()
        }
    }
    )
}
export const verifyAdmin=(req,res,next)=>{
     const token=req.headers.tk
      jwt.verify(token,process.env.jwt_Secret,(err,data)=>{
        if(err){
            res.status(403).json({success:false,result:'user authentitacion failed'})

        }
        else{
            if(!data.isAdmin){
                res.status(403).json({success:false,result:'You do not have access to this'})
            }
            else{
                
                req.user=data;
                next()
            }
        }
      })
}