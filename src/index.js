import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/user-context';
import { CartContextProvider } from './context/cart-context';
import { ShopContextProvider } from './context/shop-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <UserContextProvider>
                <ShopContextProvider>
                    <CartContextProvider>
                        <App />
                    </CartContextProvider>
                </ShopContextProvider>
            </UserContextProvider>
        </Router>
    </React.StrictMode>
);
