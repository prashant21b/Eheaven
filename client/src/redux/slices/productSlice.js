import { createSlice } from "@reduxjs/toolkit";

const initialState={product:[]}
const productSlice=createSlice({
name:'product',
initialState,
reducers:{
    storeproduct:(state,action)=>{
    state.product.push(action.payload);
    },
}
})

export const {storeproduct}=productSlice.actions

export default productSlice.reducer;

