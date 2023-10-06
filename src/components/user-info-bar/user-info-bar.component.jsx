import React from 'react';
import './user-info-bar.style.scss';

function UserInfoBar({ user }) {
    return (
        <div className='user-info-bar'>
            <div className="user-image-container">
                <img src={user.photoURL} alt={user.displayName} />
            </div>

            <div className="user-details">
                <h1>{user.displayName} <span>&#40;{user.email}&#41;</span></h1>
                <h2>Address: <span>{user.address}</span></h2>
                <h2>Phone: <span>{user.phoneNumber}</span></h2>
            </div>

            <div className="orders-div">
                <h1>Orders: <span>{user.orders?.length}</span></h1>
            </div>
        </div>
    )
}

export default UserInfoBar;
