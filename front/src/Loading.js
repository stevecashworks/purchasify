import styled from  'styled-components'
import loading from './loading.gif'

const Image=styled.img`
width:15px;
height:15px;
margin-right:10px;
`
const Loading=()=>{
    return <Image src={loading}/>
}
export default Loading