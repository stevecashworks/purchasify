import styled from 'styled-components';
import Header from '../../Home/Components/Header/Header';
import { AppCon } from '../../../App';
import  {selectPattern,selectTheme} from '../../../redux/slices/themes'
import  {selectMenuOpen} from '../../../redux/slices/menuSlice'
import { useSelector } from 'react-redux';
import Widget from '.././components/Widgets/Widget';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
 import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
 import RequestQuoteIcon from '@mui/icons-material/RequestPage';
import CategoryIcon from '@mui/icons-material/Category';
import {Container,Categories as Left,Products as Right} from '../../Home/home'
import LinkItem from '../../Home/Components/categoryItem'
import {useId} from 'react';
import  {CategoryHeader} from '../../Home/home'
const Mid=styled.div`
height:100vh;
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
justify-content:space-around;

@media(max-width:480px){
  flex-direction:column;
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
const Charts=styled.div`
display:flex;
margin:0 auto;
justify-content:space-around;
gap:30px;
`

const Orders=()=>{
  const widgetData=[
  {title:"Users",icon:PersonOutlineIcon,perc:30,no:35000,id:useId()},
  {title:"Products",icon:CategoryIcon,perc:80,no:48000 ,id:useId()},
  {title:"Orders",icon:RequestQuoteIcon,perc:50,no:65000,id:useId()}
  ]
  const  linkData=[
    {text:"Users",icon:PersonOutlineIcon,id:useId(),col:"purple ",path:"admin/users" },
    {text:"Products",icon:CategoryIcon,id:useId() ,col:"purple",path:"admin/products"} ,
    {text:"Orders",icon:RequestQuoteIcon, id:useId(),col:"purple",path:"admin/orders"},
    {text:"Deliveries",icon:DeliveryDiningIcon, id:useId(),col:"purple",path:"admin/deliveries"}
  
  ]


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
      <Title>Admin orders page </Title>
      <CategoryHeader>Lists</CategoryHeader>
      <Links>
      {linkData.map(item=><LinkItem type='link' key={item.id} icon={item.icon} path={item.path} text={item.text} col={item.col}/>)}
      </Links>

      </Left>
      <Right>
        <WidgetCon>
          {widgetData.map(item=><Widget key={item.id} title={item.title} icon={item.icon}  perc={item.perc} no={item.no} />)}
        </WidgetCon>
        <h1 style={{textAlign:'center',opacity:'0.7',position:'relative',top:"-170px",fontSize:'22px',fontWeight:"600"}}>Orders</h1>


      </Right>



    </Mid>
  </Container>
  </AppCon>

)
 }
 export default Orders