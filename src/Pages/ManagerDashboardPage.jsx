import React, {useEffect, useState} from 'react';
import httpClient from "../httpClient";

const ManagerDashboardPage = () => {

    const[availability, setAvailability] = useState(null)
    const[newUser, setNewUser] = useState("")

    const getAvailability = async () => {
        try {
            const response = await httpClient.get("//localhost:5000/get-availability");
            setAvailability(response.data)
        } catch (error) {
            alert("Error: Retrieval Failed")
        }

    }

    useEffect(() => {
        console.log(availability)
    }, [availability]);

    const addUser = async () => {
        try {
            await httpClient.post("//localhost:5000/add-user", {newUser})
        } catch (error) {
            alert("Error: Add User Failed")
        }
    }

    return (
        <div>
            <form>
                <label>Enter Email: </label>
                <input
                    type="text"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                    id=""
                />
                <button type="button" onClick={() => addUser()}>Add User</button>
            </form>
            <div>
                <button type="button" onClick={() => getAvailability()}>Get Availability</button>
            </div>

        </div>



    )


}

export default ManagerDashboardPage