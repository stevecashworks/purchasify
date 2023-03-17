import mongoose from 'mongoose';
const productSchema= mongoose.Schema({
name:{
    type: String,
    required:true,
    unique:true
}, 
description:{
 type:String,
 default:'No description was provided for this product'
},
price:{
    type:Number,
    required:true
},
displayImage:{
    type:String,
    required:true

},
otherImages:[
    { 
        type:String

}],
rating:Number,

categories:{
    type:[String],
    default:[]
}



},{timestamps:true})
export default  mongoose.model('products', productSchema)