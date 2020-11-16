import React from "react"
import './App.css';

const AppUsers = ({ userName, email, userType,imgUrl }) =>
    (
            <div className="item">
                <img src={imgUrl} alt="Girl in a jacket"/>
                <p>{userName}</p>
                <p>{email}</p>
                <p>{userType}</p>
            </div>

    )
export default AppUsers;
