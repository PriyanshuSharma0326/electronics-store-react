import React from "react";
import { Route, Routes } from 'react-router-dom';
import { 
    Account,
    AuthPage,
    Contact,
    Error,
    Root,
    SharedLayout,
    Shop,
    SignIn,
    SignUp
} from './constants/index';

function App() {
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Root />} />

                <Route path='shop' element={<Shop />} />

                <Route path='contact' element={<Contact />} />

                <Route path='accounts' element={<AuthPage />}>
                    <Route index element={<SignIn />} />

                    <Route path='login' element={<SignIn />} />

                    <Route path='register' element={<SignUp />} />
                </Route>

                <Route path='account' element={<Account />} />

                <Route path='cart' element={<></>} />

                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
