import React from "react"
import './App.css';
import './css/homePage.css';
import GoogleMap from "./googleMap";


const Home = () => {

    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Welcome to Popup Pickup</h1>
        <img className="centerIMG" src="https://upriseup.co.uk/wp-content/uploads/2018/03/Shopping-Header.jpg"  width="100%" />
        <GoogleMap/>
      </div>
    )
  }

export default Home;
