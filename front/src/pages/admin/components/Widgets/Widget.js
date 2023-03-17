import styled from 'styled-components'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { useNavigate } from 'react-router-dom'
const WidgetCon=styled.div`
box-shadow:2px 2px 5px rgb(0,0,0,0.2) ;
height:150px;
width 260px;
border-radius:5px;
padding:5px;
display:flex;
justify-content:space-between;
`
const Left=styled.div`
display:flex;
flex-direction:column;
height:100%;

`
const Right=styled.div`
display:flex;
flex-direction:column;
justify-content:space-around;
height:100%;
padding:10px auto;
`
const Title=styled.p`
font-size:22px;
font-weight:600;
color:gray;
margin:10px ;

`
const Amount=styled.p`
font-size:20px;
font-weight:500;
margin:10px;
`
const Purpose= styled.p`
font-size:14px;
margin:5px ;
font-weight:400;
`
const Hr=styled.hr`
color:gray;
`
const Top=styled.div`
display:flex;
color:${props=>props.col};
`
const Bottom=styled.div`
padding:4px;
color:${props=>props.col};
background-color:${props=>props.back};
width:35px;
height:35px;
border-radius:5px;
display:flex;
align-items:center;
justify-content:center;
`
const Widget=({title,perc,no,icon,path})=>{
    const navigate=useNavigate()
    const Icon=icon
    const col=perc<50?"rgb(138, 43,26)":"rgb(0,119,190)"
    let back, color;
    switch(title){
        case "Users":{back="rgb(155,135,12, 0.1)"; color="rgb(155,135,12)"; break}
        case "Orders":{back="rgb(138,43,26, 0.1)"; color="rgb(138,43,26)"; break}
        case "Products":{back="rgb(0,119,190, 0.1)"; color="rgb(0,119,190)";break}
    }
    return(
        <WidgetCon onClick={()=>{navigate(path)}}>
            <Left>
            <Title>{title}</Title>
            <Amount>{no}</Amount>
            <Purpose>See more {title}</Purpose>
            <Hr/>
            </Left>
            <Right>
                <Top col={col}>
                <KeyboardArrowUpIcon style={{marginRight:"10px"}}/> {perc}%
                </Top>
                <Bottom col={color} back={back}>
                <Icon/>
                </Bottom >
            </Right>

        </WidgetCon>
    )
}
export default Widget