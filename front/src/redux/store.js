import {configureStore} from '@reduxjs/toolkit'
import menuSlice from './slices/menuSlice'
import ShoppingSlice from './slices/ShoppingSlice'
import themes from './slices/themes'
import userSlice from './slices/userSlice'
import adminSlice from '././slices/adminSlice'
 const store= configureStore({
    reducer:{
        theme:themes,
        shopping:ShoppingSlice,
        user:userSlice,
        menu: menuSlice,
        admin:adminSlice
    }
 })
 export default store