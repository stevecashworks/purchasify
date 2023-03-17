import styled from 'styled-components'
import book from '../book.png'
 import {Link, useNavigate} from 'react-router-dom'
const Tablecon=styled.div`
display:block;
width:100%;
margin:30px auto;
@media (max-width:480px){
  width:100%;
  overflow-x:scroll;
  
  ::-webkit-scrollbar{
  width:12px;
  margin-top:10px;
};
::-webkit-scrollbar-track{
  background-color:#f2f2f2;
  border-radius: 10px;

};
::-webkit-scrollbar-thumb{
  background-color:#a0a0a0;
  border-radius: 10px;
  transition:all  0.25s  ease;
};
::-webkit-scrollbar-thumb:hover{
  background-color:#ddd;
}
}
`
const ActBtn=styled.button`
width:60px;
cursor:pointer;
height:30px;
color:${props=>props.col};
background-color:${props=>props.bcol};
border:none;
display:inline;
border-radius:10px;

`
const Table=styled.div`
 width:600px;
 margin:20px auto;
 
`
const Img=styled.img`
 width:70px;
 height:70px;
 margin:10px auto;


`
const Th=styled.th`
width:180px;
font-size:13px;
text-align:left;
font-weight:400;
text-transform:capitalize;



`
const Tr=styled.tr`
font-size:13px;
font-weight:200;
text-transform:capitalize;
text-align:left;
border-bottom: 0.5px solid #ddd;


`
const Td=styled.td`
text-align:left;
font-size:13px;
width:180px
font-weight:200;
text-transform:capitalize;
align-items:center;
justify-content: flex-start;
align-items:center;
border-bottom: 0.5px solid #ddd;

@media (max-width:480px){
  font-size:13px;

  
  
}



`

const Empty=styled.div`
display:flex;
width:100%;
justify-content:center;
gap:20px;
align-items:center;
`
const EmptyImg=styled.img`
width:50px;
`
const EmptyText=styled.p`
`
export const EmptyCon=({name})=>{
  return(
<Empty>
                <EmptyImg src={book}/>
                <EmptyText>No {name} were found</EmptyText>
            </Empty>
  )
}


const TableCon=({data,deleteItem,type,editLink})=>{
    const nav=useNavigate()
    if(data.length===0){
      return(
        <Tablecon>
          <EmptyCon name='products'/>     
        </Tablecon>
      )      
    }
    return (
        <Tablecon>
    <Table>
      <thead style={{ padding:"5px",borderBottom:"0.5px solid #ddd"}}>

      
        <Th>Image</Th>
        <Th>name</Th>
        <Th>{type==="Products"?"price":"email"}</Th>
        <Th>action</Th>
  
      
      </thead>
      <tbody style={{  padding:"5px"}}>

      {data.map(item=>{
        return(
          <Tr>
        <Td><Img src={type==="Products"?item.displayImage:item.image}/></Td>
        <Td>{type==="Products"?item.name:item.name}</Td>
        <Td>{type==="Products"?item.price:item.email}</Td>
        <Td type={"flex"}>
          <Link  style={{color:"initial",textDecoration:"none"}}to ={`${editLink}/${item._id}`}>
          <ActBtn col="darkseagreen" bcol="rgb(0,255,0,0.1)">Edit</ActBtn>
          </Link>
          <ActBtn col="crimson" bcol="rgb(255,0,0,0.1)" onClick={()=>{
            deleteItem(item
              ._id,nav)
            }}>Delete</ActBtn>
          
          </Td>
  
      </Tr>
        )
      })}
      </tbody>

    </Table>




    </Tablecon>
)
}
export default   TableCon
