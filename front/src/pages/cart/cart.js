import styled from 'styled-components'
import  {useSelector} from 'react-redux'
import { selectCart } from '../../redux/slices/ShoppingSlice'
import {useState,useEffect} from 'react';
import { selectTheme,selectPattern } from '../../redux/slices/themes';
import {ApiEntry} from '../../App'
import {AppCon} from '../../App';
import Header from '../Home/Components/Header/Header';
import { Container } from '../Home/home';
import CartTable from './cartTable';
import { BackBtn } from '../admin/pages/editProduct';
const  Title=styled.h4`
 color:blueviolet;
 font-family:monospace;
 text-align:center;
 margin:10px auto;
 font-size:18px;
 font-weight:300;
`
const  ProductsCon=styled.div`
min-height:500px;
`
const Total=styled.div`
margin:20px 5px;
`
const Cart=()=>{
  const myCart=useSelector(selectCart)
  const {products}= myCart

  const theme=useSelector(selectTheme)
  const pattern = useSelector(selectPattern)[theme]
  const [fetchedProducts,setFetchedProducts]=useState([])
  
  let productsWithQuantity=[]
if(products){

  if(fetchedProducts.length>0){
    productsWithQuantity=fetchedProducts.map(fp=>{return {...fp,quantity:products.length>0?products.find(p=>p.productId===String(fp._id)).quantity:undefined}})

}
}
  
      useEffect(()=>{
    const getCartProducts=async()=>{
      await fetch(`${ApiEntry}/cart/products`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "tk":localStorage.getItem("token")
        }
      }).then(res=>res.json()).then(data=>{
        if(data.success){
          setFetchedProducts(data.result)
        }
      })
    }
    getCartProducts()
   }
   ,[])
  return(
    <AppCon pattern={pattern}>
      <Container>
        <Header />

        <hr style={{opacity:"0.5",margin:"10px auto"}}/>
        <ProductsCon>


     <Title> My Cart Items</Title>
      {(myCart.noOfItems!==0)&&<CartTable data={productsWithQuantity}/>}
      <Total> Total: ${myCart.total}</Total>
        </ProductsCon>
        <BackBtn path='/'/>
      </Container>

    </AppCon>
  )
}
export default Cart 