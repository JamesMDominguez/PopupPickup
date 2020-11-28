import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import GoogleMap from "./googleMap";
import axios from "axios";
import { render } from "react-dom";



const Home = () => {
  const [events, setEvents] = useState([])
  const [products, setProducts] = useState([])
  const [selectedVendor, setSelectedVendor] = useState([])
  const [currentVendor, setCurrentVendor]= useState('')

  const getEvents = async () => {
    const res = await axios.get("/api/events")
    setEvents(res.data)
  }

  const getProducts = async () => {
    const res = await axios.get("/api/products")
    setProducts(res.data)
  }

  const EventInput = ({ eventName, vendor }) =>
    (
      <div className="item" onClick={() => {
        setSelectedVendor(vendor) 
      }}
      >
        <p>{eventName}</p>

      </div>
    )

  const EventInput2 = ({ vendor }) =>
    (
      <div className="item" onClick={()=>{
      setCurrentVendor(vendor)
      console.log(currentVendor)}
      }>
        <p>{vendor}</p>
      </div>
    )
    const Item = ({ name}) =>
        (
            <div className="item">
              {}
            </div>
        )

  useEffect(() => { getEvents() }, [])
  useEffect(() => { getProducts() }, [])


  return (
    <div>
      <GoogleMap />
      <br />
      <h2 style={{ marginLeft: "5%" }}>Events</h2>
      <div className="container">
        {events.map(p => (
          <EventInput
            key={p.eventName}
            eventName={p.eventName}
            vendor={p.vendor}
          />
        ))}
      </div>

      <h2 style={{ marginLeft: "5%" }}>Vendors at Event</h2>


      <div className="container">
        {selectedVendor.map(p =>
          <EventInput2
            vendor={p}
          />)
        }
      </div>

      <h2 style={{ marginLeft: "5%" }}>Vendor Products</h2>

      <div className="container">
          {products.map(p=>{
            if(currentVendor==p.vendor){
              return(
                <div className="item">
            <p>{p.name}</p>
            </div>
              )
            }
          })}
      </div> 

    </div>
  )
}

export default Home;
