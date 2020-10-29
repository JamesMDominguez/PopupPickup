import React from 'react';
import NavBar from './NavBar';
import './App.css';
import './css/Nav.css';


class App extends React.Component {
  constructor() {
    super()
    this.state = {}
}
    render() {  
    return (       
<div>
 <NavBar/>
</div>
        )
    }
}
export default App;

