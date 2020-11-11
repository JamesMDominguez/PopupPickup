import React from "react"
import './App.css';
import GoogleLogin from "./GoogleLoginApp";
import GoogleLogout from "./GoogleLogoutApp";
class host extends React.Component {
  constructor() {
    super()
    this.state = { loginDisplay:"none"}
    this.displayLoginChange = this.displayLoginChange.bind(this);
    this.displayLogoutChange = this.displayLogoutChange.bind(this);


  }
 displayLoginChange(){
  this.setState({loginDisplay:"block"});
 }
 displayLogoutChange(){
  this.setState({loginDisplay:"none"});
  document.getElementById("inText").innerHTML = "Click here to Login"
 }

  render() {

    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Login</h1>
        <div
          className="w3-theme-d3 w3-container w3-display-middle"
          style={{ padding: "25px", borderRadius: "25px" }}
        >
          <h4 id="inText">Click here to Login</h4>
          <div onClick={this.displayLoginChange}>
          <GoogleLogin/>
          </div>
          <div 
          style={{ display:this.state.loginDisplay}}
          onClick={this.displayLogoutChange}
          >
          <GoogleLogout/>
          </div>
        </div>
      </div>
    )
  }
}

export default host;
