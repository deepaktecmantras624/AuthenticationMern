import {combineReducers, configureStore} from "@reduxjs/toolkit"
import  productSlice  from "./productSlice"
import userSlice from "./userSlice"



const rootReducer=combineReducers({
    app:productSlice,
    user:userSlice
    
})
const store=configureStore({
    reducer:rootReducer
})

export default store