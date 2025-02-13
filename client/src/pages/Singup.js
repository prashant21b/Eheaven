import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { baseURL } from '../url';

export const Singup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!name.trim()) {
            toast.error('Name is required');
            return;
        }
        if (!email.trim()) {
            toast.error('Email is required');
            return;
        }
        if (!password.trim()) {
            toast.error('Password is required');
            return;
        }
        if (password.length < 6) {
            toast.error('Password must be at least 6 characters long');
            return;
        }
        if (password !== confirmedPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(`${baseURL}/api/v1/singup`, {
                name,
                email,
                password,
                confirmedPassword
            });

            if (response.status === 200) {
                navigate('/login');
                toast.success('Signup successful');
            } else if (response.status === 400) {
                const responseData = response.data;
                toast.error(responseData.message || 'Signup failed');
            }
        } catch (error) {
            toast.error('Error in Signup');
        }
    };

    return (
        <div className="form-container">
            <p className="title">Signup</p>
            <form className="form" onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Name</label>
                    <input onChange={(e) => setName(e.target.value)} className='inp' type="text" name="name" value={name} placeholder="Enter your name.." required />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className='inp' type="email" name="email" value={email} placeholder="Enter your email.." required />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className='inp' type="password" name="password" value={password} placeholder="Enter Your Password" required />
                </div>
                <div className="input-group">
                    <label htmlFor="confirmedPassword">Confirm Password</label>
                    <input onChange={(e) => setConfirmedPassword(e.target.value)} className='inp' type="password" name="confirmedPassword" value={confirmedPassword} placeholder="Confirm Your Password" required />
                </div>
                <button style={{ marginTop: '10px' }} className="sign">Signup</button>
            </form>
            <p className="signup">Already registered?
                <Link to="/Login">Login</Link>
            </p>
        </div>
    );
};
