import { createSlice } from "@reduxjs/toolkit";
const adminSlice=createSlice({
    initialState:{allProducts:[],allUsers:[]},
    name:'products',
    reducers:{
        setProducts:(state,action)=>{
            state.allProducts=action.payload
        },
        setUsers:(state,action)=>{
            state.allUsers=action.payload
        }
    }
})
export const {setProducts,setUsers}= adminSlice.actions
export const selectUsers=(state)=>state.admin.allUsers
export const selectProducts= (state)=>state.admin.allProducts
export default adminSlice.reducer