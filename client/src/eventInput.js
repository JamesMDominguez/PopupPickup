import React from "react"
import './App.css';

const eventInput = ({ longitude, latitude,eventName }) =>
    (
            <div className="item">
                <p>Event Name:{eventName}</p>
                <p>longitude:{longitude}</p>
                <p>latitude:{latitude}</p>            
            </div>

    )
export default eventInput;



