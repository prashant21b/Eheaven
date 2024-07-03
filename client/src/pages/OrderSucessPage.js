import React from 'react';
import { Link } from 'react-router-dom'; 
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh', 
  },
  orderSuccess: {
    textAlign: 'center',
  },
  orderId: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  backToOrders: {
    fontSize: '18px',
    color: '#007bff',
    textDecoration: 'none',
  },
};

function OrderSuccessPage({ orderId }) {
  return (
    <div style={styles.container}>
      <div style={styles.orderSuccess}>
        <h1>Order Successful!</h1>
        <p>Your order has been placed.</p>
        <p style={styles.orderId}>Order ID: #{orderId}</p>
        <Link to="/my-orders" style={styles.backToOrders}>
          <i className="fa fa-chevron-left"></i> Back to My Orders
        </Link>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
