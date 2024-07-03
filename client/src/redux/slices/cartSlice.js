import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  cart:localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],
  totalPrice:0,
  totalCartQuantity:0,
 
}
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    add: (state,action) => {
     const itemIndex= state.cart.findIndex((item)=>item._id===action.payload._id);
     if(itemIndex>=0){
      state.cart[itemIndex].totalQuantity+=1;
     }
     else{
      const tempProduct={...action.payload,totalQuantity:1}
        state.cart.push(tempProduct);
     }
     localStorage.setItem("cart",JSON.stringify(state.cart));
     toast.success(`${action.payload.title} added into cart` ,{position:'top right'})
    },
    remove: (state,action) => {
      const nextCartItems= state.cart.filter(
        (cartitem)=>cartitem._id!==action.payload._id
       )
       state.cart=nextCartItems;
       localStorage.setItem("cart",JSON.stringify(state.cart));
       toast.error(`${action.payload.title} removed from cart` ,{position:'top right'})
       
    },
    increaseQuantity: (state, action) => {
      const itemIndex=state.cart.findIndex(
        cartItem=>cartItem._id===action.payload._id
       )
        state.cart[itemIndex].totalQuantity+=1
        localStorage.setItem("cart",JSON.stringify(state.cart));
    },
    decreaseQuantity: (state, action) => {
       const itemIndex=state.cart.findIndex(
        cartItem=>cartItem._id===action.payload._id
       )
       if(state.cart[itemIndex].totalQuantity>1){
        state.cart[itemIndex].totalQuantity-=1
       }
       else if(state.cart[itemIndex].totalQuantity===1){
        const nextCartItems= state.cart.filter(
          (cartitem)=>cartitem._id!==action.payload._id
         )
         state.cart=nextCartItems;
         toast.error(`${action.payload.title} removed from cart` ,{position:'top right'})
        }
        localStorage.setItem("cart",JSON.stringify(state.cart));
      },
  },
})
export const { add, remove, increaseQuantity,decreaseQuantity,calculateCartPrice,totalQuantityInCart} = cartSlice.actions

export default cartSlice.reducer