import mongoose from 'mongoose';

const  cartSchema= mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    products:[
        {
            productId:{
                type:String,
                required:true
            },
            quantity:{
                type:Number,
                default:1
            }
        }
    ],
    noOfItems:{type:Number,default:0},
    total:{
        type:Number,
        default:0
    }
    
},{timestamps:true})
export default mongoose.model('cart',cartSchema);