import React, { useEffect, useRef, useState } from 'react'
import './ProductDetails.css'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { add } from '../redux/slices/cartSlice'
import { addToWishList } from '../redux/slices/wishSlice'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { ProductCard } from '../component/ProductCard'
import {toast} from 'react-hot-toast'
//   const  focus=useRef(null)
export const ProductDetails = () => {
    
   const  products=useSelector((state)=>state.product.product);
    const {productId} = useParams();
    console.log("productid",productId)
   const dispatch = useDispatch();
   const [product,setProduct]=useState([]);
   const [category,setCategory]=useState([]);
   
   function getProductById(){
    setProduct(products.find(product => product._id === productId));
   }
   function getAllProctWithSameCategory() {
    const similarProduct = [];
    products?.forEach((item) => {
      if (item.category === product.category) {
        similarProduct.push(item);
      }
    });
    setCategory(similarProduct);
  }
  const  focus=useRef(null)
  console.log(focus.current)
  useEffect(()=>{
         focus.current.focus()
  },[productId])
   useEffect(()=>{
    getProductById(addToWishList);
    getAllProctWithSameCategory();
   },[]);
   
   function addToCartHandler(){
    if(product.stock===0){
        toast.error("Product is out of Stock")
        return;
    }
    dispatch(add(product))
   }
   function addWishListHandler(){
    dispatch(addToWishList(product))
   }
   useEffect(() => {
    // Scroll to the top of the page when component mounts or productId changes
    window.scrollTo(0, 0);
    // getProductById();
    // getAllProctWithSameCategory();
  }, [productId]);

    return (
        
        <div  className="py-3 py-md-5 bg-light">
            <div  className="container">
                <div  ref={focus} className="row">
                    <div className="col-md-5 mt-3">
                        <div className="bg-white border">
                            <img src={product?.thumbnail} className="w-100" alt="Img" />
                        </div>
                    </div>
                    <div className="col-md-7 mt-3">
                        <div className="product-view">
                            <h4 className="product-name">
                                {product?.title}
                                {

                                  product?.stock> 0 ? (
                                        <label className="label-stock bg-success">In Stock</label>
                                    ) : (
                                        <label className="label-stock bg-danger">Out of stock</label>
                                    )
                                }
                            </h4>
                            <hr />
                            <div className="product-path">Rating:
                                {
                                    product?.rating>3?( <h3>{product?.rating} <span style={{color:'green'}}> <i class="fa fa-star" aria-hidden="true"></i></span></h3>):
                                    ( <h3>{product?.rating} <span style={{color:'orange'}}> <i class="fa fa-star" aria-hidden="true"></i></span></h3>)
                                }
                               
                               
                            </div>
                            <div>
                                <span className="selling-price"> ${product?.price}</span>
                                <span className="original-price">{product?.discountPercentage} % off</span>
                            </div>
                            <div className="mt-2">
                                <div className="input-group">
                                    <span className="btn btn1"><i className="fa fa-minus"></i></span>
                                    <input type="text" value="1" className="input-quantity" />
                                    <span className="btn btn1"><i className="fa fa-plus"></i></span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <Link onClick={addToCartHandler} className="btn btn1"> <i className="fa fa-shopping-cart" ></i> Add To Cart</Link>
                                <Link onClick={addWishListHandler} className="btn btn1"> <i className="fa fa-heart"></i> Add To Wishlist </Link>
                            </div>
                            <div className="mt-3">
                                <h5 className="mb-0">Small Description</h5>
                                <p>
                                    {product?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12 mt-3">
                        <div className="card">
                            <div className="card-header bg-white">
                                <h4>Description</h4>
                            </div>
                            <div className="card-body">
                                <p>
                                    {product?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-3 py-md-5 bg-light">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="mb-4" style={{textAlign:'center'}}>Similar Products</h4>
            </div>
            {
                category.map((item,index)=>{
                    return <ProductCard key={index} item={item}/>
            })
            }
        </div>
    </div>
</div>
        </div>
      
    )
}
