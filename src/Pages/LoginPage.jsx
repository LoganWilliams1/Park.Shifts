import React, {useState} from "react";
import httpClient from "../httpClient";
import {useNavigate} from "react-router-dom";

const LoginPage= () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const logInUser = async () => {

        try {
            const response = await httpClient.post("//localhost:5000/login", {
                email,
                password,

            });

            if (response.data === "user") {
                navigate("/dashboard")
            }

            if (response.data === "manager") {
                navigate("/manager-dashboard")
            }


        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        }



    };

    return (
        <div>
            <h1>Log In</h1>
            <form>
                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="button" onClick={() => logInUser()}>Submit</button>
            </form>
        </div>
    );
};

export default LoginPage;