import React from "react";
import { Route, Routes } from 'react-router-dom';

import { Contact, Error, Root, SharedLayout, SignIn } from './constants/index';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Root />} />

                <Route path='contact' element={<Contact />} />

                <Route path='signin' element={<SignIn />} />

                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
