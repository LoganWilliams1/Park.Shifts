import React, {useEffect, useState} from 'react';
import httpClient from "../httpClient";
import ScheduleSpreadsheet from "../ScheduleSpreadsheet/ScheduleSpreadsheet";


const ManagerDashboardPage = () => {


    const[newUser, setNewUser] = useState("");
    const[grid, updateGrid] = useState([[]]);
    const addUser = async () => {
        try {
            await httpClient.post("//localhost:5000/add-user", {newUser})
        } catch (error) {
            alert("Error: Add User Failed")
        }
    }





    return (
        <div className="managerDash">
            <ScheduleSpreadsheet />
            <div className="sideBarContainer">
                <button>Export</button>
                <form>
                    <label>Add New User Email: </label>
                    <input
                        type="text"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                        id=""
                    />
                    <button type="button" onClick={() => addUser()}>Add User</button>
                </form>
            </div>
        </div>



    )


}

export default ManagerDashboardPage;