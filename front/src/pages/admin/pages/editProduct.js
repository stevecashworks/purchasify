import styled from 'styled-components'
import {useLocation} from 'react-router-dom'
import {ApiEntry} from '../../../App'
import  {useState,useEffect,useRef} from 'react';
import { Link } from 'react-router-dom';
import {MdOutlineKeyboardBackspace} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';
import submit from './submit';
const Container=styled.div`
width:100%;
overflow-x:scroll;



`
const Details=styled.div`
height:100%;
flex:2;
margin-top:30px;

`
const Image=styled.img`
width:150px;
@media (max-width:480px){
  width:80%;
  margin:0  auto;
}
`
const ImageCon=styled.label`
flex:1;
display:flex;
align-items:center;
justify-content:center;
width:280px;
height:250px;
margin-right:12px;
border-radius:25px;
cursor:pointer;
position:relative;
box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
@media (max-width:480px){
  width:100%;
}
`
const SubmitBtn=styled.button`
 color:white;
 font-weight:bold;
 background-color:blueviolet;
 width:120px;
 border-radius:10px;
 height:30px;
 margin:10px auto;
 display:block;
 border:none;
 cursor:pointer;
`
const ChangeImg=styled.label`
 cursor:pointer;
 
 position:absolute;
 bottom:-30px;
 right:20px;
 border-radius:12px;
 height:30px;
 width:250px;
text-align:center;
border:1px solid white;
@media (min-width:600px){
   background-color:transparent;
   color:black;
   left:0;
   width:100%;
   text-align:center;
   bottom:0;
}
`
const GroupCon=styled.div`
color:black;
border:1px solid #ddd;
padding:10px;
margin:10px;
border-radius:10px;
height: fit-content;
padding:10px;
@media (max-width:480px){
  width:90%;
  box-sizing:border-box;
  

}
`
const SubCon=styled.div`
display:flex;
width:100%;
align-items:center;
margin-top:20px;
@media (max-width:480px){
  flex-direction:column-reverse;
  
}
` 
const Cat=styled.div`
background-color:#eef;
display:flex;
align-items:center;
justify-content:center;
padding:10px 25px;
border-radius:15px;
color:rgb(0,0,0,0.8);
font-size:13px;
font-weight:200;
position:relative;
`
const CatCon=styled.div`
display:flex;
gap:5px;
flex-wrap:wrap;
`
const Inp=styled.input`
display:none;
`
const EditBtn=styled.button`
border:1px solid #ddd;
 color:#ddd;
  width:120px;
  height:30px;
  border-radius:10px;
  background-color:transparent;
 cursor:pointer;
 @media (max-width:480px){
  width:40%;
 }
`
const Name=styled.div`
text-transform:capitalize;
margin-right:10px;
maxWidth:500px;
@media (max-width:480px){
  max-width:80%;
  width:90%;
}


`
const GroupSub=styled.div`
display:flex;
width:100%;
justify-content:space-between;
@media (max-width:480px){
  
flex-direction:column;
  gap:10px;
}
`
const InpField=styled.input`
border-radius:10px;
padding:7px;
margin:10px auto;
display:block;
height:35px;
width:500px;
@media (max-width:480px){
  width:80%;
  
}
`
const TextArea=styled.textarea`
border-radius:10px;
padding:7px;
margin:10px auto;
display:block;
height:35px;
width:500px;
@media (max-width:480px){
  width:80%;
  
}
`
export const BackBtn=({m,path,t})=>{
  return(
    <Link  style={{display:"flex",alignItems:"center",margin:m||"5px auto" ,textDecoration:"none",transform:t||'none' }}to={path}>
            <MdOutlineKeyboardBackspace style={{marginRight:"10px"}}/>
            Go-back
                </Link>
  )
}  
const Group=({fieldName,data,update})=>{
 const val=data[fieldName]
    
   const categoryRef=useRef()
  const [inputOpen,setInputOpen]=useState(false);
    const sym=fieldName==="price"?"$":""
if(fieldName!=="categories"){
return(
    <GroupCon>
      
      <GroupSub >

      <Name>{`${fieldName}: ${sym}${val}`}</Name>
      <EditBtn  onClick={()=>{setInputOpen(!inputOpen)}}>Edit</EditBtn>
      </GroupSub>
      {inputOpen&&<div  >
        
          
                {fieldName==='price'?(
                <InpField  value={val} onChange={(e)=>{update({...data,[fieldName]:e.target.value});e.target.focus()}}  placeholder={`${fieldName} goes here`}type="number"/> 
                ):
                <TextArea value={val} onChange={(e)=>{update({...data,[fieldName]:e.target.value})}}  placeholder={`${fieldName} goes here`}/>
                
                
                }



        
      </div>}

    </GroupCon>

  )
}

  return(
    <GroupCon>
      <GroupSub >

      <div style={{textTransform:"capitalize",marginRight:"10px"}}>{`${fieldName}:`}
        <CatCon>
          {val.map(item=>{
            return(
              <Cat>{item}
               <button
               onClick={()=>[update({...data,[fieldName]:val.filter(x=>x!==item)})]} 
               style={{width:'15px',height:"15px",position:"absolute",right:"0px",top:"0px",color:"red",display:"flex",alignItems:"center",justifyContent:"center",border:"none",borderRadius:"50%"}}>x</button></Cat>
            )
          })}
        </CatCon></div>
      <button style={{border:"1px solid #ddd", color:"#ddd", width:"120px",height:"30px",borderRadius:"10px",  backgroundColor:"transparent", cursor:"pointer"}} onClick={()=>{setInputOpen(!inputOpen)}}>Add</button>
      </GroupSub>
      {inputOpen&&<div style={{ marginTop:"10px",display:'flex',gap:"20px",alignItems:"center"}}>

            <input style={{width:"300px",height:"30px" }} ref={categoryRef}></input>
        <button
        onClick={()=>{if(!val.includes(categoryRef.current.value)){update({...data,[fieldName]:[...val,categoryRef.current.value]})}}}
        style={{backgroundColor:'blueviolet',cursor:"pointer",color:"white", border:"none",width:"120px",height:"30px",borderRadius:"15px",fontWeight:"bold"}}>Done</button>
      </div>}

    </GroupCon>

  )

    
}


