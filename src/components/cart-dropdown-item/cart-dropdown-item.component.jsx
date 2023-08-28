import React from 'react';
import './cart-dropdown-item.styles.scss';

function CartDropdownItem({ name, quantity, imageURL, price }) {
    return (
        <div className='cart-dropdown-item-container'>
            <div className="dropdown-item-image">
                <img src={imageURL} alt={name} />
            </div>

            <div className="item-details">
                <span className='name'>{name}</span>

                <span className='price'>
                    {quantity} &#215; ${price}
                </span>
            </div>
        </div>
    )
}

export default CartDropdownItem;
