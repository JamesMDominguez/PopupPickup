import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import GoogleMapReact from 'google-map-react';
import axios from "axios";
import { useAuthState } from './AuthProvider'

const defaultValuesCart = {
  cartName: '',
  cartPrice: 0,
  cartUser: '',
  status: '',
  cartVendor:''
}
const defaultProps = {
  center: {
    lat: 37.7749,
    lng: -122.4194
  },
  zoom: 11
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
  let total = 0
  const { user } = useAuthState()

  const [eventDisplay, setEventDisplay] = useState("block")
  const [vendorDisplay, setVendorDisplay] = useState("none")
  const [productDisplay, setProductDisplay] = useState("none")



  const handleDelete = async (cartId) => {
    const res = await axios.delete(`/api/cart/${cartId}`)
    setCart(res.data)
  }
  const editCart = async (p) => {
    const res = await axios.put(`/api/cart/${p._id}`, { status: "pending...", cartUser: p.cartUser, cartPrice: p.cartPrice, cartName: p.cartName,cartVendor: p.cartVendor })
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
  const Marker = ({ thisEventName }) => {
    return (
      <div className="container2">
        <img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png" style={{ height: '50px', width: "50px" }} alt="marker" />
        <div className="overlay" 
            onClick={ ()=>{
              setCurrentEvent(thisEventName)
              setCurrentVendor('')
            }
           }
           >{thisEventName}</div>
      </div>
    )
  }

  useEffect(() => { getEvents() }, [])
  useEffect(() => { getEventVendors() }, [])
  useEffect(() => { getProducts() }, [])
  useEffect(() => { getCart() }, [])

  return (
    <div>      
      <div style={{ height: '500px', width: '100%', marginBottom: "50px" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDGYlDVAd8hRSEoIhWZEkaWJDzxKZfHuq4" }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {events.map(p => {
            return (
              <Marker
                key={p.eventName}
                thisEventName={p.eventName}
                lat={p.longitude}
                lng={p.latitude}
              />
            )
          })}

        </GoogleMapReact>
      </div>

      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%", display:eventDisplay,padding:"5px"}}>
        <h2 style={{ color: "black", textAlign: "left", paddingLeft: "5%" }}>Events in the Area</h2>
        <div className="container">
          {events.map(p => {
            return (
              <div className="item" key={p._id} onClick={() => {
                setCurrentEvent(p.eventName)
                setEventDisplay('none')
                setVendorDisplay('block')
              }}>
                <p>{p.eventName}</p>
              </div>
            )
          })}
        </div>
      </div>

      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%", display:vendorDisplay,padding:"5px"}}>
        <div style={{ color: "black", textAlign: "left", paddingLeft: "5%",marginTop: "2%"  }}>
        <h2 style={{display:"inline",padding:"10px"}} className="item" onClick={()=>{ 
          setEventDisplay('block')
          setVendorDisplay('none')
          }}>{currentEvent}</h2>
        <h2 style={{display:"inline"}}> Vendors</h2>
        </div>
        <div className="container">
          {eventVendors.map(p => {
            if (currentEvent === p.eventName) {
              return (
                <div className="item" key={p._id} onClick={() => { 
                  setCurrentVendor(p.vendorName)
                  setVendorDisplay('none')
                  setProductDisplay('block')
                   }}>
                  <p>{p.vendorName}</p>
                </div>
              )
            }
          })}
        </div>
      </div>

      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%",display:productDisplay}}>
        <div style={{ color: "black", textAlign: "left", paddingLeft: "5%",marginTop: "2%"  }}>
        <h2 style={{display:"inline",padding:"10px"}} className="item" onClick={()=>{
            setProductDisplay('none')
            setVendorDisplay('block')

        }}>{currentVendor}</h2>
        <h2 style={{display:"inline"}}> Products</h2>
        </div>
        <div className="container">
          {products.map(p => {
            if (currentVendor === p.vendor) {
              return (
                <div className="item" key={p.name} style={{margin:"10px",backgroundColor:"white"}} onClick={() => {
                  setOverlayDisplay("block")
                  setOverlayContent(p.name + " $" + p.price)
                  setInputsCart({ ...inputsCart, cartName: p.name, cartPrice: p.price, cartUser: user ? user.username : " ", cartVendor: p.vendor })
                }}>
                  <img style={{ width: "100%", borderRadius:" 20px 20px 0px 0px"}} src={p.url} alt="Untitled-Artwork" border="0" />
                  <p style={{fontSize:"15px"}}>{p.name}</p>
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
                          backgroundColor: "rgb(103, 173, 253,0.5)"
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

      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%",padding:"10px" }}>
        <h2 style={{ color: "black", textAlign: "left"}}>Cart</h2>
        <div className="container">
          {cart.map((p) => {
            if ((p.cartUser === (user ? user.username : " ")) && (p.status === "")) {
              total=total+p.cartPrice
              return (
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
        <div className="item" style={{ hight:"30px",marginBottom:"10px"}}>
        Total: ${total}
        </div>
        <div className="item" style={{ backgroundColor: "#AC3C40" }}
          onClick={(event) => {
            const shouldAdd = window.confirm('Confirm Order')
            cart.forEach((p) => {
              if (user && shouldAdd && (p.cartUser === user.username) && (p.status === "")) {
                editCart(p)
              }
            })
          }}>CheckOut</div>
      </div>



      <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%",padding:"10px" }}>
        <h2 style={{ color: "black", textAlign: "left", paddingLeft: "5%" }}>Order Status</h2>
        <div className="container">
          {
            cart.map((p) => {
              if ((p.cartUser === (user ? user.username : " ")) && (p.status === "pending...")) {
                return (
                  <div className="item" key={p._id} style={{padding:"10px"}}>
                    <p>{p.cartName}</p>
                    <p style={{ backgroundColor: "Orange", borderRadius: "25px" }}>{p.status}</p>

                  </div>
                )
              }
              else if ((p.cartUser === (user ? user.username : " ")) && (p.status === "Accepted")) {
                return (
                  <div className="item" key={p._id} style={{padding:"10px"}}>
                    <p>{p.cartName}</p>
                    <p style={{ backgroundColor: "Green", borderRadius: "25px" }}>{p.status}</p>

                  </div>
                )
              }
              else if ((p.cartUser === (user ? user.username : " ")) && (p.status === "Denied")) {
                return (
                  <div className="item" key={p._id} style={{padding:"10px"}}>
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
