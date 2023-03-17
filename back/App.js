
//dependency imports
import  cors from  'cors'
import dotenv from 'dotenv';
import  express from 'express';



//  Routes are imported here
import userRoute from './scripts/Routes/user/userRoute.js';


import productRoute from './scripts/Routes/products/productRoute.js';
import cartRoute from './scripts/Routes/cart/cartRoute.js';

import connectDb from './scripts/Connect.js';
import errorHandler from './scripts/errors/errorHandler.js';
//our server is initialized

const server=express();

// Allow our server to use  cross-platform origins

server.use(cors())

// let's add routes to the server by specifying a path and our imported route, they seem like branches in our application 😒

server.use(express.json())
server.use('/api/v3/user',userRoute)
server.use('/api/v3/products',productRoute)
server.use('/api/v3/cart',cartRoute)
dotenv.config();

// error handling middleware
server.use(errorHandler)
//If environment  PORT variable exists, use it else, use  5000
const port=process.env.PORT||5000

const start=async()=>{
try {
    await connectDb(process.env.local_Mongo)
    server.listen(port,()=>{console.log(`server is listening on port ${port}`)})
    
} catch (error) {
     console.log(error)
}
}
start()