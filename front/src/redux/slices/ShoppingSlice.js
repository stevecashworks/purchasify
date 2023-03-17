 import {createSlice} from '@reduxjs/toolkit';
 const initialState= {
    cart:{},
    favs:[],
    category:"",
    products:[],
    sort:'',
    range:{min:'', max:''},
    search:""


 } 
 const ShoppingSlice=createSlice({
  name:'shopping',
  initialState,
  reducers:{
        addToFavourites:(state,action)=>{
            state.favs=[...state.favs,action.payload]
        },
        addToCart:(state,action)=>{
            state.cart=action.payload
        },
        removeFromCart:(state,action)=>{
             state.cart= state.cart.filter(x=>x.id!==action.payload)
        },
        removeFromFavourites:(state,action)=>{
            state.cart= state.cart.filter(x=>x.id!==action.payload)
       },
        setProducts:(state,action)=>{
            state.products=action.payload;
        },
        setSort:(state,action)=>{
            state.sort=action.payload;
        },
        setCategory:(state,action)=>{
            state.category=action.payload;
        },
        setMax:(state,action)=>{
            state.range={...state.range, max:action.payload}
        },
        setMin:(state,action)=>{
            state.range={...state.range, min:action.payload}
        },
        setSearch:(state,action)=>{
            state.search=action.payload
        }
    
  }
  })
  export const {setSort,setCategory,setSearch,setProducts,addToFavourites,removeFromCart,addToCart,setMax,setMin}=ShoppingSlice.actions
  export const selectCart=state=>state.shopping.cart
  export const selectProducts=state=>state.shopping.products
  export const selectSort=state=>state.shopping.sort
  export const selectCategory=state=>state.shopping.category
  export const selectFavs=state=>state.shopping.favs
  export const selectRange=state=>state.shopping.range
  export const selectSearch=state=>state.shopping.search
export  default ShoppingSlice.reducer