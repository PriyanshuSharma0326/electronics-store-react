import React, { useContext } from "react";
import { Navigate, Route, Routes } from 'react-router-dom';
import { 
    Account,
    AuthPage,
    Error,
    Root,
    SharedLayout,
    Shop,
    SignIn,
    SignUp,
    Cart
} from './constants/index';

import { UserContext } from "./context/user-context";
import DashboardRoute from './routes/dashboard/dashboard.route';
import ProductsRoute from "./routes/products/products.route";

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

                <Route path='shop/*' element={<Shop />} />

                <Route path='products/*' element={<ProductsRoute />} />

                <Route path='accounts' element={
                    <ProtectedRouteOnLogin>
                        <AuthPage />
                    </ProtectedRouteOnLogin>
                }>
                    <Route index element={<SignIn />} />

                    <Route path='login' element={<SignIn />} />

                    <Route path='register' element={<SignUp />} />
                </Route>

                <Route path='account/*' element={
                    <ProtectedRouteNoLogin>
                        <Account />
                    </ProtectedRouteNoLogin>
                } />

                <Route path='dashboard/*' element={<DashboardRoute />} />

                <Route path='cart' element={<Cart />} />

                <Route path='*' element={<Error />} />
            </Route>
        </Routes>
    );
}

export default App;
