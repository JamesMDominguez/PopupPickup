import React from "react"
import './App.css';

const AppUsers = ({ userName, userType }) =>
    (
            <div className="item">
                <p>{userName}</p>
                <p>{userType}</p>
            </div>

    )
export default AppUsers;
