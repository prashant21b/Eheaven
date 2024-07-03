import React from 'react';

import './OrderCard.css'; // Create a CSS file for styling
import { useNavigate } from 'react-router-dom';

const OrderCard = ({item}) => {
    const navigate=useNavigate();
    console.log("item",{item})
   const orderDetailsHandler=()=>{
    navigate('/orderdetails')
   }
  return (
    <div className="order-card">
      <div className="image-container">
        <img src={item.thumbnail}  style={{width: "50px",height:"50px"}} alt="Product" />
      </div>
      <div className="order-details">
        <h6>Expected Delivery Date: 10/10/2023</h6>
        <h5>{item.title}</h5>
      </div>
      <div className="details-icon" onClick={orderDetailsHandler}>
        {/* <GrNext size="lg" /> */}
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export default OrderCard;
