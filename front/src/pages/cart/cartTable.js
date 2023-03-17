import styled from "styled-components";
import Quantity from "./quantity";
import {useSelector,useDispatch} from 'react-redux'
import {selectLoading,toggleLoading} from '../../redux/slices/userSlice'
import {Btn} from './quantity'
import {useState} from 'react'
import { removeFromCart } from "../singleProduct/editCart";
const  TableCon=styled.div`
 width:100%;
 ::-webkit-scrollbar{
    width:12px;
    margin-top:10px;
    opacity:0.5;
  };
  ::-webkit-scrollbar-track{
    background-color:#f2f2f2;
    border-radius: 10px;
    opacity:0;
  
  };
  ::-webkit-scrollbar-thumb{
    background-color:#a0a0a0;
    border-radius: 10px;
    transition:all  0.25s  ease;
    opacity:0;
  };
  ::-webkit-scrollbar-thumb:hover{
    background-color:#ddd;
  }
 @media(max-width:480px){
    overflow-x:scroll;
 }
`
const Table=styled.table`
width:80%
@media(max-width:480px){
    width:100%
}
`
const Thead=styled.thead`
`
const Tbody=styled.tbody`
`
const Th=styled.th`
 font-size:13px;
 font-weight:200;
 text-align:left;
 border-bottom:0.5px solid #ddd;
 padding-bottom:10px;

`
const Tr=styled.tr`
padding:10px;
`
const Td=styled.td`
border-bottom:0.5px solid #ddd;
display:${props=>props.type};
font-size:13px;
padding:15px;
text-transform:capitalize;


`
const Name=styled.div`
 font-weight:500;
 margin-bottom:10px;
 @media (max-width:480px){
 min-width:180px;
 }
`
const Description=styled.div`
font-size:10px;
@media (max-width:480px){
    min-width:180px;
    }

`
const ProductImg=styled.img`
width:50px;
height:50px;
object-fit:cover;
margin-right:20px;
`
const DescCon=styled.div`

`
const CartTable=({data})=>{
    const loading=useSelector(selectLoading)
    const dispatch=useDispatch()
    const Row=({description,quantity,name,price,_id,displayImage})=>{
        const [quant,setQuant]=useState(quantity)
        return(
            <Tr>
            <Td type={"flex"}>
                <ProductImg src={displayImage} />
                <DescCon>
                    <Name>{name}</Name>
                    <Description>{description}</Description>
                </DescCon>
            </Td>
            <Td>
                <Quantity no={quant} fn={setQuant} productId={_id} />   
            </Td>
            <Td>
                <Btn disabled={loading} onClick={async()=>{dispatch(toggleLoading());await removeFromCart(_id,dispatch,()=>{});dispatch(toggleLoading())}}>x</Btn>
            </Td>
            <Td>
                ${price}
            </Td>
            <Td>
                ${price*quant}
            </Td>
            
            
        </Tr>
        )
    }
return(
    <TableCon>
    <Table>
        <Thead>
            <Th>Description</Th>
            <Th>Quantity</Th>
            <Th>Remove</Th>
            <Th>Price(1)</Th>
            <Th>Price * quantity</Th>


        </Thead>
        <Tbody>
            {data.map(product=>{
                return(
                    <Row {...product} />
                )
            })}
        </Tbody>

    </Table>
    </TableCon>
)
}
export default CartTable