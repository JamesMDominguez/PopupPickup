import React from "react"
import './App.css';
import './css/homePage.css';
import GoogleMap from "./googleMap";
class Home extends React.Component {
    constructor() {
        super()
        this.state = {       value: 'Loaction_City'}
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
      }


    
    render() {
        return (  
    <div>
      <h1 style={{textAlign: "center",textDecoration: "underline"}}>Welcome to Popup Pickup</h1>
      <img className="centerIMG" src="https://upriseup.co.uk/wp-content/uploads/2018/03/Shopping-Header.jpg" alt="home photo" width="100%" />

            <div className="w3-bar ">
      <form 
      onSubmit={this.handleSubmit} 
      className="w3-theme-d3 w3-container" 
      style={{ 
          width:"30%",
          marginLeft: "auto",
          marginRight: "auto",
          display:"inlineBlock"
        }}>
        <label>
          Find events in your city:
          <input 
          type="text" 
          value={this.state.value} 
          onChange={this.handleChange} 
          className="w3-input"
          />
        </label>
        <input 
        type="submit" 
        value="Submit" 
        className="w3-theme-d1 w3-btn w3-block w3-margin-bottom"
        />
      </form>
      </div>

    <GoogleMap/>

    </div>
        )
    }
}

export default Home;
