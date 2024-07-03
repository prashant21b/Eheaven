import React,{useState} from 'react'
import './forgot.css'
import axios from 'axios';
export const ForgotPassword = () => {
    const [email,setEmail]=useState('');
     async function emailSubmitHandler(e){
        e.preventDefault();
     const response=await axios.post('',{
        email
     })
     }
  return (
 
        
  <div className="subscribe">
    <p>ForgotPassword</p>
    <input placeholder="Your e-mail" className="subscribe-input" value={email} name="email" type="email" onChange={(e)=>setEmail(e.target.value)}/>
    <br/>
    <div className="submit-btn" onClick={emailSubmitHandler}>GET OTP</div>
  </div>

   
  )
}
