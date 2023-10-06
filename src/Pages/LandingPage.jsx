import React, {useEffect, useState} from "react";
import httpClient from "../httpClient";
import {Link} from "react-router-dom";

const LandingPage = () => {
    const [user, setUser] = useState(null);

    const logoutUser = async () => {
        await httpClient.post("//localhost:5000/logout");
        window.location.href = "/";
    };

    useEffect(() => {
        (async () => {
            try {
                const resp = await httpClient.get("//localhost:5000/");
                setUser(resp.data);
            } catch (error) {

            }
        })();
    }, []);

    return (
        <div>
            <h1>ParkShifts</h1>
            {user != null ? (
                <div>
                    <h2>Logged in</h2>
                    <h3>Email: {user.email}</h3>
                    <button onClick={logoutUser}>Logout</button>
                </div>

            ) : (
                <div>
                    <p>You are not logged in</p>
                    <div>

                        <Link to="/login">Login</Link>

                        <Link to="/register">Register</Link>

                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;