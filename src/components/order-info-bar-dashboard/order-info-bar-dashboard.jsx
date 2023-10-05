import React from 'react';
import './order-info-bar-dashboard.style.scss';

function OrderInfoBarDashboard({ orderInfo }) {
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
        </div>
    )
}

export default OrderInfoBarDashboard;
