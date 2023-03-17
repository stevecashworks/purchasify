import { Router } from "express";
import { verifytoken } from "../user/verify.js";
import { addToCart, getAllCarts,getCart, getCartProducts, removefromCart } from "./cartController.js";
//
const cartRoute =Router()
 cartRoute.get('/',getAllCarts)
 cartRoute.post('/add/:id',verifytoken,addToCart)
 cartRoute.post('/remove/:id',verifytoken,removefromCart)
 cartRoute.get('/products',verifytoken,getCartProducts);
 cartRoute.get('/mycart',verifytoken,getCart);




export default cartRoute