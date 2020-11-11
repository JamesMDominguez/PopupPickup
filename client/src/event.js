import React, { useEffect, useState } from "react"
import EventInput from "./eventInput"
import './App.css';
import axios from "axios";

const defaultValues = {
    eventName: "",
    longitude:"",
    latitude:""
}

const Event = () => {
    const [events, setEvents] = useState([])
    const [inputs, setInputs] = useState(defaultValues)

    const getEvents = async () => {
        const res = await axios.get("/api/events/jsm")
        setEvents(res.data)
    }

    const handleSubmit = async (event) => {
        event.stopPropagation()
        event.preventDefault()

        const res = await axios.post("/api/events/jsm", inputs)
        setEvents(res.data)
        setInputs(defaultValues)
    }

    useEffect(() => { getEvents() }, [])

    return (
        <div>
            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Vendor Inventory</h1>

            <div className="container">
                {events.map(p => (
                    <EventInput
                    eventName={p.eventName}
                    longitude={p.longitude}
                    latitude={p.latitude}
                    />
                ))}
            </div>
            <div style={{ paddingLeft: "30%" }}>
                <form //login
                    onSubmit={handleSubmit}
                    className="w3-theme-d3 w3-container"
                    style={{ width: "60%", padding: "25px", borderRadius: "25px" }}>


                    <input
                        type="text"
                        placeholder="EventName"
                        value={inputs.eventName}
                        onChange={e => setInputs({ ...inputs, eventName: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="text"
                        placeholder="longitude"
                        value={inputs.longitude}
                        onChange={e => setInputs({ ...inputs, longitude: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="text"
                        placeholder="latitude"
                        value={inputs.latitude}
                        onChange={e => setInputs({ ...inputs, latitude: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />


                    <input
                        type="submit"
                        value="Submit"
                        className="w3-theme-d1 w3-btn"
                        style={{ borderRadius: "25px", width: "100%" }}
                    />
                </form>
            </div>

        </div>
    )
}


export default Event;
