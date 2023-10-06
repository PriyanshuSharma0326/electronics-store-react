import React from 'react';
import './order-info-bar-account-page.style.scss';
import Button from '../button/button.component';
import { updateOrderStatus } from '../../lib/utils/firebase.utils';

function OrderInfoBarAccountPage({ orderInfo }) {
    const handleCancelItem = async () => {
        await updateOrderStatus({
            statusID: '4',
            statusName: 'Cancelled'
        }, orderInfo.orderID);
    }

    return (
        <div className="order-info-bar-account-page">
            <div className="order-info">
                <div className="product-image-container">
                    <img src={orderInfo.item.imageURL} alt={orderInfo.item.name} />
                </div>

                <div className="order-product-details">
                    <h1>Product Name: <span>{orderInfo.item.name}</span></h1>
                    <div className="bind">
                        <h2>Price: <span>${orderInfo.item.price}</span></h2>
                        <h2>Quantity: <span>{orderInfo.item.quantity}</span></h2>
                    </div>
                    <h2>Order Date: <span>{orderInfo.orderDate}</span></h2>
                    <h2>Order ID: <span>{orderInfo.orderID}</span></h2>
                    <h2>Payment ID: <span>{orderInfo.paymentID}</span></h2>
                    <h2 className='order-status'>Order Status: <span style={{ color: orderInfo.orderStatus?.statusName === 'Delivered' ? 'var(--green-4)' : (orderInfo.orderStatus?.statusName === 'Cancelled' ? 'var(--red)' : 'inherit') }}>{orderInfo.orderStatus?.statusName}</span></h2>
                </div>
            </div>

            {(orderInfo.orderStatus?.statusID !== '3' && orderInfo.orderStatus?.statusID !== '4') && <Button 
                buttonText='Cancel Item' 
                buttonType='simple' 
                onClick={handleCancelItem} 
            />}
        </div>
    )
}

export default OrderInfoBarAccountPage;
