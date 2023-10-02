import React from 'react';
import './user-info-bar.style.scss';
import { faBucket } from '@fortawesome/free-solid-svg-icons';
import Button from '../button/button.component';

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

            <Button 
                buttonType='icon' 
                icon={faBucket} 
            />
        </div>
    )
}

export default UserInfoBar;
