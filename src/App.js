import React, { useContext } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
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
import { UserContext } from "./context/user-context";
import Cart from "./routes/cart/cart.component";

function App() {
    const { currentUser } = useContext(UserContext);

    const ProtectedRouteNoLogin = ({ children }) => {
        if(!currentUser) {
            return <Navigate to="/accounts/login" />;
        }
    
        return children;
    };

    const ProtectedRouteOnLogin = ({ children }) => {
        if(currentUser) {
            return <Navigate to="/account" />;
        }
    
        return children;
    };
    
    return (
        <Routes>
            <Route path='/' element={<SharedLayout />}>
                <Route index element={<Root />} />

                <Route path='shop' element={<Shop />} />

                <Route path='contact' element={<Contact />} />

                <Route path='accounts' element={
                    <ProtectedRouteOnLogin>
                        <AuthPage />
                    </ProtectedRouteOnLogin>
                }>
                    <Route index element={<SignIn />} />

                    <Route path='login' element={<SignIn />} />

                    <Route path='register' element={<SignUp />} />
                </Route>

                <Route path='account' element={
                    <ProtectedRouteNoLogin>
                        <Account />
                    </ProtectedRouteNoLogin>
                } />

                <Route path='cart' element={<Cart />} />

                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
