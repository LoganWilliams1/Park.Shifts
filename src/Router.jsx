import {BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard"
import LoginPage from "./Pages/LoginPage";



const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact component={Dashboard}/>
                <Route path="/" exact component={LoginPage}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router