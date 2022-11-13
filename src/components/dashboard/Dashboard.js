import { Outlet } from "react-router-dom";

import Navbar from "../navbar/Navbar";

import './DashboardStyles.scss';

const Dashboard = () => {

    return (
        <div className="dashboard">
            <div className="navbar">
                <Navbar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;