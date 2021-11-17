import Home from '../components/frontend/Home';
import About from '../components/frontend/About';
import Contact from '../components/frontend/Contact';

import ViewCategory from '../components/frontend/collections/ViewCategory';
import ViewProduct from '../components/frontend/collections/ViewProduct';
import ProductDetail from '../components/frontend/collections/ProductDetail';

import Cart from '../components/frontend/cart/Cart';
import Checkout from '../components/frontend/Checkout';



import Page403 from '../errors/Page403';
import Page404 from '../errors/Page404';
import Login from '../components/frontend/auth/Login';
import Register from '../components/frontend/auth/Register';








const publicRouteList = [

    { path: '/', exact: true, name: 'Home', component: Home},
    { path: '/about', exact: true, name: 'About', component: About},
    { path: '/contact', exact: true, name: 'Contact', component: Contact},
    { path: '/contact', exact: true, name: 'Contact', component: Contact},
    { path: '/collections', exact: true, name: 'ViewCategory', component: ViewCategory},
    { path: '/collections/:slug', exact: true, name: 'ViewProduct', component: ViewProduct},
    { path: '/collections/:category/:product', exact: true, name: 'ProductDetail', component: ProductDetail},
    { path: '/cart', exact: true, name: 'Cart', component: Cart},
    { path: '/checkout', exact: true, name: 'Checkout', component: Checkout},
    { path: '/register', exact: true, name: 'Register', component: Register},
    { path: '/login', exact: true, name: 'Login', component: Login},
    { path: '/403', exact: true, name: 'Page403', component: Page403},
    { path: '/404', exact: true, name: 'Page404', component: Page404},
   

];



export default publicRouteList;