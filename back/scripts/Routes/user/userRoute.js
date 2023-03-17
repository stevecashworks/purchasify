import { deleteUser, editUser, getAllUsers,getUserByToken,login,register } from "./userController.js";
import {Router} from "express";
import { verifyAdmin, verifytoken  } from "./verify.js";
 const userRoute=Router()
  userRoute.post('/login',login);
  userRoute.post('/register',register);
  userRoute.get('/all',/*verifyAdmin,*/ getAllUsers)
  userRoute.put('/edit/:id',verifytoken,editUser)
  userRoute.delete('/delete/:id',/*verifytoken,*/deleteUser);
  userRoute.post('/token',verifytoken,getUserByToken)


  
  export default userRoute