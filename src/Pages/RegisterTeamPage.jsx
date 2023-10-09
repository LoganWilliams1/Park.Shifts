import React, {useState} from "react";
import httpClient from "../httpClient";
import {useNavigate} from "react-router-dom";

const RegisterTeamPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [teamName, setTeamName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    const registerTeam = async () => {
        try {
            const resp = await httpClient.post("//localhost:5000/register-team", {
                email,
                password,
                teamName,
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
                    <label>Manager Email: </label>
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
                <div>
                    <label>Team Name: </label>
                    <input
                        type="text"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                        id=""
                    />
                </div>
                <button type="button" onClick={() => registerTeam()}>Submit</button>
            </form>
        </div>
    );
};

export default RegisterTeamPage;