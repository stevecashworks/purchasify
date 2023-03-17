import {createSlice} from '@reduxjs/toolkit';
const MenuSlice=createSlice({
     name:'menu',
     initialState:{open:false},
     reducers:{
        toggleMenu:(state,action)=>{
            state.open=!state.open
        }
     }
})
export const {toggleMenu}=MenuSlice.actions
export const selectMenuOpen=state=>state.menu.open
export default MenuSlice.reducer