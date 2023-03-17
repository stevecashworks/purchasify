import styled from 'styled-components'
import {AppCon} from '../../App'
import { Container } from '../Home/home'
import { ApiEntry } from '../../App'
import {useLocation,useNavigate} from 'react-router-dom'
import {useState,useEffect} from 'react'
import Header from '../Home/Components/Header/Header'
import { selectTheme,selectPattern } from '../../redux/slices/themes'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLogged } from '../../redux/slices/userSlice'
import  {FaChevronLeft,FaChevronRight} from 'react-icons/fa'
import { selectCart } from '../../redux/slices/ShoppingSlice';
import { BackBtn } from '../admin/pages/editProduct'
import { AddToCart,removeFromCart } from './editCart'
const ProductsCon=styled.div`
height:100vh;
background-color:#eee;
width:100%;
 
 `
 const Price=styled.p`
  font-size:13px;
 ` 
 const CounterCon=styled.div`
  display:flex;
  font-size:13px;
  gap:10px;
  align-items:center;
  position:relative;
  bottom:50px;
 `
const SingleCon=styled.div`
display:flex;
padding:10px 25px;
position:relative;
height:auto;
align-items:center;
background-color:white;
width:80%;
margin:auto auto;
justify-content:space-around;
@media (max-width:620px){
    flex-direction:column-reverse;
    justify-content:center;
    
}
`
const Desc=styled.p`
text-align:left;
font-size:13px;
width:300px;
@media(max-width:480px){
    width:90%;
    text-align:center;

    
}
`

const Name=styled.h3`
font-weight:500;
font-size:18px;
text-transform:capitalize;
text-align:center;

`
const DetailsCon=styled.div`
 display:flex;
 flex-direction:column;
 gap:20px;
 justify content:center;

`
const Image=styled.img`
width:300px;
max-height:300px;


`
const CartBtn=styled.button`
background-color:transparent;
width:200px;
height:30px;
color:#333;
border:1px solid #ddd;
border-radius:7px;
transition:all 0.5s ease;
cursor:pointer;
justify-self:flex-end;
&:hover{
background-color:#eed;
}
`
const AlertCon=styled.div`
background-color:${props=>props.bg};
color:${props=>props.col};
text-align:center;
width:100%;
padding:10px;
position:absolute;
box-sizing:border-box;
bottom:0;
transition:all 0.5s ease;
text-transform:capitalize;
opacity:${props=>props.in?"0":"1"};
@media(max-width:480px){
    top:0;
height:40px;
}

`
const ImgCon=styled.div`
display:flex;
flex-direction:column;
gap:20px;
align-items:center;

`
const QuantCon=styled.p`
text-align:center;
font-weight:bold;
@media(max-width:480px){
    margin-top:10px;
}
`

 
const SingleProduct=()=>{
    const navigate=useNavigate();
    const isLogged=useSelector(selectIsLogged)
    const productId= useLocation().pathname.split('/')[2]
     const myCart=useSelector(selectCart);
     const [quantity,setQuantity]=useState(1)
    useEffect(()=>{

        if("products" in myCart){
            const productInCart=myCart.products.find(product=>String(product.productId)===productId);
            
            if(productInCart){
                setQuantity(Number(productInCart.quantity))
            }
            
        }
    },[myCart])
    const dispatch=useDispatch()
    const [thisProduct,setThisProduct]=useState({});
    useEffect(()=>{
         const getSingleProduct=async()=>{
      const prod= await fetch(`${ApiEntry}/products/one/${productId}`).then(res=>res.json()).then(data=>data)
    
      if(prod.success){
            setThisProduct(prod.result)
         }
        }
         getSingleProduct()
    },[productId])
    useEffect(()=>{
        
        if(quantity===0){
        removeFromCart();
        
        }
    },[quantity])
  
    const theme=useSelector(selectTheme)
 const pattern=useSelector(selectPattern)[theme]
 const [alert,setAlert]=useState('')
    return(
        <AppCon pattern={pattern}>
            

        <Container>
            <Header/>
            <hr style={{backgroundColor:"#ddd",opacity:"0.5"}}  />
            <ProductsCon>


            <SingleCon>
                <DetailsCon>
                <Name>{thisProduct.name}</Name>
                <Desc>{thisProduct.description}</Desc>
                <Price> Price($): {thisProduct.price}</Price>
                <CartBtn onClick={()=>{AddToCart(productId,isLogged,navigate,quantity,setAlert,dispatch)}}>Add this product to my cart</CartBtn>
                </DetailsCon>
                <ImgCon>
            <Image src={thisProduct.displayImage}/>
            <CounterCon>
                <FaChevronLeft
                style={{fontSize:"18px",opacity:"0.4"}}
                onClick={()=>{
                    setQuantity((quantity)=>{
                        if(quantity===0){
                            return 0
                        }
                        if(quantity===1){
                            const canProceed= window.confirm("Do you want to remove this product from your cart?")
                            if(canProceed){
                                return 0
                            }
                            return 1
                        
                        }
                        return quantity-1
                    })
                }}
                />
                    <QuantCon >Quantity {quantity}</QuantCon>
                <FaChevronRight style={{fontSize:"18px",opacity:"0.4"}} onClick={()=>{setQuantity(quantity+1)}}/>
            </CounterCon>
                
                </ImgCon>

               {alert&&<AlertCon bg={alert[0]==="P"?"rgb(0,255,0,0.2)":"rgb(255,0,0,0.2)"} col={alert[0]==="P"?"darkseagreen":"crimson"}>{alert}</AlertCon>}            
            </SingleCon>
            <BackBtn t="translateX(100px)" path='/'/>
            </ProductsCon>
        </Container>
        </AppCon>
    )
}
export default SingleProduct