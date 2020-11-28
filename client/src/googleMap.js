import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import './App.css';

  const GoogleMap = () =>{

  const [events, setEvents] = useState([])

  const getEvents = async () => {
    const res = await axios.get("/api/events")
    setEvents(res.data)
  }
  const defaultProps = {
    center: {
      lat: 37.7749,
      lng: -122.4194
    },
    zoom: 11
  }

  useEffect(() => { getEvents() }, [])

    const Marker = ({thisEventName}) => {
      return(
      <div className="container2">
      <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" style={{ height: '50px', width: "50px"}} alt="marker"/>
      <div className="overlay">{thisEventName}</div>
      </div>
      )
    }
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '500px', width: '100%',marginBottom:"50px"}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:"AIzaSyDGYlDVAd8hRSEoIhWZEkaWJDzxKZfHuq4" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
              {events.map(p => (
              <Marker
                thisEventName={p.eventName}
                lat={p.longitude}
                lng={p.latitude}
                />
              ))}

        </GoogleMapReact>
      </div>
    )
  }


export default GoogleMap;