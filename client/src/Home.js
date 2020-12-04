import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import GoogleMap from "./googleMap";
import axios from "axios";
import { useAuthState } from './AuthProvider'

const defaultValuesCart = {
  cartName: '',
  cartPrice: 0,
  cartUser: ''
}

const Home = () => {
  const [events, setEvents] = useState([])
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [eventVendors, setEventVendors] = useState([])

  const [currentEvent, setCurrentEvent] = useState('')
  const [currentVendor, setCurrentVendor] = useState('')

  const [overlayDisplay, setOverlayDisplay] = useState("none")
  const [overlayContent, setOverlayContent] = useState("none")

  const [inputsCart, setInputsCart] = useState(defaultValuesCart)
  const { user } = useAuthState()


  const getCart = async () => {
    const res = await axios.get("/api/cart")
    setCart(res.data)
  }

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

  const handleDelete = async (cartId) => {
    const res = await axios.delete(`/api/cart/${cartId}`)
    setCart(res.data)
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
    setCart(res.data)
    setInputsCart(defaultValuesCart)
  }

  useEffect(() => { getEvents() }, [])
  useEffect(() => { getEventVendors() }, [])
  useEffect(() => { getProducts() }, [])
  useEffect(() => { getCart() }, [])

  return (
    <div>
      <GoogleMap />

      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%" }}>
        <h2 style={{ color: "black", textAlign: "left", paddingLeft: "5%" }}>Events in the Area</h2>
        <div className="container">
          {events.map(p => {
            return (
              <EventInput
                key={p._id}
                eventName={p.eventName}
              />
            )
          })}
        </div>
      </div>

      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%" }}>
        <h2 style={{ color: "black", textAlign: "left", paddingLeft: "5%" }}>{currentEvent} Vendors</h2>
        <div className="container">
          {eventVendors.map(p => {
            if (currentEvent === p.eventName) {
              return (
                <EventInput2
                  key={p._id}
                  vendor={p.vendorName}
                />
              )
            }
          })}
        </div>
      </div>

      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%" }}>

        <h2 style={{ color: "black", textAlign: "left", paddingLeft: "5%" }}>{currentVendor} Products</h2>

        <div className="container">
          {products.map(p => {
            if (currentVendor === p.vendor) {
              return (
                <div className="item" key={p.name} onClick={() => {
                  setOverlayDisplay("block")
                  setOverlayContent(p.name + " $" + p.price)
                  setInputsCart({ ...inputsCart, cartName: p.name, cartPrice: p.price, cartUser: user ? user.username : " " })
                }}>
                  <p>{p.name + " $" + p.price}</p>
                  <div id="overlay2" onClick={(event) => {
                    event.stopPropagation()
                    setOverlayDisplay("none")
                  }}
                    style={{ display: overlayDisplay }}>
                    <div id="text">
                      <p>{overlayContent}</p>
                      <div
                        style={{
                          width: "100%",
                          borderRadius: "10px",
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
      </div>

      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%" }}>
        <h2 style={{ color: "black", textAlign: "left", paddingLeft: "5%" }}>Cart</h2>
        <div className="container">
          {cart.map((p) => {
            if (p.cartUser === (user ? user.username : " ")) {
              return (
                <div className="item" key={p._id}>
                  <div onClick={(myEvent) => {
                    myEvent.stopPropagation()
                    const shouldDelete = window.confirm('delete event')
                    if (shouldDelete) {
                      handleDelete(p._id)
                    }
                  }} style={{ cursor: 'pointer', fontSize: "20px", float: "left" }}>
                    x
                  </div>
                  <p>{p.cartName}</p>
                </div>
              )
            }
          }
          )}
        </div>
      </div>

    </div>
  )
}

export default Home;
