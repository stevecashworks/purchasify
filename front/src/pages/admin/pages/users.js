import styled from 'styled-components';
import Header from '../../Home/Components/Header/Header';
import { AppCon } from '../../../App';
import  {selectPattern,selectTheme} from '../../../redux/slices/themes'
import  {selectMenuOpen} from '../../../redux/slices/menuSlice'
import { useSelector,useDispatch} from 'react-redux';
import Widget from '.././components/Widgets/Widget';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
 import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
 import RequestQuoteIcon from '@mui/icons-material/RequestPage';
import CategoryIcon from '@mui/icons-material/Category';
import {Container,Categories as Left,Products as Right} from '../../Home/home'
import LinkItem from '../../Home/Components/categoryItem'
import {useId} from 'react'
import  {CategoryHeader} from '../../Home/home'
import { selectProducts } from '../../../redux/slices/ShoppingSlice';
import fetchUsers from './fetchUsers.js'
import { setUsers,selectUsers } from '../../../redux/slices/adminSlice';
import {useEffect} from 'react';
import New from './new'
import TableCon from './TableCon';
const Mid=styled.div`
display:flex;
min-height:100vh;
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
justify-content:space-around;
@media (max-width:480px){
  flex-direction:column;
  height:auto; align-items:center;
}
`
const Links=styled.div`
display:flex;
flex-direction:column;
font-size:13px;
font-weight:100;
margin:20px auto;
`



const Users=()=>{
  const dispatch=useDispatch( )
  useEffect(()=>{

    const   getAllUsers=async()=>{
          const fetchedUsers=await  fetchUsers()
          if(fetchedUsers.success){
            dispatch(setUsers(fetchedUsers.result))
          }
    }
    getAllUsers()
  },[])
  const allUsers=(useSelector(selectUsers))
  console.log(allUsers)
  const allProducts=(useSelector(selectProducts))
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
  const removeItem=async(id,nav)=>{
     const proceed=window.confirm("are you sure you want to delete this user?")
   if(proceed){
      console.log(id)
     await fetch(`http://localhost:8080/api/v3/user/delete/${id}`,{
       method:'DELETE',
      headers:{
          "Content-Type":"application/json"
        },
        
      }).then(res=>res.json()).then(data=>{
        console.log(data);
        if(data.success){
          nav(0)

        }
        
      }
        )
    }
  }
 


  const pattern=useSelector(selectPattern)
const theme=useSelector(selectTheme)
const menuOpen=useSelector(selectMenuOpen)
  return(

 <AppCon pattern={pattern[theme]}>
  <Container>
  <Header/>
    <hr/>
    <Mid>
      <Left show={menuOpen} current={theme}>
      <Title>Admin users page </Title>
      <CategoryHeader>Lists</CategoryHeader>
      <Links>
      {linkData.map(item=><LinkItem type='link' key={item.id} icon={item.icon} path={item.path} text={item.text} col={item.col}/>)}
      </Links>

      </Left>
      <Right style={{gap:"0px"}}>
        <WidgetCon>
          {widgetData.map(item=><Widget key={item.id} title={item.title} icon={item.icon}  perc={item.perc} no={item.no} />)}
        </WidgetCon>
          <TableCon  type="Users"data={allUsers} deleteItem={removeItem}/>
          <New type="users"/>
          </Right>
      </Mid>
  </Container>
  </AppCon>

)
 }
 export default Users