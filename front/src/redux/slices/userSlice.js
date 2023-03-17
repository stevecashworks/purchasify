import {createSlice} from '@reduxjs/toolkit'
const initialState={
    isLogged:false,
      otherDetails:{},
      loading:false
    

}
const userSlice=createSlice({
 name:"user",
 initialState,
 reducers:{
 setIsLogged:(state,action)=>{
    state.isLogged=action.payload
 },
 setOtherDetails:(state,action)=>{
   state.otherDetails=action.payload
 },
 toggleLoading:(state,action)=>{
  state.loading=!state.loading
 }

 }
})
export default userSlice.reducer
export const selectIsLogged=(state)=>state.user.isLogged
export const selectLoading=(state)=>state.user.loading
export const selectOtherDetails=(state)=>state.user.otherDetails
export const {setIsLogged,setOtherDetails,toggleLoading}=userSlice.actions