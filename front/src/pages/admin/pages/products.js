import styled from 'styled-components';
import deleteProduct from './deleteProduct';
import Header from '../../Home/Components/Header/Header';
import { AppCon } from '../../../App';
import  {selectPattern,selectTheme} from '../../../redux/slices/themes'
import  {selectMenuOpen} from '../../../redux/slices/menuSlice'
import { useSelector, useDispatch } from 'react-redux';
import Widget from '.././components/Widgets/Widget';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
 import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
 import RequestQuoteIcon from '@mui/icons-material/RequestPage';
import CategoryIcon from '@mui/icons-material/Category';
import {Container,Categories as Left,Products as Right} from '../../Home/home'
import LinkItem from '../../Home/Components/categoryItem'
import {useId,useEffect,useState} from 'react'
import  {CategoryHeader} from '../../Home/home';
import New from './new'
import { selectUsers } from '../../../redux/slices/adminSlice';
import  {selectProducts,setProducts} from '../../../redux/slices/adminSlice'
import fetchProducts from '../fetchProducts';
import TableCon from './TableCon'
const Mid=styled.div`
height:auto;
display:flex;
width:100%;
`
const Title=styled.p`
margin: 40px auto;
text-align:center;
font-size:15px;
font-weight:500;

`
const WidgetCon=styled.div`
width:100%;
height:120px;
margin:20px auto;
display:flex;
position:relative;
justify-content:space-around;
@media(max-width:480px){
  flex-direction:column;
  gap:20px;
  height:auto;
  align-items:center;
}
`
const Links=styled.div`
display:flex;
flex-direction:column;
font-size:13px;
font-weight:100;
margin:20px auto;
`

const AddBtn=styled.button`
color:white;
background-color:blueviolet;
font-weight:bold;
margin:10px auto;
display:block;
text-transform:capitalize;
width:150px;
border-radius:25px;
border:none;
transition:all 0.5s ease;
height:35px;
@hover{
  opacity:0.5;
}
`


const Products=()=>{
  const dispatch=useDispatch()
  const [formOpen,setFormOpen]=useState(false)
  useEffect(
    ()=>{
      const  getAllProducts=async()=>{
        const fetchedProducts= await fetchProducts();
        if(fetchedProducts.success){
          dispatch(setProducts(fetchedProducts.result))

        } 
      }
      getAllProducts()
    },[]
  )
   const allProducts=useSelector(selectProducts)
   const allUsers=useSelector(selectUsers)
  const widgetData=[
  {title:"Users",icon:PersonOutlineIcon,perc:30,no:allUsers.length,id:useId()},
  {title:"Products",icon:CategoryIcon,perc:80,no:allProducts.length ,id:useId()},
  {title:"Orders",icon:RequestQuoteIcon,perc:50,no:65000,id:useId()}
  ]
  const  linkData=[
    {text:"Users",icon:PersonOutlineIcon,id:useId(),col:"purple ",path:"admin/users" },
    {text:"Products",icon:CategoryIcon,id:useId() ,col:"purple",path:"admin/products"} ,
    {text:"Orders",icon:RequestQuoteIcon, id:useId(),col:"purple",path:"admin/orders"},
    {text:"Deliveries",icon:DeliveryDiningIcon, id:useId(),col:"purple",path:"admin/deliveries"}
  
  ]


  const pattern=useSelector(selectPattern)
const theme=useSelector(selectTheme);
const menuOpen=useSelector(selectMenuOpen)
   return(

 <AppCon pattern={pattern[theme]}>
  <Container>
  <Header/>
    <hr/>
    <Mid>
      <Left show={menuOpen} current={theme}>
      <Title>Admin products page </Title>
      <CategoryHeader>Lists</CategoryHeader>
      <Links>
      {linkData.map(item=><LinkItem type='link' key={item.id} icon={item.icon} path={item.path} text={item.text} col={item.col}/>)}
      </Links>

      </Left>
      <Right>
        <WidgetCon>
          {widgetData.map(item=><Widget key={item.id} title={item.title} icon={item.icon}  perc={item.perc} no={item.no} />)}
        </WidgetCon>
        <TableCon  editLink="/admin/editproduct"type="Products" deleteItem={deleteProduct} data={allProducts}/>

          
    <AddBtn onClick={()=>{setFormOpen(!formOpen)}}>Add new product</AddBtn>
    <New type='products' open={formOpen}/>

      </Right>



    </Mid>
  </Container>
  </AppCon>

)
 }
 export default Products