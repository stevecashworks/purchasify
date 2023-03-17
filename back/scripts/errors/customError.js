const createCustomError=(status,message)=>{
 const err=new Error();
 err.message=message||"Oops, something went wrong";
err.status=status||500;
 return err
}
export default createCustomError