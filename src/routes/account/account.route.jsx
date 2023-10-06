import React from 'react'
import AccountPage from '../../pages/account-page/account-page';
import { Route, Routes } from 'react-router-dom';
import UpdateProfile from '../../pages/update-profile/update-profile';

function Account() {
    return (
        <Routes>
            <Route 
                index 
                element={
                    <AccountPage />
                }
            />

            <Route 
                path='update' 
                element={<UpdateProfile />} 
            />
        </Routes>
    )
}

export default Account;
