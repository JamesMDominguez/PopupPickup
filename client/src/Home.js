import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import GoogleMap from "./googleMap";
import axios from "axios";



const Home = () => {
  const [events, setEvents] = useState([])

  const getEvents = async () => {
    const res = await axios.get("/api/events/jsm")
    setEvents(res.data)
    console.log(events)
  }

  const EventInput = ({ eventName,city }) =>
  (
          <div className="item">
              <p>{eventName}</p>
          </div>

  )

  useEffect(() => { getEvents() }, [])

    return (
      <div>        
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
