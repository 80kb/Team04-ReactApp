import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';
import '../styles/Order.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Order = () => {
/* ****  START FROM STEP 2, GEtting the Correct Route in Main.js   */

    /*Based off Example From Dashboard.js(Getting infromation from the database)*/
    const [userData, setUserData] = useState(null);
    const [userID, setUserID] = useState(null);
    
    const navigate = useNavigate();

    /*Takes Current Cart From Cart.js to display in Order.js*/
    const {state} = useLocation();
    const { cartItems = [] } = state || {};



       const handleBackClick = () => {
         navigate('/catalog'); /* Navigate back to the Catalog page */
       };

    /*Fetch user ID*/
    useEffect(() => {
        const fetchUserID = async () => {
            try {
                const user = await getCurrentUser(); // Assuming you have this function
                setUserID(user.username);
            } catch (error) {
                console.error('Error fetching user ID:', error);
            }
        };

        fetchUserID();
    }, []);

    /*Fetch user data*/
    useEffect(() => {
        if (userID) {
            fetchUserData();
        }
    }, [userID]);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${userID}`);
            if (!response.ok) {
                throw new Error('Failed to fetch user data');
            }
            const result = await response.json();
            setUserData(result.Item);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

	return (
	   <div className="order-page">
		<button className="back-button" onClick={handleBackClick}>
                   ← Back to Catalog
                </button>

		<h1>Order Processing</h1>

		 {cartItems.length > 0 ? (
                <div className="cart-summary">
                    <h3>Cart Items</h3>
                    <ul className="cart-items-list">
                        {cartItems.map((item, index) => (
                            <li key={index} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="cart-item-details">
                                    <p>{item.name}</p>
                                    <p>{item.price} points</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="total-points">
                        <strong>
                            Total Points:{' '}
                            {cartItems.reduce((total, item) => total + item.price, 0)} points
                        </strong>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty!</p>
            )}

		{/*Responsible for getting Current Points and Address from user account*/}
	      {userData ? (
                <div className="user-details-box">
                    <p><strong>Current Shipping Address:</strong> {userData.Address || 'No address on file'}</p>
                    <p><strong>Available Points:</strong> {userData.Points}</p>
		</div>
		):(
		   <p>Loading user data...</p>
		)}

	{/*For Confrim Pruchase button, see if they Can even Purchase the Products.*/}
        {cartItems.length > 0 && userData && (
            <div className="confirm-purchase">
                <button
                    className="confirm-purchase-button"
                    onClick={() => {
                        const totalCost = cartItems.reduce((total, item) => total + item.price, 0);
                        if (userData.Points >= totalCost) {
                            alert('Purchase confirmed! Thank you for your order.');
                            // Clear the cart from localStorage
                            localStorage.removeItem('cart');
                            navigate('/catalog'); // Redirect to catalog after purchase
                        } else {
                            alert('Insufficient points to complete this purchase.');
                        }
                    }}
                >
                    Confirm Purchase
                </button>
            </div>
             )}
              {/*End of Div for order-Page*/}
          </div>

	);
};

export default Order;
