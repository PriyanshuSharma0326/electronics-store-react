import React from 'react';
import './cart-item.styles.scss';

function CartItem({ item }) {
    const { name, imageURL, price, quantity } = item;

    return (
        <div className='cart-product-container'>
            <div className="product-image-container">
                <img src={imageURL} alt={name} />
            </div>

            <div className="cart-product-details">
                <h2 className='name'>{name}</h2>

                <h2 className='price'>${price}</h2>

                {/* <h2 className=''>details</h2> */}
            </div>
        </div>
    )
}

export default CartItem;
