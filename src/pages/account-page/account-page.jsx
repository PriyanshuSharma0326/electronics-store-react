import React, { useContext, useEffect, useState } from 'react';
import './account-page.style.scss';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import { Button } from '../../constants/index';
import OrderInfoBarAccountPage from '../../components/order-info-bar-account-page/order-info-bar-account-page';
import { ShopContext } from '../../context/shop-context';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

function AccountPage() {
    const navigate = useNavigate();

    const { userDoc, setUserDoc } = useContext(UserContext);

    const { orders } = useContext(ShopContext);

    const [userOrders, setUserOrders] = useState([]);

    useEffect(() => {
        const getUserOrders = () => {
            const filteredOrders = orders.filter(order => userDoc.orders?.includes(order.orderID));
            setUserOrders(filteredOrders);
        }

        userDoc && getUserOrders();
    }, [orders]);

    const signOutHandler = async () => {
        await signOutUser();
        setUserDoc({})
        navigate('/accounts');
    }

    const goToDashboard = () => {
        navigate('/dashboard');
    }

    const goToUpdateProfilePage =() => {
        navigate('/account/update');
    }

    return (
        <div className='account-page-container'>
            <div className="account-container">
                <div className="account">
                    <div className="profile-image-container">
                        <img src={userDoc?.photoURL} alt="" />
                    </div>

                    <h1 className='user-name'>
                        {userDoc?.displayName}
                    </h1>

                    <Button 
                        buttonText='Update Profile' 
                        buttonType='simple' 
                        onClick={goToUpdateProfilePage} 
                    />

                    <Button 
                        buttonType='icon' 
                        onClick={goToUpdateProfilePage} 
                        icon={faPencil} 
                    />
                </div>

                <div className="account-details">
                    <div className="detail-container">
                        <h1>Contact</h1>

                        <ul>
                            <li>
                                <h2>Phone</h2>
                                <p>{userDoc?.phoneNumber}</p>
                            </li>
                            <li>
                                <h2>Email</h2>
                                <p>{userDoc?.email}</p>
                            </li>
                            <li>
                                <h2>Address</h2>
                                <p>{userDoc?.address}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="buttons-container">
                    {userDoc?.admin && <Button 
                        type='button' 
                        buttonType='blue'
                        buttonText='Go to Dashboard' 
                        onClick={goToDashboard} 
                    />}
                    <Button 
                        type='button' 
                        buttonText='Sign Out' 
                        onClick={signOutHandler} 
                    />
                </div>
            </div>

            <div className="user-orders">
                {userOrders.length !== 0 && <h1>Orders</h1>}
                {userOrders?.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate)).map(order => {
                    return (
                        <OrderInfoBarAccountPage 
                            key={order.orderID} 
                            orderInfo={order} 
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default AccountPage;
