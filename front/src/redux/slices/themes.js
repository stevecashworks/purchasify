import {createSlice} from '@reduxjs/toolkit';
const initialState={
    current:'light',
    pattern:{
        dark:{
            text:'white',
            background:"#333"
        },
        light:{
            text:'black',
            background:"white"
        }
    }
} 

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme:(state,action)=>{
            state.current=action.payload;
        }

    }
 })
 export const {setTheme}=themeSlice.actions
 export const selectTheme=state=>state.theme.current;
 export const selectPattern=state=>state.theme.pattern;

 export default  themeSlice.reducer