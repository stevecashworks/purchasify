import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { selectTheme } from '../../../redux/slices/themes';
import { selectCategory,setCategory } from '../../../redux/slices/ShoppingSlice';
import { toggleMenu } from '../../../redux/slices/menuSlice';

const Container=styled.div`
display:flex;
margin:20px auto;
gap:20px;
width:80%;
color:inherit;
transition: all 0.5s ease;
font-size:17px;
&:hover{
 border:0.5px solid lightgray;
};
&:focus{
    border:0.5px solid lightgray;
   }
   &:nth-child(1){
    opacity:0;
   }

`

const Text= styled.p`
font-weight:300;
font-size:15px;
text-transform:capitalize;
color:${props=>props.theme==="dark"?"white":"black"}
`
const  CategoryItem=({type,path,text,id,icon,col})=>{
    const Icon=icon;
    const theme=useSelector(selectTheme)
    const dispatch=useDispatch();
    const  category= useSelector(selectCategory)
    const  closeMenu=()=>{
        dispatch(toggleMenu(false));
    }
 
 if(type==='link'){
    return(
        <Link onClick={closeMenu} style={{color:'black',display:'flex',textDecoration:'none',gap:'20px',padding:"10px"}} to={`/${path}`}>
        
        <Icon style={{fontWeight:100 ,color:theme==='dark'?'white':(col||"inherit")}}/>
        <Text theme={theme} >{text}</Text>

    

        </Link>
    )
 }  
 return(
    <Container onClick={()=>{dispatch(setCategory(text));closeMenu()}}>
        <Icon style={{fontWeight:100 ,color:col||"inherit"}}/>
        <Text theme={theme}>{text}</Text>

    </Container>
 )
}
export default CategoryItem