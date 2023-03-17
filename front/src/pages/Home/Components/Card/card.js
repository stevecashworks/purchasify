import styled from 'styled-components';
import {RiStarHalfFill,RiStarFill} from 'react-icons/ri';
import {MdFavorite} from 'react-icons/md'
import {Link} from 'react-router-dom'
import './card.css'
const Container=styled.div`
position:relative;
width:200px;
padding:20px;
height:auto;
border-radius:30px;
box-sizing:border-box;
box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
`

const  StarsCon=styled.div`
display:flex;
flex-direction:column;
gap:10px;
`
const Img=styled.img`
width:80px;
display:block;
height:100px;
margin:10px auto;
`
const CartBtn= styled.button`
  background-color:transparent;
  padding:8px;
  border:none;
  border-radius:10px;
  margin-top:15px;
  color:white;
  background-color:blueviolet;
  position:relative;
  left:50%;  
  top:5px;
  cursor:pointer;

`
const PriceBlock=styled.div`
display:block;
width:100%;
`
 const Price=styled.p`
 display:flex;
 flex-direction:column;
 gap:10px;
 `
 
 const Con=styled.div`
display:flex;
justify-content:space-between;
font-size:12px;
margin:10px auto;
font-weight:bold;
`
 const ProductName= styled.p`
 font-weight:600;
 text-align:center;
 font-size:14px;
 `

 export const allocateStars=(noOfRating)=>{
    const wholeNo=noOfRating-noOfRating%1;
    const StarsArray=[]
    for(let x=0;x<wholeNo;x++){
     StarsArray.push(RiStarFill)
    }
    if((noOfRating%1)!==0){
     StarsArray.push(RiStarHalfFill)
    }
    return StarsArray
  }
const Card=({name,image,rating,price,id})=>{
  
  return (
    <Container>
      <MdFavorite color='crimson' style={{position:'absolute' ,zIndex:'4', fill:'red',  top:'25px', right:'35px'}} />
      <Img src={image}/>
      <ProductName>{name}</ProductName>
      <Con>
      <Price><PriceBlock>Price :</PriceBlock><PriceBlock> {price}</PriceBlock></Price>
      <StarsCon>
      <PriceBlock>Rating:</PriceBlock><PriceBlock>{allocateStars(rating).map(Icon=><Icon style={{color:'goldenrod'}}/>)}</PriceBlock>
      </StarsCon>
      </Con>
      <Link style={{color:"inherit",textDecoration:"none"}} to={`/product/${id}`}>

       <div className='Info' data-text='Click to see more info'>
        <p className='info-circle'>i</p>
       </div>
      </Link>
      <Link style={{color:"inherit",textDecoration:"none"}} to={`/product/${id}`}>

  <CartBtn  data-name={name}>Add to Cart</CartBtn>
      </Link>

    </Container>
    )
}
export default Card