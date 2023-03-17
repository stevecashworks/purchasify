import  styled from 'styled-components'
import camImg from '../../../assets/cam.png'
import { useSelector } from 'react-redux'
 import {useState} from 'react'
import { selectTheme } from '../../../redux/slices/themes'
import { useNavigate } from "react-router-dom";
import uploadToFirebase from '../upload'
import './new.css'
const Container=styled.form`
display:flex;
transition:all 1s ease;
width:90%;
margin:0 auto;
border:0.5px solid gray;
border-collapse:collapse;
@media (max-width:480px){
    flex-direction:column;
    height:auto;
    border:none;
    overflow:hidden;
    max-height:${props=>props.open?"auto":"0px"};
}
`
const Left=styled.div`
 flex:1;
 display:flex;
 border-right:0.5px solid gray;
 height:100%;
 align-items:center;
 justify-content:center;
 flex-direction:column;
 gap:20px;

 `
 const ImgCon=styled.label`
 width:200px;
 height:200px;
 position:relative;
 border-radius:50%;
 cursor:pointer;
 `
const Right=styled.div`
flex:2;
 display:flex;
 flex-wrap:wrap;
 padding:15px;
 gap:10%;
 @media (max-width:480px){
    flex-direction:column;
    height:auto;
}

`
const Image=styled.img`
width:200px;
height:200px;
object-fit:cover;
border-radius:50%;

`
const Label=styled.label`
text-transform:capitalize;
display:block;
margin:5px auto;
cursor:pointer;



`

const Background=styled.div`


`


const Group=styled.div`
width:40%;
@media (max-width:480px){
    width:90%;
    margin:10px; auto;
}
`
const Input=styled.input`
width:100%;
background:transparent;
border:none;
outline:none;
border-bottom: 1px solid ${props=>props.theme==='dark'?'white':'black'};
color:${props=>props.theme==='dark'?'white':'black'};
`
const New=({type,open})=>{
    const nav=useNavigate()
    const [file,setFile]=useState('')
    const [admin,setAdmin]=useState(false)
    

    const theme=useSelector(selectTheme)
     const formDetails={
        
        products:[
        {name:"name", id:'productName'},
        {name:"description",id:"description"},
        {name:'price',id:'price'},
        {name:'categories',id:'categories',placeholder:"seperate with commas (e.g: 'pets,health-care') "},

],
users:[
    {name:"name",id:"userName"},
    {name:"email",id:"email"},
    {name:"password",id:"password"},
    {name:"isAdmin",id:"isAdmin"}

]


}
const submitItem=async(e)=>{
    e.preventDefault()
     const formData= new FormData(e.target);
     const object={}
      formData.forEach((value,key)=>{
        object[key]=value
      })
      object.isAdmin=admin;

      console.log(object)
      

      
      try{
  await uploadToFirebase(file,type,object.image.name,`${type}-images`,object,nav)
      }
 
      catch(err){
            console.log(err)
      }

}

 return(
 <Container open={open} onSubmit={(e)=>{submitItem(e)}}>
    <Left>
        <ImgCon className='uploadImg' htmlFor='imgInp'>
        <Image  src={file?URL.createObjectURL(file):camImg}/>
        </ImgCon>
        {/* <ProgressBar val={progress}> */}
            
            
        {/* </ProgressBar> */}

    </Left>
    <Right>
        <Input name='image' type='file' onChange={(e)=>setFile(e.target.files[0])} style={{display:'none'}} id='imgInp'/>
    {formDetails[type].map(item=>{
        const {name}=item
        switch(name){
            case "description":return(
                <Group>
                <Label  htmlFor={item.id}>{name}:</Label>
                <textarea name={item.name} id={item.id} style={{height:"30px",width:"100%"}} placeholder={item.placeholder}></textarea>
                </Group>
            );
            case "password":
                return(
                    <Group >
                           <Label  htmlFor={item.id} >{name}:</Label>
                        <Input  onChange={(e)=>console.log(e.target.checked)} name={item.name} theme={theme} id={item.id} type="password"/>
                    </Group>

                );
            
            case "price":
                return(
                    <Group>
                           <Label htmlFor={item.id}>{item.name}($):</Label>
                        <Input name={item.name} type='number' theme={theme} id={item.id} placeholder={item.placeholder}/>
                    </Group>
                    );
            case "isAdmin":
                return(
                    <Group style={{display:'flex'}}>
                           <Label style={{display:'inline-block'}} htmlFor={item.id} >Would you give this user admin priveledges:</Label>
                        <Input style={{display:'inline-block',width:"35px",height:"35px",borderRadius:"10px"}} onChange={(e)=>setAdmin(e.target.checked)} name={item.name} theme={theme} id={item.id} type="checkbox"/>
                    </Group>
            );   
            
            default:
                return(
                    <Group>
                           <Label htmlFor={item.id}>{item.name}:</Label>
                        <Input name={item.name} theme={theme} id={item.id} placeholder={item.placeholder}/>
                    </Group>
            )        
            

        }
              
    })}
    <button style={{marginBottom:"10px"}} class='admin-add-btn' type='submit'>Add {formDetails.type} </button>

    </Right>

 </Container>   
    )
}
export default New