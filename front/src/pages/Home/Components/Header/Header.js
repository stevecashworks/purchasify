import styled from 'styled-components';
import logo from '../../../../assets/logo.png'
import './header.css';
import  {toggleMenu} from '../../../../redux/slices/menuSlice.js'
import {MdFavoriteBorder} from 'react-icons/md'
import {FiMenu} from 'react-icons/fi'
import {AiOutlineShoppingCart} from 'react-icons/ai';
import {RxAvatar} from 'react-icons/rx'
import ThemeController from '../ThemeController';
import { useSelector,useDispatch } from 'react-redux';
import { selectIsLogged,selectOtherDetails } from '../../../../redux/slices/userSlice';
import { selectCart } from '../../../../redux/slices/ShoppingSlice';
const Container=styled.div`
 width:100%;
 display:flex;
 align-items:center;
 justify-content:space-between;
 padding:15px;
 box-sizing:border-box;
 @media (max-width:480px){
  padding:5px;  
 }
 `
 const FavCon=styled.div`
  display:flex;
  flex-direction:column;
  gap:10px;
  align-items:flex-end;
  @media (max-width:480px){
   
  }
 `
 const LogoText=styled.p`
 font-weight:bold;
 @media (max-width:480px){
    font-size:12px;
    font-weight:500;
 }
 `
 const Links=styled.div`
 display:flex;
 justify-content:space-between;
 
 @media (max-width:480px){
  display:none;  
 }
 `
 const Link=styled.a`
 text-decoration:none;
 color:inherit;
 margin:auto 10px;
 font-weight:300;
 font-size:13px;
 
 `
 const Fav=styled.div`
 `
const  LogoCon=styled.div`
 display:flex;
 align-items:center;

`
const Logo=styled.img`
width:40px;
height:40px;
@media (max-width:480px){
    height:30px;
    width:30px;
}

`
const CartBadge=styled.div`
height:15px;
width:15px;
display:flex;
font-size:12px;
font-weight:700;
border-radius:50%;
background-color:blueviolet;
color:white;
align-items:center;
justify-content:center;
position:relative;
top:12px;
left:12px;
` 

const Header=()=>{
    const dispatch=useDispatch()
    const cart=useSelector(selectCart)
    const isLogged=useSelector(selectIsLogged);
     const page= isLogged?'#':'/register'
     return (
        <Container>
            <LogoCon>
                <Logo src={logo}/>
                <LogoText>Purchasify</LogoText>
            </LogoCon>
            <Links>
            <Link href='#'>24/7 Customer-care</Link>
            <Link href='#'>Services</Link>
            <Link href='#'>Join our team</Link>
            <Link href='#'>Feedback</Link>
            </Links>
            <FavCon>
                
                <ThemeController/>
            <Fav>
                <MdFavoriteBorder className="header-icon"/>
                <Link href={isLogged?'/cart':"/register"} style={{display:"inline-block"}}>
                    {(("noOfItems" in cart)&&(cart.noOfItems!==0))&&<CartBadge>{cart.noOfItems}</CartBadge>}
                <AiOutlineShoppingCart className="header-icon"/>
                </Link>
                <Link  href={page}>
                <RxAvatar className="header-icon"/>
                    </Link>
                </Fav>
                <FiMenu  style={{alignSelf:'flex-end',justifySelf:'flex-start'}} onClick={()=>{dispatch(toggleMenu())}} className='option'/>
            </FavCon>

        </Container>
    )
}
export default Header