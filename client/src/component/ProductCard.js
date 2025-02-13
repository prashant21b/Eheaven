import React from 'react';
import './ProductCard.css';
import '../pages/Home.css';
import { Link, useNavigate } from 'react-router-dom';
import { add } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishList } from '../redux/slices/wishSlice';
import { toast } from 'react-hot-toast';

export const ProductCard = ({ item }) => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const addToCartHandler = () => {
        if (item.stock === 0) {
            toast.error('This item is out of stock!');
            return;
        }
        dispatch(add(item));
      //  toast.success('Item added to cart!');
    };

    const wishListHandler = () => {
        dispatch(addToWishList(item));
      //  toast.success('Item added to wishlist!');
    };

    return (
        <div className="col-md-3">
            <div className="product-card">
                <div className="product-card-img">
                    {item.stock > 0 ? (
                        <label className="stock bg-success">In stock</label>
                    ) : (
                        <label className="stock bg-danger">Out of stock</label>
                    )}
                    <img src={item.thumbnail} alt="Laptop" />
                </div>
                <div className="product-card-body">
                    <p className="product-brand">{item.brand}</p>
                    <h5 className="product-name">
                        <Link to="">
                            {item.title}
                        </Link>
                    </h5>
                    <div>
                        <span className="selling-price">${item.price}</span>
                        <span className="original-price">{item.discountPercentage} % off</span>
                    </div>
                    <div className="mt-2">
                        <button onClick={addToCartHandler} className="btn btn1" >
                            Add To Cart
                        </button>
                        <button onClick={wishListHandler} className="btn btn1">
                            <i className="fa fa-heart"></i>
                        </button>
                        <Link className="btn btn1" to={`/productDetails/${item._id}`}> View </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
