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
  const [selectedVendors, setSelectedVendor] = useState([])
  const [currentVendor, setCurrentVendor] = useState('')
  const [overlayDisplay, setOverlayDisplay] = useState("none")
  const [overlayContent, setOverlayContent] = useState("none")


  const [inputsCart, setInputsCart] = useState(defaultValuesCart)
  const [cart, setCart] = useState([])

  const { user } = useAuthState() //login data



  const getEvents = async () => {
    const res = await axios.get("/api/events")
    setEvents(res.data)
  }

  const getProducts = async () => {
    const res = await axios.get("/api/products")
    setProducts(res.data)
  }

  const getCart = async () => {
    const res = await axios.get("/api/cart")
    setCart(res.data)
  }


  const EventInput = ({ eventName, vendor }) =>
    (
      <div className="item" onClick={() => {
        setSelectedVendor(vendor)
        setCurrentVendor(vendor)
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
  useEffect(() => { getProducts() }, [])
  useEffect(() => { getCart() }, [])

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
        {selectedVendors.map(p =>
          <EventInput2
            vendor={p}
          />)
        }
      </div>

      <h2 style={{ marginLeft: "5%" }}>Vendor Products</h2>

      <div className="container">
        {products.map(p => {
          if (currentVendor == p.vendor) {
            return (
              <div className="item" onClick={() => {
                setOverlayDisplay("block")
                setOverlayContent(p.name+" $"+p.price)
                setInputsCart({ ...inputsCart, cartName: p.name, cartPrice: p.price, cartUser: user.username })
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


      <div className="item" style={{backgroundColor:"rgba(0,0,50,0.2)", margin:"10%"}}>
      <h2 style={{ color:"black",textAlign:"left",paddingLeft:"5%"}}>Cart</h2>
      <div className="container">
        {cart.map(p => {
          if (p.cartUser == user.username) {
            return (
              <div className="item">
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
