import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// function that protects our Route

//  Routes

import Home from './pages/Home/home'
import Admin  from  './pages/admin/admin'
import Register from  './pages/user/register'
import Login from  './pages/user/login';
import SingleProduct from  './pages/singleProduct/singleProduct';
import Users from './pages/admin/pages/users'
import Products from './pages/admin/pages/products'
import Orders from './pages/admin/pages/orders'
import EditProduct from './pages/admin/pages/editProduct'
import { useEffect } from 'react'
import {addToCart,selectSearch, setProducts,selectRange,selectCategory} from './redux/slices/ShoppingSlice';
import { setIsLogged,setOtherDetails,selectIsLogged,selectOtherDetails } from './redux/slices/userSlice';

import { useDispatch, useSelector } from 'react-redux';
import {ApiEntry} from './App';
import Cart from './pages/cart/cart.js'
import fetchData from './fetchData';

const  Wrapper=()=>{
  const dispatch=useDispatch()
  const otherDetails=useSelector(selectOtherDetails)
  const isLogged=useSelector(selectIsLogged)
  // filter data
  const searchInp=useSelector(selectSearch)
  const range=useSelector(selectRange)
  const category=useSelector(selectCategory);
   // params end
    const filterItems=[{fieldName:"name",value:searchInp},{fieldName:"min",value:range.min},{fieldName:"max",value:range.max},{fieldName:"category",value:category}]
  useEffect(()=>{
 // select validFilters using Booolean
 const validFilters=filterItems.filter(item=>Boolean(item.value))
 fetchData(`${ApiEntry}/products/filter`,"POST",(data)=>dispatch(setProducts(data)),null,{validFilters})

  },[...filterItems])

  
  const tk=localStorage.getItem("token")
  useEffect(()=>{
    const getProducts=()=>{
     fetchData(`${ApiEntry}/products/all`,'GET',(res)=>{dispatch(setProducts(res))})
    }
    getProducts()
},[])
  useEffect(()=>{
      const userId=localStorage.getItem("id")
    const fetchUserDetails=async()=>{
        await fetchData(`${ApiEntry}/user/token`,'POST',(res)=>{dispatch(setIsLogged(true));dispatch(setOtherDetails(res))},tk)
        }
    if(userId){fetchUserDetails()}
  },[])

  useEffect(()=>{
    if("_id" in otherDetails){
        fetchData(`${ApiEntry}/cart/myCart`,'GET',(res)=>{dispatch(addToCart(res))},tk) 
    }
  },[otherDetails._id])

  
    const {isAdmin}= useSelector(selectOtherDetails)
    const router=createBrowserRouter([
      {path:'/', element:<Home/>},
      {path:'/product/:id', element:<SingleProduct/>},
      {path:'/admin', element:<Admin/>},
      {path:'/register', element:<Register/>},
      {path:'/login', element:<Login/>},
      {path:'/admin/users', element:<Users/>},
      {path:'/admin/products', element:<Products/>},
      {path:'/admin/orders', element:<Orders/>},
      {path:'/admin/editproduct/:id', element:<EditProduct/>},
      {path:'/cart', element:<Cart/>}
    ])

return(
    <RouterProvider router={router}/>
    
)
}
export default Wrapper