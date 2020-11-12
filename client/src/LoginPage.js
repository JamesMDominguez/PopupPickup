import React, {useState} from "react"
import './App.css';
import GoogleLogin from "./GoogleLoginApp";
import GoogleLogout from "./GoogleLogoutApp";

  const LoginPage = () => {

    const [loginDisplay, setloginDisplay] = useState('none')
    const [logoutDisplay, setlogoutDisplay] = useState('block')

const displayLoginChange = () => {
  setloginDisplay("block")
  setlogoutDisplay("none")
 }
 const displayLogoutChange = () => {
  setloginDisplay("none")
  setlogoutDisplay("block")
  document.getElementById("inText").innerHTML = "Click here to Login"
 }

    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Login</h1>
        <div
          className="w3-theme-d3 w3-container w3-display-middle"
          style={{ padding: "25px", borderRadius: "25px" }}
        >
          <h4 id="inText">Click here to Login</h4>
          <div onClick={displayLoginChange}
              style={{ display:logoutDisplay}}
          >
          <GoogleLogin/>
          </div>
          <div 
          style={{ display:loginDisplay}}
          onClick={displayLogoutChange}
          >
          <GoogleLogout/>
          </div>
        </div>
      </div>
    )
}

export default LoginPage;
