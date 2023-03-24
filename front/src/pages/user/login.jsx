import {useRef}from 'react';
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import { ApiEntry } from '../../App';
const Container=styled.div`
display:grid;
place-items:center;
height:100vh;

`
const Button=styled.button`
font-weight:bold;
color:white;
background-color:blueviolet;
fon-size:18px;
padding:5px;
border:none;
width:120px;
height:30px;
border-radius:10px;
margin:20px auto;
cursor:pointer;
transition:all 0.5s ease;
&:hover{
    opacity:0.5
}
`
const Inp=styled.input`
 width:250px;
 height:35px ;
`
const Form=styled.form`
     width:300px;
     height:400px;
     border-radius:30px;
     border:1px solid black;
     display:flex;
     align-items:center;
     flex-direction:column;
     gap:25px;

`
const Title= styled.p`
text-align:center;
margin:30px auto;
font-weight:500;
font-size:20px;
`

const  Login=()=>{
  
   const login=async(details)=>{
     const {password,email}=details
     try{
         const  thisUser=await fetch(`${apiEntry}/user/login`,{
            method:'POST',
            headers:{
               'Content-Type':"application/json"
               
            },
            body:JSON.stringify({email,password})
         }).then(res=>res.json()).then(data=>data);
         if(thisUser.success){
            localStorage.setItem('token',thisUser.result.accessToken)
            localStorage.setItem('id',thisUser.result._id)
         
         }
         else{
            alert('login unsuccessful')
         }
     }catch(err){
      console.log(err)
     }


  }
    const emailRef=useRef(null);
 const passwordRef=useRef(null);

    return(
 <Container>
    <Form onSubmit={(e)=>{e.preventDefault();login({email:emailRef.current.value,password:passwordRef.current.value})}}>
  <Title>Login</Title>
  <Inp ref={emailRef} type='email' required placeholder='Please input your email'></Inp>    
  <Inp ref={passwordRef} type='password' required minLength={6} placeholder='Please input your password'></Inp>
     <Link to="/register"style={{textDecoration:'none',fontSize:'12px'}}>Do not have an account? sign up here</Link>
  <Button type='submit' >Login</Button>    
    </Form>
 </Container>)

}
export default Login