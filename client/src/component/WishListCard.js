import React from 'react'
import '../pages/Cart.css'
import { useDispatch } from 'react-redux'
import { removeFromWishList } from '../redux/slices/wishSlice'
import { add } from '../redux/slices/cartSlice'
export const WishListCard = ({ item }) => {
    const dispatch = useDispatch();
    const removeFromWishListHandler = () => {
        dispatch(removeFromWishList(item));
    }
    const addToCartHandler=()=>{
        dispatch(add(item));
    }
    return (
        <div class="cart-item">
            <div class="row">
                <div class="col-md-6 my-auto">
                    <a href="">
                        <label class="product-name">
                            <img src={item.thumbnail} style={{ width: "50px", height: "50px" }} alt="" />
                            {item.title}
                        </label>
                    </a>
                </div>
                <div class="col-md-2 my-auto">
                    <label class="price">${item.price}</label>
                </div>
                <div class="col-md-2 col-7 my-auto">
                    <div class="quantity">
                        {
                            item.stock> 0 ? (
                                <label className="stock bg-success" style={{ color: 'white', borderRadius: '4px' }}>In stock</label>
                            ) : (
                                <label className="stock bg-danger">Out of stock</label>
                            )
                        }
                    </div>
                </div>
                <div class="col-md-2 col-5 my-auto">
                    <div class="remove" onClick={removeFromWishListHandler}>
                        <a class="btn btn-danger btn-sm">
                            <i class="fa fa-trash"></i> Remove
                        </a>
                    </div>

                </div>
                <div class="col-md-2 col-5 my-auto">
                    <div class="remove">
                        <a class="btn btn-success btn-sm" onClick={addToCartHandler}>
                            <i className="fa fa-shopping-cart"></i> Add to cart
                        </a>
                    </div>

                </div>
            </div>
        </div>
    )
}
