import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { storeproduct } from '../redux/slices/productSlice';
import { showLoader, hideLoader } from '../redux/slices/loaderSlice';
import './Header.css';
import { baseURL } from '../url';
export const Header = () => {
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch();
    const isLoading = useSelector((state) => state.loader.isLoading);
    async function getAllProduct() {
        try {
            dispatch(showLoader());
            const response = await axios.get(`${baseURL}/api/v1/product`);
            const result = response.data;
            const products = result.data;
            setProduct(products);
            dispatch(hideLoader());
            products.forEach((item) => {
                dispatch(storeproduct(item));
            });
        } catch (error) {
            console.log(error);
        }
    }

    const products = useSelector((state) => state.product.product);
    const [query, setQuery] = useState('');

    useEffect(() => {
        getAllProduct();
    }, []);

    const navigate = useNavigate();
    const logoutHandler = () => {
        navigate('/login');
        localStorage.removeItem('token');
    };

    const cart = useSelector((state) => state.cart.cart);
    const wish = useSelector((state) => state.wish.wish);

    function searchHandler(e) {
        e.preventDefault();
        navigate(`/search/${query}`);
    }

    return (
        <div className="main-navbar shadow-sm sticky-top">
            <div className="top-navbar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 my-auto d-none d-sm-none d-md-block d-lg-block">
                            <h5 className="brand-name">EHeaven</h5>
                        </div>
                        <div className="col-md-5 my-auto">
                            <form role="search" onSubmit={searchHandler}>
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="Search your product"
                                        className="form-control"
                                        value={query}
                                        onChange={(e) => setQuery(e.target.value)}
                                    />
                                    <button className="btn bg-white" type="submit">
                                        <i className="fa fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-5 my-auto">
                            {localStorage.getItem('token') ? (
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">
                                            <i className="fa fa-shopping-cart"></i> Cart ({cart.length})
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/wishlist">
                                            <i className="fa fa-heart"></i> Wishlist ({wish.length})
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link dropdown-toggle"
                                            to="#"
                                            id="navbarDropdown"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="fa fa-user"></i> Account
                                        </Link>
                                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                            <li>
                                                <Link className="dropdown-item" to="/profile">
                                                    <i className="fa fa-user"></i> Profile
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/myorder">
                                                    <i className="fa fa-list"></i> My Orders
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/wishlist">
                                                    <i className="fa fa-heart"></i> My Wishlist
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/cart">
                                                    <i className="fa fa-shopping-cart"></i> My Cart
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" onClick={logoutHandler}>
                                                    <i className="fa fa-sign-out"></i> Logout
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                </ul>
                            ) : (
                                <ul className="nav justify-content-end">
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/cart">
                                            <i className="fa fa-shopping-cart"></i> Cart ({cart.length})
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/login">
                                            <i className="fa fa-sign-in" aria-hidden="true"></i> Login
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <Link className="navbar-brand d-block d-sm-block d-md-none d-lg-none" to="#">
                        EHeaven
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/filter">
                                    All Filter
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notfound">
                                    New Arrivals
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notfound">
                                    Featured Products
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={`/search/Smartphone`}>
                                    Electronics
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    Fashions
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notfound">
                                    Accessories
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/notfound">
                                    Appliances
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};
