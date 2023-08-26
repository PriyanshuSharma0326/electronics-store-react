import CategoryItem from '../components/category-item/category-item.component';
import Directory from '../components/directory/directory.component';
import Navbar from '../components/navbar/navbar.component';
import SignIn from '../components/signin/signin.component';
import SignUp from '../components/signup/signup.component';
import ProductCard from '../components/product-card/product-card.component';

import categories from './categories';
import productsList from './products-list';

import Contact from '../routes/contact/contact.route';
import Error from '../routes/error/error.route';
import Root from '../routes/root/root.route';
import SharedLayout from '../routes/shared-layout/shared-layout';
import AuthPage from '../routes/auth/authentication.route';
import Account from '../routes/account/account.route';
import Shop from '../routes/shop/shop.route';

export {
    CategoryItem,
    Directory,
    Navbar,
    SignIn,
    SignUp,
    ProductCard,

    categories,
    productsList,

    Contact,
    Error,
    Root,
    SharedLayout,
    AuthPage,
    Account,
    Shop,
};
