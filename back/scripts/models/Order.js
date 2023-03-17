import mongoose from 'mongoose';
 const OrderSchema= mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    products:[
        {
            productId:String,
            quantity:{
                type:Number
            }
        }
    ]
 })