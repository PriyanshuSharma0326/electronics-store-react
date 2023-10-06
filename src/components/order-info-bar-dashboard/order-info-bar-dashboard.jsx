import React, { useState } from 'react';
import './order-info-bar-dashboard.style.scss';
import orderStatus from '../../constants/order-status';
import { updateOrderStatus } from '../../lib/utils/firebase.utils';

function OrderInfoBarDashboard({ orderInfo }) {
    const [isOpen, setIsOpen] = useState(false);

    const changeOrderStatus = async (status) => {
        await updateOrderStatus(status, orderInfo.orderID);
        setIsOpen(false);
    }

    return (
        <div className="order-info-bar-dashboard">
            <div className="order-info">
                <div className="product-image-container">
                    <img src={orderInfo.item.imageURL} alt={orderInfo.item.name} />
                </div>

                <div className="order-product-details">
                    <h1>Product Name: <span>{orderInfo.item.name}</span></h1>
                    <h2>Price: <span>${orderInfo.item.price}</span></h2>
                    <h2>Quantity: <span>{orderInfo.item.quantity}</span></h2>
                    <h2>Order ID: <span>{orderInfo.orderID}</span></h2>
                </div>

                <div className="order-by-details">
                    <h1>Order By: <span>{orderInfo.name}</span></h1>
                    <h2>Address: <span>{orderInfo.address}</span></h2>
                    <h2>Order Date: <span>{orderInfo.orderDate}</span></h2>
                    <h2>Payment ID: <span>{orderInfo.paymentID}</span></h2>
                </div>
            </div>

            <div className="order-status-change">
                {orderInfo.orderStatus?.statusName !== 'Delivered' ? 
                    (orderInfo.orderStatus?.statusName !== 'Cancelled' ? 
                        <div className="form-dropdown-input">
                            <div 
                                className='dropdown-button' 
                                type='button' 
                                onClick={() => setIsOpen(!isOpen)} 
                            >
                            {orderInfo.orderStatus?.statusName}
                            </div>
                            {isOpen && <ul className="dropdown-options">
                                {orderStatus.map(status => (
                                    <li 
                                        key={status.statusID} 
                                        className="dropdown-option"
                                        onClick={() => changeOrderStatus(status)} 
                                    >
                                        <p>{status.statusName}</p>
                                    </li>
                                ))}
                            </ul>}
                        </div> :
                        <div className="cancelled-status">
                            {orderInfo.orderStatus?.statusName}
                        </div>
                    ) : 
                    <div className="delivered-status">
                        {orderInfo.orderStatus?.statusName}
                    </div>
                }
            </div>
        </div>
    )
}

export default OrderInfoBarDashboard;
