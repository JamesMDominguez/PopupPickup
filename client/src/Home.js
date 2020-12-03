import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import GoogleMap from "./googleMap";
import axios from "axios";
import { useAuthState } from './AuthProvider'
import Cart from './Cart'

const defaultValuesCart = {
  cartName: '',
  cartPrice: 0,
  cartUser: ''
}

const Home = () => {
  const [events, setEvents] = useState([])
  const [products, setProducts] = useState([])
  const [eventVendors, setEventVendors] = useState([])

  const [currentEvent,  setCurrentEvent] = useState('')
  const [currentVendor, setCurrentVendor] = useState('')

  const [overlayDisplay, setOverlayDisplay] = useState("none")
  const [overlayContent, setOverlayContent] = useState("none")

  const [inputsCart, setInputsCart] = useState(defaultValuesCart)
  const { user } = useAuthState()


  const getEvents = async () => {
    const res = await axios.get("/api/events")
    setEvents(res.data)
  }

  const getProducts = async () => {
    const res = await axios.get("/api/products")
    setProducts(res.data)
  }

  const getEventVendors = async () => {
    const res = await axios.get("/api/eventsVendor")
    setEventVendors(res.data)
  }


  const EventInput = ({ eventName }) =>
    (
      <div className="item" onClick={() => {
        setCurrentEvent(eventName)
        setCurrentVendor('')
      }}
      >
        <p>{eventName}</p>

      </div>
    )

  const EventInput2 = ({ vendor }) =>
    (
      <div className="item" onClick={() => {
        setCurrentVendor(vendor)
        console.log(currentVendor)
      }
      }>
        <p>{vendor}</p>
      </div>
    )

  const addToCart = async (event) => { //handle submit
    event.stopPropagation()
    event.preventDefault()
    const res = await axios.post("/api/cart", inputsCart)
    setInputsCart(defaultValuesCart)
  }

  useEffect(() => { getEvents() }, [])
  useEffect(() => { getEventVendors() }, [])
  useEffect(() => { getProducts() }, [])

  return (
    <div>
      <GoogleMap />
      <br />
      <h2 style={{ marginLeft: "5%" }}>Events</h2>
      <div className="container">
        {events.map(p =>{ 
          return(
          <EventInput
            key={p._id}
            eventName={p.eventName}
          />
        )})}
      </div>

      <h2 style={{ marginLeft: "5%" }}>Vendors at Event</h2>


      <div className="container">
        {eventVendors.map(p => {
          if(currentEvent === p.eventName){
          return(
          <EventInput2
            key={p._id}
            vendor={p.vendorName}
        />
        )}})}
      </div>

      <h2 style={{ marginLeft: "5%" }}>Vendor Products</h2>

      <div className="container">
        {products.map(p => {
          if (currentVendor === p.vendor) {
            return (
              <div className="item"  key={p.name} onClick={() => {
                setOverlayDisplay("block")
                setOverlayContent(p.name+" $"+p.price)
                setInputsCart({ ...inputsCart, cartName: p.name, cartPrice: p.price, cartUser: user ? user.username:" "})
              }}>
                <p>{p.name+" $"+p.price}</p>
                <div id="overlay2" onClick={(event)=>{
                  event.stopPropagation()
                  setOverlayDisplay("none")
                }}
                 style={{display:overlayDisplay}}>
                  <div id="text">
                    <p>{overlayContent}</p>
                    <div
                      style={{
                        width: "100%",
                        borderRadius:"10px",
                        backgroundColor: "green"
                      }}
                      onClick={(event) => {
                        addToCart(event)
                      }}>+</div>
                  </div>
                </div>

              </div>
            )
          }
        })}
      </div>
      
      <Cart/>

    </div>
  )
}

export default Home;
