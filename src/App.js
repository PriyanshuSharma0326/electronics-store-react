import React from "react";
import { Route, Routes } from 'react-router-dom';

import { AuthPage, Contact, Error, Root, SharedLayout, SignIn, SignUp } from './constants/index';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Root />} />

                <Route path='contact' element={<Contact />} />

                <Route path='accounts' element={<AuthPage />}>
                    <Route index element={<SignIn />} />

                    <Route path='login' element={<SignIn />} />

                    <Route path='register' element={<SignUp />} />
                </Route>

                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
