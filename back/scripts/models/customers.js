 import mongoose from 'mongoose';
 const customerSchema=mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    image:{
type:String,
default:'none'
    },
     isAdmin:{
        default: false,
        type:Boolean
    }
 },{timestamps:true})
 export default mongoose.model('customers',customerSchema)