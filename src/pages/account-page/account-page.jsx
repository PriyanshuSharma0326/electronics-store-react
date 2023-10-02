import React, { useContext } from 'react';
import './account-page.style.scss';
import { useNavigate } from 'react-router-dom';
import { signOutUser } from '../../lib/utils/firebase.utils';
import { UserContext } from '../../context/user-context';
import { Button } from '../../constants/index';

function AccountPage() {
    const navigate = useNavigate();

    const { currentUser, userList } = useContext(UserContext);

    const currentUserInfo = userList?.find(user => user.uid === currentUser.uid)

    const signOutHandler = async () => {
        await signOutUser();
        navigate('/accounts');
    }

    const goToDashboard = () => {
        navigate('/dashboard');
    }

    return (
        <div className='account-page-container'>
            <div className="account-container">
                <div className="account">
                    <div className="profile-image-container">
                        <img src={currentUserInfo?.photoURL} alt="" />
                    </div>

                    <h1 className='user-name'>
                        {currentUserInfo?.displayName}
                    </h1>
                </div>

                <div className="account-details">
                    <div className="detail-container">
                        <h1>Contact</h1>

                        <ul>
                            <li>
                                <h2>Phone</h2>
                                <p>{currentUserInfo?.phoneNumber}</p>
                            </li>
                            <li>
                                <h2>Email</h2>
                                <p>{currentUserInfo?.email}</p>
                            </li>
                            <li>
                                <h2>Address</h2>
                                <p>{currentUserInfo?.address}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="buttons-container">
                    {currentUserInfo?.admin && <Button 
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
        </div>
    )
}

export default AccountPage;
