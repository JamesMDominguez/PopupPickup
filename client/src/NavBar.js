import React from 'react';
import Host from './host';
import Home from './Home';
import Test from './test';

import './App.css';
import './css/Nav.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


class NavBar extends React.Component {
  constructor() {
    super()
    this.state = {
         NavDisplay:"none",
         width:"0%"
}

    this.w3_open = this.w3_open.bind(this)
    this.w3_close = this.w3_close.bind(this)
}

w3_open() {
    this.setState({NavDisplay:"block"})
    this.setState({width:"25%"})
}
  
   w3_close() {
    this.setState({NavDisplay:"none"})
    this.setState({width:"0%"})

  }

    render() {
      
      const style={
        display:this.state.NavDisplay,
        width:this.state.width
     }
        return (       
<div>
 <Router>
  <div className="w3-sidebar w3-bar-block w3-collapse w3-card w3-animate-left w3-theme-d2" style={style} >
   <button onClick={this.w3_close} className="3-bar-item w3-button w3-large w3-hover-opacity">Close</button>
     <Link to="/" className="w3-bar-item w3-button w3-hover-opacity">Home</Link>
     <Link to="/Host/" className="w3-bar-item w3-button w3-hover-opacity">Login</Link>
     <Link to="/Test/" className="w3-bar-item w3-button w3-hover-opacity">Inventory</Link>

   </div>

  <div className="NavBar">
    <button className="NavBarIcon" onClick={this.w3_open}>☰</button>
  </div>
  <Route exact path="/" component={Home} />
  <Route path="/Host" component={Host} />
  <Route path="/Test" component={Test} />
</Router>
</div>
        )
    }
}
export default NavBar;

