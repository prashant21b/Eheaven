import React from 'react'
import '../pages/Cart.css'
import { remove ,decreaseQuantity,increaseQuantity} from '../redux/slices/cartSlice'
import { useSelector,useDispatch } from 'react-redux'
export const CartCard = ({item}) => {
    const cart=useSelector((state)=>state.cart.cart);
    // const totalQuantity=useSelector((state)=>state.cart.totalQuantity);
    const dispatch=useDispatch();

    const removeFromCartHandler=()=>{
      dispatch(remove(item));
    }
    const decresaeHandler=()=>{
        dispatch(decreaseQuantity(item));

    }
   const quantity=()=>{
    for(let i=0;i<cart.length;i++){
        if(cart[i]._id===item._id){
            return cart[i].totalQuantity;
        }
    }
   }
   const increaseHandler=()=>{
    dispatch(increaseQuantity(item));
   }
   console.log(quantity())
  return (
    <div class="cart-item">
                        <div class="row">
                            <div class="col-md-6 my-auto">
                                <a href="">
                                    <label class="product-name">
                                        <img src={item.thumbnail} style={{width: "50px",height:"50px"}} alt=""/>
                                       {item.title}
                                    </label>
                                </a>
                            </div>
                            <div class="col-md-2 my-auto">
                                <label class="price">${item.price}</label>
                            </div>
                            <div class="col-md-2 col-7 my-auto">
                                <div class="quantity">
                                    <div class="input-group">
                                        <span class="btn btn1"><i class="fa fa-minus" onClick={decresaeHandler}></i></span>
                                        {/* <input type="text" value={cart.totalQuantity} class="input-quantity" /> */}
                                        <div className='input-quantity'>{quantity()}</div>
                                        <span class="btn btn1"><i class="fa fa-plus" onClick={increaseHandler}></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-2 col-5 my-auto">
                                <div class="remove">
                                    <a onClick={removeFromCartHandler} class="btn btn-danger btn-sm">
                                        <i class="fa fa-trash"></i> Remove
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
  )
}
