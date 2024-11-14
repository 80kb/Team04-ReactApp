// Cart.js
import React from 'react';

const Cart = ({ items }) => {
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            <div className="cartItems">
                {items.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    items.map((item, index) => (
                        <div className="cartItem" key={index}>
                            <img src={item.image} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.price} points</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Cart;

