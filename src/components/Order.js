import React, { useState, useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { getCurrentUser } from 'aws-amplify/auth';
import '../styles/Order.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Order = () => {

 const [orderData,setOrderData] = useState({
 	OrderID: 0,
 	Items: [],
 	Order_Date: new Date().toLocaleDateString(),
 	Order_Notifications: 'Received',
 	Order_Price: 0,
 	Order_Status: 'Ordered (Not Shipped)',
 	UserID: '',
 });

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
		//Automatically Sets userID in Order Data.
		setOrderData((prevData) => ({
                    ...prevData,
                    UserID: user.username,
		}));
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

	const generateUniqueID = () => Date.now() + 20;

	//Important Function, after hitting the submit button, sends order to database.
	const submitOrder = async () => {

        const totalCost = cartItems.reduce((total, item) => total + item.price, 0);

        const itemsList = cartItems.map((item) => item.name);

	  const updatedOrderData = {
            ...orderData,
            OrderID: generateUniqueID(),
            Items: itemsList,
            Order_Price: totalCost,
	    Order_Date: new Date().toLocaleDateString(),
        };

	//console.log('Submitting Order Data:', updatedOrderData);
	
	try {
	    const response = await fetch(
                'https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/orders',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedOrderData),
                }
            );

	    if (!response.ok) {
                const errorResponse = await response.json();
                console.error('Error from server:', errorResponse);
                throw new Error('Failed to submit order');
            }

	    const result = await response.json();
            console.log('Order submitted successfully:', result);

	    /*const updatedPoints = userData.Points - totalCost;

	    const updatedUserData = {
            ...userData, // Start with the current user data
            Points: updatedPoints, // Subtract points
            };
		
	    console.log('Updating user data:', updatedUserData);
	    const pointsResponse = await fetch(`https://th3uour1u1.execute-api.us-east-2.amazonaws.com/devStage006/users/${userID}`,
            {
                method: 'PATCH', // Use PATCH to partially update the user's data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUserData),
            }
        );

	if (!pointsResponse.ok) {
            const errorResponse = await pointsResponse.json();
            console.error('Error updating user points:', errorResponse);
            throw new Error('Failed to update user points');
        }

	setUserData(updatedUserData);*/
	//const pointsResult = await pointsResponse.json();
        //console.log('User points updated successfully:', pointsResult);

            alert('Order submitted successfully!');
            localStorage.removeItem('cart'); // Clear the cart
            navigate('/catalog');

        } catch (error) {
            console.error('Error submitting order:', error);
            alert('There was an error submitting the order.');
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
                            submitOrder();
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
