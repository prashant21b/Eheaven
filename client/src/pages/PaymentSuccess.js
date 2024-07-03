import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './PaymentSuccess.css'; // Import your CSS file

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];
  const referenceNum = searchQuery.get('reference');
 const navigate=useNavigate();
  return (
    <div className="payment-success-container">
      <div className="payment-success-content">
        <h1 className="payment-success-heading">Order Successful</h1>
        <p>Reference No. {referenceNum}</p>
        <button onClick={()=>{navigate('/myOrder')}} className="my-order-button">Go to My Orders</button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
