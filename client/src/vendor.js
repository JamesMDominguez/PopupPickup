import React from "react"
import './App.css';

class vendor extends React.Component {
  constructor() {
    super()
    this.state = {
      ForumDisplay: "none", 
      NavDisplay: "none", 
      CreateBtnDisplay: "block", 
      LoginBtnDisplay: "block"
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openLogin = this.openLogin.bind(this)
    this.openCreateEvent = this.openCreateEvent.bind(this)
    this.closeLogin = this.closeLogin.bind(this)
    this.closeCreateEvent = this.closeCreateEvent.bind(this)
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  openLogin() {
    this.setState({ ForumDisplay: "block" })
    this.setState({ CreateBtnDisplay: "none" })
  }

  openCreateEvent() {
    this.setState({ NavDisplay: "block" })
    this.setState({ LoginBtnDisplay: "none" })
  }

  closeLogin() {
    this.setState({ ForumDisplay: "none" })
    this.setState({ CreateBtnDisplay: "block" })

  }

  closeCreateEvent() {
    this.setState({ NavDisplay: "none" })
    this.setState({ LoginBtnDisplay: "block" })

  }

  render() {
    

    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Vendor</h1>
        <div class="w3-center">
         

         <button 
          onClick={this.openCreateEvent} 
          className="w3-theme-d1 w3-btn w3-center w3-margin-bottom" 
          style={{ 
            display: this.state.CreateBtnDisplay, 
            width: "20%",
            borderRadius: "25px",
            marginLeft: "40%"
            }}>
          Create Profile
        </button>

    <div style={{ display: this.state.NavDisplay }}>
      <form  //create profile
        onSubmit={this.handleSubmit} 
        className="w3-theme-d3 w3-container w3-display-middle" 
        style={{ width: "30%",padding:"25px",borderRadius: "25px"}}>
                 
          <input   
          placeholder="city" 
          type="text" 
          value={this.state.value} 
          onChange={this.handleChange} 
          className="w3-input" 
          style={{borderRadius: "25px"}}
          />

          <br/>
                
          <input 
          type="text" 
          placeholder="Address" 
          value={this.state.value} 
          onChange={this.handleChange} 
          className="w3-input" 
          style={{borderRadius: "25px"}}
          />

          <br/>
                                
          <input 
          type="text"
          placeholder="Name" 
          value={this.state.value} 
          onChange={this.handleChange} 
          className="w3-input w3-animate-input" 
          style={{borderRadius: "25px"}}
          />

          <br/> 

          <input 
          type="submit" 
          value="Submit" 
          className="w3-theme-d1 w3-btn" 
          style={{borderRadius: "25px",width:"100%"}}
          />
      </form>
   </div>

      <button 
        onClick={this.closeCreateEvent} 
        style={{ 
          display: this.state.NavDisplay, 
          width: "20%",
          borderRadius: "25px",
          marginLeft: "40%"
        }} 
        className="w3-theme-d2 w3-btn w3-center">
        Close
      </button>

      <button 
        onClick={this.openLogin} 
        className="w3-theme-d1 w3-btn w3-margin-bottom" 
        style={{
           display: this.state.LoginBtnDisplay, 
           width: "20%",
           borderRadius: "25px",
           marginLeft: "40%"
           }}>
        LogIn
      </button>

    <div style={{ display: this.state.ForumDisplay }}>
      <form //login
        onSubmit={this.handleSubmit} 
        className="w3-theme-d3 w3-container w3-display-middle" 
        style={{ width: "30%",padding:"25px", borderRadius: "25px" }}>
                
                 
          <input 
          type="text" 
          placeholder="Name" 
          value={this.state.value} 
          onChange={this.handleChange} 
          className="w3-input" 
          style={{borderRadius: "25px"}}
          />

          <br/>

          <input 
          type="text" 
          placeholder="Password" 
          value={this.state.value} 
          onChange={this.handleChange} 
          className="w3-input" 
          style={{borderRadius: "25px"}}
          />

          <br/>

          <input 
          type="submit" 
          value="Submit" 
          className="w3-theme-d1 w3-btn" 
          style={{borderRadius: "25px",width:"100%"}}
          />
        </form>
      </div>

      <button 
      onClick={this.closeLogin} 
      style={{ 
        display: this.state.ForumDisplay, 
        width: "20%",
        borderRadius: "25px",
        marginLeft: "40%"
      }} 
      className="w3-theme-d2 w3-btn w3-center">
      Close
      </button>

         
        </div>
      </div>
    )
  }
}

export default vendor;
