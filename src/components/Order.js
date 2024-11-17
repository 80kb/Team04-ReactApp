import React from 'react';
import '../styles/Order.css';
import { useNavigate } from 'react-router-dom';

const Order = () => {

       const navigate = useNavigate();

       const handleBackClick = () => {
         navigate('/catalog'); /* Navigate back to the Catalog page */
       };

	return (
	   <div className="order-container orders">
		<button className="back-button" onClick={handleBackClick}>
                   ← Back to Catalog
                </button>

		<h1>Order Processing</h1>
		<p>Order Page</p>
	   </div>
	);
};

export default Order;
