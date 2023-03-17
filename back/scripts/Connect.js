import Mongoose from 'mongoose'
 Mongoose.set('strictQuery',true)
 const connectDb=(uri)=>{
     return Mongoose.connect(uri)
 }
 export default connectDb