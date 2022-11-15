import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Signin from '../components/login/Signin';
import Signup from '../components/login/Signup';
import Dashboard from '../components/dashboard/Dashboard';
import Home from '../components/home/Home';
import Category from '../components/category/Category';
import ListProduct from '../components/list/ListProduct';
import Checkout from '../components/checkout/Checkout';

import Admin from '../components/admin/Admin';
import Products from '../components/admin/Products';
import Users from '../components/admin/Users';

const MyRoutes = () => {
    const oauth = useSelector(state => state.oauth);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}>
                    <Route index element={!oauth.user || oauth.user.email !== 'john@gmail.com' ? <Navigate to="/home" /> : <Navigate to="/admin" /> } />
                    <Route path="/signin" element={
                        !oauth.user ? <Signin /> : oauth.user.email === 'john@gmail.com' ? <Navigate to="/admin" /> : <Navigate to="/home" />
                    } />
                    <Route path="/signup" element={
                        !oauth.user ? <Signup /> : oauth.user.email === 'john@gmail.com' ? <Navigate to="/admin" /> : <Navigate to="/home" />
                    } />
                    <Route path="/home" element={!oauth.user || oauth.user.email !== 'john@gmail.com' ? <Home /> : <Navigate to="/admin" /> } />
                    <Route path="/category/:category" element={<Category />} />
                    <Route path="/search/:search" element={<ListProduct />} />
                </Route>
                <Route path='/checkout' element={ !oauth.user ? <Navigate to="/signin" /> : <Checkout />}/>
                <Route path='/admin/' element={!oauth.user ? <Navigate to="/signin" /> : <Admin />}>
                    <Route index element={<Navigate to="/admin/products" />} />
                    <Route path="products" element={<Products />} />
                    <Route path="users" element={<Users />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;