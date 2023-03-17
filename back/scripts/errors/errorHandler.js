const errorHandler=(err,req,res,next)=>{
    res.status(err.status).json({success:false,result:err.message})
}
export default errorHandler