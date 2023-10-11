import React, { useContext, useState } from 'react';
import './cart.styles.scss';
import { CartContext } from '../../context/cart-context';
import { CartItem, Button } from '../../constants/index';
import { addOrderedProductToCollection, clearUserCart } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

function Cart() {
    const navigate = useNavigate();

    const { userCart, exchangeRate } = useContext(CartContext);

    const { currentUser, userDoc } = useContext(UserContext);

    const clearCart = () => {
        clearUserCart(currentUser.uid);
    }

    const total = userCart.reduce((prev, curr) => prev + Number(curr.price)*Number(curr.quantity), 0)

    let total_localised = total.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const [error, setError] = useState('');

    const buyProducts = () => {
        var options = {
            key: process.env.REACT_APP_RAZORPAY_KEY,
            key_secret: process.env.REACT_APP_RAZORPAY_SECRET,
            amount: total * 100 * parseInt(exchangeRate),
            currency: "INR",
            name: "CircuitCart",
            description: "to facilitate dummy payments",
            image: 'https://purepng.com/public/uploads/large/google-stadia-logo-3cx.png',
            order_receipt: uuidv4(),
            prefill: {
                contact: `+91${userDoc.phoneNumber}` 
            },
            theme: {
                color: "#3399cc",
            },

            handler: function (response) {
                const paymentID = response.razorpay_payment_id;

                const orderMadeBy = {
                    userID: userDoc?.uid,
                    name: userDoc?.displayName,
                    address: userDoc?.address,
                }

                const orderInfo = userCart.map(item => {
                    return (
                        {
                            item,
                            orderDate: new Date().toLocaleString("en-US", {
                                month: "short",
                                day: "2-digit",
                                year: "numeric",
                            }),
                            paymentID,
                            orderID: uuidv4(),
                            orderStatus: {
                                statusName: 'Pending',
                                statusID: 0
                            },
                            ...orderMadeBy
                        }
                    )
                });

                try {
                    if(orderInfo.length > 1) {
                        orderInfo.forEach(order => {
                            addOrderedProductToCollection(order);
                        });
                    }
                    else {
                        addOrderedProductToCollection(orderInfo[0]);
                    }
                    clearUserCart(userDoc?.uid);
                    navigate('/account');
                }
                catch (err) {
                    alert('Payment error!');
                }
            },
        };

        var pay = new window.Razorpay(options);
        if(!userDoc.address || !userDoc.phoneNumber) {
            setError('Update Profile to continue shopping!');
        }
        else if(!userCart.length) {
            setError('No item(s) in cart!');
        }
        else {
            pay.open();
            setError('');
        }
    }

    return (
        <div className='cart-page-container'>
            <div className="cart-container">
                <div className="cart-container-header">
                    <h1>Shopping Cart</h1>

                    {userCart.length !== 0 && <Button 
                        buttonText='Deselect all items' 
                        buttonType='simple' 
                        onClick={clearCart} 
                    />}
                </div>

                {userCart.map((item) => {
                    return (
                        <CartItem 
                            key={item.id} 
                            item={item} 
                            id={item.id} 
                        />
                    )
                })}

                <div className="cart-subtotal">
                    <h2>Subtotal &#40;{userCart.reduce((prev, curr) => prev + Number(curr.quantity), 0)} item{userCart.length > 1 ? 's' : ''}&#41;: <span>${total_localised}</span></h2>
                </div>
            </div>

            <div className="subtotal-container">
                <div className="subtotal-info">
                    <h2>Subtotal &#40;{userCart.reduce((prev, curr) => prev + Number(curr.quantity), 0)} item{userCart.length > 1 ? 's' : ''}&#41;: <span>${total_localised}</span></h2>

                    <Button 
                        buttonText='Proceed to buy' 
                        type='button' 
                        onClick={buyProducts} 
                    />
                </div>

                {error && <div className="warning">
                    <h1>{error}</h1>
                </div>}

                {currentUser && 
                    <div className="card-details">
                        <div className="card-number">
                            <h1>Card Number</h1>
                            <div className='number'>
                                <span>4111</span>
                                <span>1111</span>
                                <span>1111</span>
                                <span>1111</span>
                            </div>
                        </div>

                        <div className="card-secret">
                            <div className="expiry">
                                <h2>Expiry Date</h2>
                                <span>12/29</span>
                            </div>
                            
                            <div className="cvv">
                                <h2>CVV</h2>
                                <span>433</span>
                            </div>

                            <div className="otp">
                                <h2>OTP</h2>
                                <span>*Enter any OTP when asked</span>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default Cart;
