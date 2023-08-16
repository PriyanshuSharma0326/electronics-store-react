import React from "react";
import { Route, Routes } from 'react-router-dom';

import { AuthPage, Contact, Error, Root, SharedLayout } from './constants/index';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Root />} />

                <Route path='contact' element={<Contact />} />

                <Route path='accounts/auth' element={<AuthPage />} />

                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
