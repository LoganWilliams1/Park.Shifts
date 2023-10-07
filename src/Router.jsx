import React from "react";
import {BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./Pages/LoginPage";
import LandingPage from "./Pages/LandingPage";
import RegisterPage from "./Pages/RegisterPage";
import {DashboardPage} from "./Pages/DashboardPage";
import RegisterTeamPage from "./Pages/RegisterTeamPage";


function ManagerDashboardPage() {
    return null;
}

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}/>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/register-team" element={<RegisterTeamPage />}/>
                <Route path="/dashboard" element={<DashboardPage />}/>
                <Route path="/manager-dashboard" element={<ManagerDashboardPage />}/>


            </Routes>
        </BrowserRouter>
    );
};

export default Router;