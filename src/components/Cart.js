/* Cart.js */
import React from 'react';
import { useNavigate } from 'react-router-dom';


const Cart = ({ items, clearCart }) => {
    
   const navigate = useNavigate();
   const handleCheckout = () => {
        // Clear the cart and navigate to the orders page
        //clearCart();
	 
        navigate('/order');
    };

    return (
        <div className="cart">
            <h2>Cart</h2>
	    <div className="cartItems">
            {items.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <>
                    <ul>
                        {items.map((item, index) => (
                            <div className="cartItem" key={index}>
                                <img src={item.image} alt={item.name} />
                                <p>{item.name}</p>
                                <p>{item.price} points</p>
                            </div>
                        ))}
                    </ul>
		      <button className="checkoutButton" onClick={handleCheckout}>Checkout</button>
                      <button onClick={clearCart} className="clearCartButton">Clear Cart</button>
                      
                </>
            )}
        </div>
      </div>
    );
};

export default Cart;


