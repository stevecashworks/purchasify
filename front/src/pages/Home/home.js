 import styled from 'styled-components';
import './home.css'
 import  {AppCon} from '../../App';
 import Header from './Components/Header/Header';
 import {Link} from 'react-router-dom'
 import {CiSearch} from 'react-icons/ci';
 import { EmptyCon } from '../admin/pages/TableCon';
import {selectMenuOpen, toggleMenu} from '../../redux/slices/menuSlice'
 import {useId,useEffect} from 'react'
 import Card from './Components/Card/card';
 import { selectTheme,selectPattern } from '../../redux/slices/themes';
import { useSelector,useDispatch } from 'react-redux';
import CategoryItem from './Components/categoryItem';
import {RiFridgeLine} from 'react-icons/ri'
import {ImSpoonKnife} from 'react-icons/im'
import {selectOtherDetails} from '../../redux/slices/userSlice.js'
import {MdPets,MdOutlineHealthAndSafety,MdOutlineComputer} from 'react-icons/md'
import { selectCategory,setSearch,selectProducts} from '../../redux/slices/ShoppingSlice';
import PriceRange from './Components/PriceRange/Pricerange';
export const Container=styled.div`
  width:90%;
  height:auto;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  @media (max-width:480px){
    width:100%;
    height:${props=>props.open?'100vh':'auto'};
    overflow-y:${props=>props.open?'hidden':'scroll'};
  
  }
 `
 export const  Mid=styled.div`
 display:flex;
 width:100%;
 height:auto;

 `
 export const Categories=styled.div` 
 flex:1;
 background-color:${props=>(props.current==='light')?'rgb(199, 199, 199,.3)':'rgb(58, 57, 57)'};
 transition:all 0.5s ease;
 @media (max-width:480px){
  position:fixed;
   width:100vw;
   height: calc(100vh - 80px);
 background-color:${props=>(props.current==='light')?'rgb(199, 199, 199)':'rgb(58, 57, 57)'};
 z-index:6;
 transform:translateX(${prop=>prop.show?"0":"-100vw"});

  

 }
 `
 export const  Products= styled.div`
 flex:5;
 display:flex;
 flex-wrap:wrap;
 gap:15px;
 padding:30px;
 justify-content:space-around;
 @media (max-width:480px){
    width:100%;
    flex:10;
    padding:5px;
 }
 
  `
 const  SearchCon= styled.div`
  height:30px;
  width:180px;
  border-radius:20px;
  background-color:white;
  margin:20px auto;
  display:flex;
  align-items:center;
  @media (max-width:480px){
    display:none;
  }
 `
 const SearchInp=styled.input`
 border:0;
 outline:0;
 margin-left:15px;
 width:100px;
 `
 const CategoryCon= styled.div`
margin:30px auto;
`
export const CategoryHeader=styled.h6`
font-weight:500;
text-align:left;
font-size:13px;
width:80%;
margin-left:30px;

`
const PCon=styled.div`
display:flex;
flex-wrap:wrap;
gap:15px;
@media (max-width:480px){
  flex-direction:column;
  align-items:center;
  min-height:calc(100vh - 100px);
}
`
const ProductCon=({allProducts})=>{
  if(allProducts.length>0){
    return(
      <PCon>
      {allProducts.map(card=><Card image={card.displayImage} id={card._id} name={card.name} price={card.price} rating={4.5} />)}
      </PCon>

    )

  }
  return <EmptyCon  name='products'/>
}



 const Home=()=>{
    const dispatch=useDispatch()
    const otherDetails=useSelector(selectOtherDetails)
    const  menuOpen=useSelector(selectMenuOpen)
    
    const allProducts=useSelector(selectProducts)
  
    const categoryList=[
        {text:"home-appliances",id:useId(),icon:RiFridgeLine},
         {text:"food",id:useId(),icon:ImSpoonKnife},
         {text:"pets",id:useId(),icon:MdPets},
         {text:"computing",id:useId(),icon:MdOutlineComputer},
         {text:"healthcare",id:useId(),icon:MdOutlineHealthAndSafety}

        ];

    const theme=useSelector(selectTheme)
    const currentCategory=  useSelector(selectCategory)
    const pattern=useSelector(selectPattern)[theme]
return (

    <AppCon  pattern={pattern}>
  
    <Container open={menuOpen}  >
        <Header/>
        <hr style={{margin:"10px auto",height:'0.5px',backgroundColor:"lightgray",opacity:"0.2"}}/>
        <Mid>
            <Categories onClick={()=>dispatch(toggleMenu())} current={theme} show={menuOpen}>
            <SearchCon>
            <CiSearch />
            <SearchInp onChange={(e)=>{dispatch(setSearch(e.target.value))}} placeholder='Search products'/>
            </SearchCon>
            <CategoryCon>
            <CategoryHeader>Categories</CategoryHeader>
            {categoryList.map(category=><CategoryItem key={category.id} text={category.text} style={{transform:`rotate(${(currentCategory===category.text)?'10deg':'0deg'})`,border:`${(currentCategory===category.id)?'0.5px solid black':'none'}`}} icon={category.icon} id={category.id} />)}
            <CategoryHeader>Price Range:</CategoryHeader>
            <PriceRange/>
           {otherDetails.isAdmin&&<Link to='/admin'>Admin page</Link>}
           
            </CategoryCon>

            </Categories>
            <Products>
              <div className='header-text-con'>

                <div className='product-header'>
                <p >{"Top picks just for you".split(' ').filter(str=>str!==" ").map(word=><span className='bouncing'> {word}</span>)}</p>
                </div>
              </div>
                <ProductCon allProducts={allProducts}/>
            </Products>
        </Mid>
    </Container>
    </AppCon>
)
}
export default Home