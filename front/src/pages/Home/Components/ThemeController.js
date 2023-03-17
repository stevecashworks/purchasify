import styled from 'styled-components';
import  {useDispatch, useSelector} from 'react-redux'
import  {setTheme,selectPattern,selectTheme} from '../../../redux/slices/themes'
import {BiSun} from 'react-icons/bi'
import {GiMoon,} from 'react-icons/gi'
const Contianer= styled.div`
display:flex;
gap:5px;
@media (max-width:480px){
 display:none   
}
`
const Bridge= styled.div`
height:10px;
width:40px;
border:1px solid ${props=>props.col};
border-radius:5px;
 
`
const Dot=styled.div`
height:10px;
width:10px;
background-color:lightblue;
border-radius:50%;
transition:all 0.5s ease;
transform:translateX(${props=>props.position});
`

const ThemeController=()=>{
    const theme=useSelector(selectTheme)
    const pattern= useSelector(selectPattern)
    const dispatch=useDispatch()
    const nextTheme= theme==='light'?'dark':'light'
    const dotPosition= theme==='light'?'0px':'30px'
    return(
        <Contianer onClick={()=>{dispatch(setTheme(nextTheme))}} >
            <BiSun/>
            <Bridge col={pattern[theme].text} className='bridge'>
                <Dot  position={dotPosition}/>
            </Bridge>
            <GiMoon />
        </Contianer>
    )

}
export default ThemeController