import React, {useState} from "react";
import httpClient from "../httpClient";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    const registerUser = async () => {
        try {
            const resp = await httpClient.post("//localhost:5000/register", {
                email,
                password,
                firstName,
                lastName
            });

            navigate("/login")



        } catch (error) {
            if (error.response.status === 401) {
                alert("Invalid credentials");
            }
        }
    };

    return (
        <div>
            <h1>Create an account</h1>
            <form>
                <div>
                    <label>First Name: </label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        id=""
                    />
                </div>
                <div>
                    <label>Last Name: </label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        id=""
                    />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id=""
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id=""
                    />
                </div>
                <button type="button" onClick={() => registerUser()}>Submit</button>
            </form>
        </div>
    );
};

export default RegisterPage;