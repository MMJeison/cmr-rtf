import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from '../components/login/Login';
import Dashboard from '../components/dashboard/Dashboard';
import Home from '../components/home/Home';

const MyRoutes = () => {
    const oauth = useSelector(state => state.oauth);
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={
                    !oauth.user ? <Login /> : <Navigate to="/home" />
                } />
                <Route path="/" element={<Dashboard />}>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default MyRoutes;