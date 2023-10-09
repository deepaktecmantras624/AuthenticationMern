import {configureStore} from "@reduxjs/toolkit"
import  productSlice  from "../redux/productSlice"
import userSlice from "./userSlice"


const store=configureStore({
    reducer:{
        app:productSlice,
        user:userSlice
        
    }
})

export default store