import CategoryItem from '../components/category-item/category-item.component';
import Directory from '../components/directory/directory.component';
import Navbar from '../components/navbar/navbar.component';
import SignIn from '../components/signin/signin.component';

import categories from './categories';

import Contact from '../routes/contact/contact.route';
import Error from '../routes/error/error.route';
import Root from '../routes/root/root.route';
import SharedLayout from '../routes/shared-layout/shared-layout';
import AuthPage from '../routes/sign-in/authentication.route';

import { auth, signInMethod } from '../lib/config/firebase';

export {
    CategoryItem,
    Directory,
    Navbar,
    SignIn,

    categories,

    Contact,
    Error,
    Root,
    SharedLayout,
    AuthPage,

    auth,
    signInMethod,
};
