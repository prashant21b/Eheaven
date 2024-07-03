import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';
const initialState = {
  wish:localStorage.getItem("wish") ? JSON.parse(localStorage.getItem("wish")):[],
}
export const wishSlice = createSlice({
  name: 'wish',
  initialState,
  reducers: {
    addToWishList: (state,action) => {
     const itemIndex= state.wish.findIndex((item)=>item._id===action.payload._id);
     if(itemIndex>=0){
      state.wish[itemIndex].totalQuantity+=1;
     }
     else{
      const tempProduct={...action.payload,totalQuantity:1}
        state.wish.push(tempProduct);
     }
     localStorage.setItem("wish",JSON.stringify(state.wish));
     toast.success(`${action.payload.title} added into wishList` ,{position:'top right'})
    },
    removeFromWishList: (state,action) => {
      const nextCartItems= state.wish.filter(
        (wishitem)=>wishitem._id!==action.payload._id
       )
       state.wish=nextCartItems;
       localStorage.setItem("wish",JSON.stringify(state.wish));
       toast.error(`${action.payload.title} removed from wishList` ,{position:'top right'})
       
    },
    
    
  },
})
export const { addToWishList, removeFromWishList} = wishSlice.actions

export default wishSlice.reducer