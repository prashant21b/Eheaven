import React from 'react'
import './Cart.css'
import { CartCard } from '../component/CartCard'
import { Chechout } from '../component/Chechout'
import { useSelector, useDispatch } from 'react-redux';
import {BiArrowBack} from 'react-icons/bi'
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const navigate=useNavigate();
    const containerStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      };
    
      const iconStyles = {
        fontSize: '2rem',
      };
    
   const cart=useSelector((state)=>state.cart.cart);
  return (
    cart.length===0?(<div style={containerStyles}>
        <BiArrowBack className='icons' onClick={()=>navigate('/')} style={iconStyles}/>
        <div className='text'>Go to Home Page</div>

    </div>):(
    <div class="py-3 py-md-5 bg-light">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="shopping-cart">

                    <div class="cart-header d-none d-sm-none d-mb-block d-lg-block">
                        <div class="row">
                            <div class="col-md-6">
                                <h4>Products</h4>
                            </div>
                            <div class="col-md-2">
                                <h4>Price</h4>
                            </div>
                            <div class="col-md-2">
                                <h4>Quantity</h4>
                            </div>
                            <div class="col-md-2">
                                <h4>Remove</h4>
                            </div>
                        </div>
                    </div>
               {/* <CartCard/>
               <CartCard/>
               <CartCard/>        */}
               {
                cart.map((item,index)=>{
                    return <CartCard key={index} item={item}/>
                })
               }

                </div>
            </div>
        </div>

    </div>
    {
        localStorage.getItem("token")?(<Chechout/>):(<div></div>)
    }
    
</div>
    )
  )
}
