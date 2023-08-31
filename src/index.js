import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';

import { BrowserRouter as Router } from 'react-router-dom';
import { UserContextProvider } from './context/user-context';
// import { ProductsContextProvider } from './context/products-context';
import { CartContextProvider } from './context/cart-context';
import { CategoriesContextProvider } from './context/categories-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <UserContextProvider>
                <CategoriesContextProvider>
                    <CartContextProvider>
                        <App />
                    </CartContextProvider>
                </CategoriesContextProvider>
            </UserContextProvider>
        </Router>
    </React.StrictMode>
);