const EditProduct=()=>{
  const [productData,setProductData]= useState({})
   const [image,setImage]=useState()
   const nav=useNavigate()
  
   const [file,setFile]=useState()
   const  [changes,setChanges]=useState({})
   useEffect(()=>{if(file){setImage(URL.createObjectURL(file))}},[file])
   useEffect(()=>{
    setImage(productData.displayImage)
   },[productData])
  
  
  
  const loc=useLocation()
  const  productId= loc.pathname.split('/')[3]
  useEffect(()=>{
    const getProductDetails=async()=>{
           await fetch(`${ApiEntry}/products/one/${productId}`).then(res=>res.json()).then(data=>{
            if(data.success){
              setProductData(data.result)
              setChanges(data.result)
            }
           })
    }
    getProductDetails()
  },[])
  
  const {createdAt,updatedAt,__v,_id,otherImages,displayImage,...others}=changes;
if(Object.keys(productData).length!==0)  return (
    
    <Container>
      
     {  (Object.keys(changes).length!==0) &&(

          <SubCon>
            
            <Details>
              {

             Object.keys(others).map(
              detail=>{
                return(
                  <Group  data={changes} fieldName={detail} update={setChanges}/>
                    
                
                )
              }
                )
              }
              <Inp type="file" id="editImg" onChange={(e)=>{setFile(e.target.files[0])}} />
            </Details>
          
            <ImageCon htmlFor='editImg' >

            <Image src={image}/>
            <ChangeImg htmlFor="editImg"> Click to change image</ChangeImg>
            </ImageCon>
            

          </SubCon>

      )}
            <SubmitBtn onClick={()=>{submit((image!==productData.displayImage),changes,productData,file,nav)}}>Submit</SubmitBtn>
                
                <BackBtn path="/admin/products"/>
      </Container>
      
    
    
      )
      return <></>
}

export default EditProduct