import React, { useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
 import { baseURL } from '../url'
export const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const handleEmailChange = (e) => {
		setEmail(e.target.value);
	};

	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	const navigate = useNavigate();
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${baseURL}/api/v1/login`, {
				email: email,
				password: password
			});
         console.log("res",response);
			if (response.status === 200) {
				if (response.data.success) {
					localStorage.setItem("token",response.data.token);
					navigate('/');
					toast.success('Login successfully');
				} else {
					toast.error(response.data.message || 'Error in Login');
				}
			}
			 else{
				toast.error('Error in Login');
			}
		}
		catch (error) {
			console.log(error);
			toast.error('Error in Login');
		}
	};
	return (
		<div className="form-container">
			<p className="title">Login</p>
			<form className="form">
				<div className="input-group">
					<label for="username">Email</label>
					<input onChange={handleEmailChange} className='inp' type="email" name="email" value={email} id="username" placeholder="" />
				</div>
				<div className="input-group">
					<label for="password">Password</label>
					<input onChange={handlePasswordChange} className='inp' type="password" name="password" value={password} id="password" placeholder="" />
					<div className="forgot">
						<Link rel="noopener noreferrer" to='/forgotpassword'>Forgot Password ?</Link>
					</div>
				</div>
				<button className="sign" onClick={handleSubmit}>Sign in</button>
			</form>
			<div className="social-message">
				<div className="line"></div>
				<p className="message">Login with social accounts</p>
				<div className="line"></div>
			</div>
			<div className="social-icons">
				<button aria-label="Log in with Google" className="icon">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
						<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
					</svg>
				</button>
			</div>
			<p className="signup">Don't have an account?
				<Link rel="noopener noreferrer" to="/singUp" className="">Sign up</Link>
			</p>
		</div>
	)
}
