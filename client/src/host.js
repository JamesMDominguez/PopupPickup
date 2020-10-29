import React from "react"
import './App.css';

class host extends React.Component {
  constructor() {
    super()
    this.state = {
      ForumDisplay: "none", NavDisplay: "none", CreateBtnDisplay: "block", LoginBtnDisplay: "block"
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
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Host</h1>
        <div class="w3-center">
          <div class="w3-bar ">
            <button onClick={this.openCreateEvent} className="w3-theme-d1 w3-btn w3-center w3-margin-bottom" style={{ display: this.state.CreateBtnDisplay, width: "100%" }}>Create Profile</button>

            <div style={{ display: this.state.NavDisplay }}>
              <form onSubmit={this.handleSubmit} className="w3-theme-d3 w3-container w3-display-middle" style={{ width: "30%" }}>
                <label>
                  City:
          <input type="text" name="city" value={this.state.value} onChange={this.handleChange} className="w3-input w3-animate-input" />
                </label>
                <label>
                  Address:
          <input type="text" name="addy" value={this.state.value} onChange={this.handleChange} className="w3-input w3-animate-input" />
                </label>
                <label>
                  Email:
          <input type="text" name="email" value={this.state.value} onChange={this.handleChange} className="w3-input w3-animate-input" />
                </label>
                <label>
                  Name:
          <input type="text" name="name" value={this.state.value} onChange={this.handleChange} className="w3-input w3-animate-input" />
                </label>
                <input type="submit" value="Submit" className="w3-theme-d1 w3-btn" />
              </form>
            </div>
            <button onClick={this.closeCreateEvent} style={{ display: this.state.NavDisplay, width: "100%" }} className="w3-theme-d2 w3-btn w3-center">Close</button>


            <button onClick={this.openLogin} className="w3-theme-d1 w3-btn w3-margin-bottom" style={{ display: this.state.LoginBtnDisplay, width: "100%" }}>LogIn</button>
            <div style={{ display: this.state.ForumDisplay }}>
              <form onSubmit={this.handleSubmit} className="w3-theme-d3 w3-container w3-display-middle" style={{ width: "30%" }}>
                <label>
                  Name:
          <input type="text" name="name" value={this.state.value} onChange={this.handleChange} className="w3-input w3-animate-input" />
                </label>
                <label>
                  Event Code:
          <input type="text" value={this.state.value} onChange={this.handleChange} className="w3-input w3-animate-input" />
                </label>
                <input type="submit" value="Submit" className="w3-theme-d1 w3-btn" />
              </form>
            </div>
            <button onClick={this.closeLogin} style={{ display: this.state.ForumDisplay }} className="w3-theme-d2 w3-btn w3-center">Close</button>
          </div>
        </div>
      </div>
    )
  }
}

export default host;
