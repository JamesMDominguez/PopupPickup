import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import axios from "axios";
//import { useAuthState } from './AuthProvider'

const Reports = () => {

    const [cart, setCart] = useState([])

    const getCart = async () => {
        const res = await axios.get("/api/cart")
        setCart(res.data)
    }

    useEffect(() => { getCart() }, [])

    return (
        <div>
            <img style={{ width: "100%" }} src="https://i.postimg.cc/QtZTsHHw/Screen-Shot-2020-12-13-at-9-46-54-PM.png" alt="Untitled-Artwork" border="0" />
            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Reports</h1>

            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%" }}>
                <div className="container" style={{padding:"10px"}}>
                    <div className="item">
                        <p>Load List</p>
                    </div>
                    <div className="item">
                        <p>Sales</p>
                    </div>
                </div>
            </div>

    <div>{cart.map((p)=>{
        if(p.status==="Confirm"){
        return(
        <p>{p.cartName}</p>
        )
        }
    })}</div>

        </div>
    )
}

export default Reports;
