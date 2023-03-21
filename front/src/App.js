import './App.css';
import styled from 'styled-components'
// const localApi="http://localhost:8080"
const webApi="https://purchapi.onrender.com"
export const ApiEntry=`${webApi}/api/v3`
  export const AppCon= styled.div`
    width:100%
    overflow-x:hidden;
    height:auto;
    display:grid;
    place-items:center;
    background-color:${props=>props.pattern.background};
    color:${props=>props.pattern.text};
    transition:all 0.5 ease;
 ` 
function App() {

  return (
    <AppCon/>
  );
}

export default App;
