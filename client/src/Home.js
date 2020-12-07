import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import GoogleMap from "./googleMap";
import axios from "axios";
import { useAuthState } from './AuthProvider'

const defaultValuesCart = {
  cartName: '',
  cartPrice: 0,
  cartUser: '',
  status: ''
}


const Home = () => {
  const [events, setEvents] = useState([])
  const [products, setProducts] = useState([])
  const [eventVendors, setEventVendors] = useState([])

  const [currentEvent, setCurrentEvent] = useState('')
  const [currentVendor, setCurrentVendor] = useState('')

  const [overlayDisplay, setOverlayDisplay] = useState("none")
  const [overlayContent, setOverlayContent] = useState("none")

  const [cart, setCart] = useState([])
  const [inputsCart, setInputsCart] = useState(defaultValuesCart)

  const { user } = useAuthState()


  const handleDelete = async (cartId) => {
    const res = await axios.delete(`/api/cart/${cartId}`)
    setCart(res.data)
  }
  const editCart = async (p) => {
    const res = await axios.put(`/api/cart/${p._id}`, { status: "pending...", cartUser: p.cartUser, cartPrice: p.cartPrice, cartName: p.cartName })
    setCart(res.data)
  }
  const addToCart = async (event) => { //handle submit
    const res = await axios.post("/api/cart", inputsCart)
    setInputsCart(defaultValuesCart)
    setCart(res.data)
  }
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
              <div className="item" key={p._id} onClick={() => {
                setCurrentEvent(p.eventName)
                setCurrentVendor('')
              }}>
                <p>{p.eventName}</p>
              </div>
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
                <div className="item" key={p._id} onClick={() => { setCurrentVendor(p.vendorName) }}>
                  <p>{p.vendorName}</p>
                </div>
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
                  <img style={{ width: "80%", borderRadius: "25px", paddingTop: "10px" }} src={p.url} alt="Untitled-Artwork" border="0" />
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
            if ((p.cartUser === (user ? user.username : " ")) && (p.status === "")) {
              return(
                <div className="item" key={p._id}>
                  <div onClick={() => {
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
          )
          }
        </div>
        <div className="item" style={{ backgroundColor: "#AC3C40" }}
        onClick={(event) => {
          const shouldAdd = window.confirm('Confirm Order')
          cart.forEach((p) => {
            if (user && shouldAdd && (p.cartUser === user.username)&& (p.status === "")) {
              editCart(p)
            }
          })
        }}>CheckOut</div>
      </div>



      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%" }}>
        <h2 style={{ color: "black", textAlign: "left", paddingLeft: "5%" }}>Order Status</h2>
        <div className="container">
          {
            cart.map((p) => {
              if ((p.cartUser === (user ? user.username : " ")) && (p.status === "pending...")) {
                return (
                  <div className="item" key={p._id}>
                    <p>{p.cartName}</p>
                    <p style={{ backgroundColor: "Orange", borderRadius: "25px" }}>{p.status}</p>

                  </div>
                )
              }
              else if ((p.cartUser === (user ? user.username : " ")) && (p.status === "Accepted")) {
                return (
                  <div className="item" key={p._id}>
                    <p>{p.cartName}</p>
                    <p style={{ backgroundColor: "Green", borderRadius: "25px" }}>{p.status}</p>

                  </div>
                )
              }
              else if ((p.cartUser === (user ? user.username : " ")) && (p.status === "Denied")) {
                return (
                  <div className="item" key={p._id}>
                    <p>{p.cartName}</p>
                    <p style={{ backgroundColor: "#AC3C40", borderRadius: "25px" }}>{p.status}</p>

                  </div>
                )
              }
            }
            )
          }
        </div>
      </div>



    </div>
  )
}

export default Home;
