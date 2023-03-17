import {useEffect} from 'react'
import { AddToCart, removeFromCart } from '../singleProduct/editCart';
import styled from 'styled-components';
import {useDispatch} from 'react-redux'
import { addToCart } from '../../redux/slices/ShoppingSlice';
import {useNavigate} from 'react-router-dom'
const Container=styled.div`
 display:flex;
 align-items:center;
 `
 const Value=styled.div`
    width:25px;
    height:25px;
    display:flex;
    justify-content:center;
    align-items:center;

 `
export const Btn=styled.button`
    width:25px;
    height:25px;
    border:0.5px solid #ddd;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:${props=>props.bcol};
    color:${props=>props.bcol==="blueviolet"?"white":'black'};
    transition:all 0.5s ease;
    border-radius:3px;
    &:hover{
        opacity:0.5;
    }

 `

const  Quantity=({no,fn,productId})=>{
    const dispatch=useDispatch();
    const navigate= useNavigate();
 
 useEffect(()=>{
    if(no>0){

        AddToCart( productId,true,navigate,no,()=>{},dispatch)
    }
    else{
            removeFromCart(productId,dispatch,()=>{})        
    }
 },[no])
return( 
    <Container>
        <Btn   col='rgb(255,0,0,0.2)' onClick={()=>{
            fn(q=>{
                if(q===1){
                    const canProceed=window.confirm('This will remove product from cart, do you wish to continue? ')
                    return canProceed?0:1
                }
                if(q===0){
                    return q
                }
                return q-1
            })
        }}>-</Btn>
        <Value>{no}</Value>
        <Btn bcol='blueviolet' col='rgb(0,255,0,0.2)' onClick={()=>{fn(no+1)}}>+</Btn>
    </Container>
)
}
export default Quantity