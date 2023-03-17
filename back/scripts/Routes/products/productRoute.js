import { Router } from "express";
import {verifyAdmin} from '../user/verify.js';
import { addProduct,deleteProduct,editProduct,getAllProducts,getSingleProduct, clearProducts, getByCategory, getFilteredProduct } from "./productsController.js";
const  productRoute= Router();
 productRoute.get('/all',getAllProducts)
 productRoute.get('/one/:id',getSingleProduct)
 productRoute.get('/category',getByCategory)
 productRoute.post('/add',/*verifyAdmin,*/addProduct)
 productRoute.post('/filter',getFilteredProduct)
 productRoute.put('/edit/:id',/*verifyAdmin,*/editProduct)
//  productRoute.delete('/delete',verifyAdmin,clearProducts)
 productRoute.delete('/delete/:id'/*,verifyAdmin*/,deleteProduct)


export default  productRoute