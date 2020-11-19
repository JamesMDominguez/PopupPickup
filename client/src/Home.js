import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import GoogleMap from "./googleMap";
import axios from "axios";
import EventInput from "./eventInput"



const Home = () => {
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    const res = await axios.get("/api/events/jsm")
    setEvents(res.data)
    console.log(events)
  }

  useEffect(() => { getEvents() }, [])

    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Welcome to Popup Pickup</h1>
        <img className="centerIMG" src="https://upriseup.co.uk/wp-content/uploads/2018/03/Shopping-Header.jpg"  width="100%" />
        <GoogleMap/>
        <br/>
        <div className="container">
        {events.map(p => (
          <EventInput
            key={p.eventName}
            eventName={p.eventName}
            city={p.city}
          />
        ))}
      </div>
      </div>
    )
  }

export default Home;
