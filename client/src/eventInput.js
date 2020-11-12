import React from "react"
import './App.css';

const eventInput = ({ eventName,city }) =>
    (
            <div className="item">
                <p>Event Name:{eventName}</p>
                <p>City Name:{city}</p>           
            </div>

    )
export default eventInput;



