import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import { useAuthState } from './AuthProvider'

  const Cart = () => {

    const { user } = useAuthState()
    const [cart, setCart] = useState([])

    const getCart = async () => {
        const res = await axios.get("/api/cart")
        setCart(res.data)
      }

    useEffect(() => { getCart() }, [])

    return (
        <div className="item" style={{backgroundColor:"rgba(0,0,50,0.2)", margin:"10%"}}>
      <h2 style={{ color:"black",textAlign:"left",paddingLeft:"5%"}}>Cart</h2>
      <div className="container">
        {cart.map((p)=> {
          if (p.cartUser === (user ? user.username:" ")) {
            return (
              <div className="item" key={p._id}>
                <p>{p.cartName}</p>
              </div>
            )
          }
        }
        )}
      </div>
      </div>
    )
}

export default Cart;
