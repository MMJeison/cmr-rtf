import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../components/login/Login';
import Dashboard from '../components/dashboard/Dashboard';
import Home from '../components/home/Home';
import Category from '../components/category/Category';
import ListProduct from '../components/list/ListProduct';
import Checkout from '../components/checkout/Checkout';
const MyRoutes = () => {
    const oauth = useSelector(state => state.oauth);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Dashboard />}>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="/signin" element={
                        !oauth.user ? <Login /> : <Navigate to="/home" />
                    } />
                    <Route path="/home" element={<Home />} />
                    <Route path="/category/:category" element={<Category />} />
                    <Route path="/search/:search" element={<ListProduct />} />
                </Route>
                <Route path='/checkout' element={ !oauth.user ? <Navigate to="/signin" /> : <Checkout />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;