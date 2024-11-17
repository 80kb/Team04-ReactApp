// Cart.js
import React from 'react';

const Cart = ({ items, clearCart }) => {
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
                    <button onClick={clearCart}>Clear Cart</button>
                </>
            )}
        </div>
      </div>
    );
};

export default Cart;


