import React, { useState } from 'react'
import './Checkout.css';
import { useSelector, useDispatch, } from 'react-redux';
import { calculateCartPrice } from '../redux/slices/cartSlice';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { baseURL } from '../url';
import { clearCart } from '../redux/slices/cartSlice';
export const Chechout = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token)
    const cart = useSelector((state) => state.cart.cart);
    const dispatch=useDispatch();
    const totalCartQuantity = () => {
        let sum = 0
        for (let i = 0; i < cart.length; i++) {

            sum = sum + cart[i].totalQuantity;
        }
    }
    const totalCartPrice = () => {
        let sum = 0;
        for (let i = 0; i < cart.length; i++) {
            let number = cart[i].price;
            sum = sum + number * cart[i].totalQuantity;
        }
        return sum;
    }
    console.log("price", totalCartPrice());
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [pin, setPin] = useState('')
    const [address, setAddress] = useState('')
    const [paymentMethod, setpaymentMethod] = useState('');
    function selectCashOndilivery() {
        setpaymentMethod('cash');
    }
    function selectOnlineMode() {
        setpaymentMethod('online');
    }
    function getCartItemsWithId(cart) {
        return cart.map(item => ({ product: item._id }));
    }
    function getCartItemsQuantity(cart) {
        return cart.map(item => ({ quantity: item.totalQuantity }));
    }
    function getCartItemsPrice(cart) {
        return cart.map(item => ({ price: item.sellingPrice }));
    }
    const products = [];
    for (let i = 0; i < cart.length; i++) {
        products.push({
            product: getCartItemsWithId(cart)[i].product,
            quantity: getCartItemsQuantity(cart)[i].quantity,
            price: getCartItemsPrice(cart)[i].price,
        });
    }
    console.log(products)
    console.log(decodedToken.id);
    const cashOnDeliveryHandler = async (e) => {
        e.preventDefault();
    
        // Validate form fields
        if (!name) {
            toast.error('Full Name is required');
            return;
        }
        if (!phone) {
            toast.error('Phone Number is required');
            return;
        }
        if (!email) {
            toast.error('Email Address is required');
            return;
        }
        if (!pin) {
            toast.error('Pin-code is required');
            return;
        }
        if (!address) {
            toast.error('Address is required');
            return;
        }
    
        try {
            const response = await axios.post(`${baseURL}/api/v1/addorder`, {
                user: decodedToken.id,
                products: products,
                shippingAddress: {
                    fullName: name,
                    phone: phone,
                    email: email,
                    pin: pin,
                    address: address,
                    // paymentMethod:paymentMethod,
                },
                totalAmount: totalCartPrice(),
            });
    
            if (response.status === 201) {
                toast.success('Order Placed successfully');
                dispatch(clearCart())
                navigate('/myorder');
               
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to place the order');
        }
    };
    
    const amount = totalCartPrice()
    async function addOrderToDatabase(options) {
        try {
            const res = await axios.post(`${baseURL}/api/v1/addorder`, {
                user: decodedToken.id,
                products: products,
                shippingAddress: {
                    fullName: name,
                    phone: phone,
                    email: email,
                    pin: pin,
                    address: address,
                },
                totalAmount: totalCartPrice(),
            });
    
            if (res.status === 201) {
                toast.success('Order Places successfully');
                navigate('/myorder');
            }
        } catch (error) {
            console.log(error);
        }
    }
    async function checkoutHandler() {
        if (!name) {
            toast.error('Full Name is required');
            return;
        }
        if (!phone) {
            toast.error('Phone Number is required');
            return;
        }
        if (!email) {
            toast.error('Email Address is required');
            return;
        }
        if (!pin) {
            toast.error('Pin-code is required');
            return;
        }
        if (!address) {
            toast.error('Address is required');
            return;
        }
    
        const { data: { key } } = await axios.get(`${baseURL}/api/getkey`)

        const { data: { order } } = await axios.post(`${baseURL}/api/v1/checkout`, {
            amount,
            user: decodedToken.id,
                products: products,
                shippingAddress: {
                    fullName: name,
                    phone: phone,
                    email: email,
                    pin: pin,
                    address: address,
                }
               
        })
        const options = {
            key,
            amount: order.amount,
            currency: "INR",
            name: "Eheaven",
            description: "Tutorial of RazorPay",
            image: "https://logo.com/image-cdn/images/kts928pd/production/396f6f3c7f506eb9674c2a6e244249faeda83b00-424x419.png?w=1080&q=72",
            order_id: order.id,
            callback_url: `${baseURL}/api/v1/paymentverification`,
            prefill: {
                name: "Prashant Kumar Jha",
                email: "jhakumarprasant111@gmail.com",
                contact: "9999999999"
            },
            notes: {
                "address": "Razorpay Corporate Office"
            }
            ,
            theme: {
                "color": "#121212"
            }
        };
        const razor = new window.Razorpay(options);
        razor.on('payment.success', function (response) {
            console.log('Payment successful', response);
            addOrderToDatabase(options);
        });
        
        razor.on('payment.error', function (response) {
            console.log('Payment failed', response.error.description);
        });
        
        razor.open();
    }

    return (
        <div className="py-3 py-md-4 checkout">
            <div className="container">
                <h4>Checkout</h4>
                <hr />

                <div className="row">
                    <div className="col-md-12 mb-4">
                        <div className="shadow bg-white p-3">
                            <h4 className="text-primary">
                                Item Total Amount :${totalCartPrice()}
                                <span className="float-end"></span>
                            </h4>
                            <hr />
                            <small>* Items will be delivered in 3 - 5 days.</small>
                            <br />
                            <small>* Tax and other charges are included ?</small>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="shadow bg-white p-3">
                            <h4 className="text-primary">
                               Shipping Address
                            </h4>
                            <hr />

                            <form action="" method="POST">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <label>Full Name</label>
                                        <input type="text" name="name" value={name} className="form-control" placeholder="Enter Full Name" onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Phone Number</label>
                                        <input type="number" name="phone" value={phone} className="form-control" placeholder="Enter Phone Number" onChange={(e) => setPhone(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Email Address</label>
                                        <input type="email" name="email" value={email} className="form-control" placeholder="Enter Email Address" onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <label>Pin-code (Zip-code)</label>
                                        <input type="number" name="pin" value={pin} className="form-control" placeholder="Enter Pin-code" onChange={(e) => setPin(e.target.value)} />
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Full Address</label>
                                        <textarea name="address" value={address} className="form-control" rows="2" onChange={(e) => setAddress(e.target.value)}></textarea>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <label>Select Payment Mode: </label>
                                        <div className="d-md-flex align-items-start">
                                            <div className="nav col-md-3 flex-column nav-pills me-3" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                                <button className="nav-link fw-bold" id="cashOnDeliveryTab-tab" data-bs-toggle="pill" data-bs-target="#cashOnDeliveryTab" type="button" role="tab" aria-controls="cashOnDeliveryTab" aria-selected="true" onClick={selectCashOndilivery}>Cash on Delivery</button>
                                                <button className="nav-link fw-bold" id="onlinePayment-tab" data-bs-toggle="pill" data-bs-target="#onlinePayment" type="button" role="tab" aria-controls="onlinePayment" aria-selected="false" onClick={selectOnlineMode}>Online Payment</button>
                                            </div>
                                            <div className="tab-content col-md-9" id="v-pills-tabContent">
                                                <div className="tab-pane fade" id="cashOnDeliveryTab" role="tabpanel" aria-labelledby="cashOnDeliveryTab-tab" tabindex="0">
                                                    <h6>Cash on Delivery Mode</h6>
                                                    <hr />
                                                    <button type="button" className="btn btn-primary" onClick={cashOnDeliveryHandler}>Place Order (Cash on Delivery)</button>

                                                </div>
                                                <div className="tab-pane fade" id="onlinePayment" role="tabpanel" aria-labelledby="onlinePayment-tab" tabindex="0">
                                                    <h6>Online Payment Mode</h6>
                                                    <hr />
                                                    <button type="button" className="btn btn-warning" onClick={checkoutHandler}>Pay Now (Online Payment)</button>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
