import './App.css';
import styled from 'styled-components'
export const ApiEntry="http://localhost:8080/api/v3"
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
