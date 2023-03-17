import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setMin,setMax} from '../../../../redux/slices/ShoppingSlice';
const Container=styled.div`
 padding:20px;
 display:flex;
 justify-content:space-around;

`
const Inp=styled.input`
 width:40px;
 height:20px;
`
const DataContainer=styled.div`
display:flex; 
gap:15px;
align-items:center;
`
const DataText=styled.div`
font-weight:500;
font-size:12px;
`
const PriceRange=()=>{
    const dispatch=useDispatch();

    return (
    <Container>
        <DataContainer>
            <DataText>Min</DataText>
            <Inp placeholder='$' type='number' onChange={(e)=>{dispatch(setMin(Number(e.target.value)))}}/>
        </DataContainer>
        <DataContainer>
            <DataText>Max</DataText>
            <Inp placeholder='$' type='number' onChange={(e)=>{dispatch(setMax(Number(e.target.value)))}}/>
        </DataContainer>

    </Container>
)
}
export default PriceRange