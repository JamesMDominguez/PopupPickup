import React, { useState } from 'react';
import LoginPage from './LoginPage';
import { useAuthState } from './AuthProvider'
import Home from './Home';
import ProductsPage from './ProductsPage';
import Event from './event';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';
import './css/Nav.css';
import './css/homePage.css';



const NavBar = () => {
  const { user, logout } = useAuthState()
  const [NavDisplay, setNavDisplay] = useState("none")
  const [width, setWidth] = useState("0%")


  const w3_open = () => {
    setNavDisplay("block")
    setWidth("25%")
  }

  const w3_close = () => {
    setNavDisplay("none")
    setWidth("0%")
  }


  const style = {
    display: NavDisplay,
    width: width
  }
  return (
    <div>

      <Router>
        <div className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left" style={style} >
          <button onClick={w3_close} className="3-bar-item w3-button w3-large w3-hover-opacity">Close</button>
          <Link to="/" className="w3-bar-item w3-button w3-hover-opacity">Home</Link>
          <Link to="/ProductsPage/" 
          onClick={()=>{
            if(!user){
              alert("login to use")
          }}} className="w3-bar-item w3-button w3-hover-opacity">Vendor/Products</Link>
          <Link to="/Event/" 
          onClick={()=>{
            if(!user){
              alert("login to use")
          }}}
          className="w3-bar-item w3-button w3-hover-opacity">Events</Link>
        </div>

        <div className="NavBar">
          <button className="NavBarIcon" onClick={w3_open}>☰</button>
          <img style={{ height: "50px", marginLeft: "30px", marginTop: "5px" }} 
          onClick={() => <Link to="/"></Link>} 
          src="https://i.postimg.cc/GtKMqRdq/popin-Head.jpg"
          alt="Untitled-Artwork" border="0" />

          {user && (
            <div style={{ display: "flex", float: "right", alignItems: "center" }}>
              <h4 style={{ float: "right" }}>Logged in: {user.username}</h4>
              <button onClick={logout} className="w3-bar-item w3-button w3-hover-opacity">Logout</button>
            </div>
          )}
          <Link 
           style={{ float: "right", height: "40px", marginTop: "5px", marginRight: "10px", backgroundColor: "rgb(88,166, 255)", borderRadius: "10px" }}
           to="/LoginPage/" className="w3-bar-item w3-button w3-hover-opacity">Login</Link>
        </div>
        <Route exact path="/" component={Home} />
        <Route path="/LoginPage" component={LoginPage} />
        <Route path="/ProductsPage" component={ProductsPage} />
        <Route path="/Event" component={Event} />
      </Router>
    </div>
  )
}
export default NavBar;
