import React from "react"
import { GoogleLogout } from 'react-google-login';


const GoogleLogoutApp = () => {

  return (
    <div>

      
            <GoogleLogout
        clientId="1007864084087-lnkgf4coj0uplienjl9s9lj20mqa2via.apps.googleusercontent.com"
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            className="w3-theme-d1 w3-btn"
            style={{ borderRadius: "25px", padding: "10px", margin: "10px" }}
            disabled={renderProps.disabled}>Logout</button>
        )}
        buttonText="Logout"
      >
      </GoogleLogout>
    </div>
  )
}


export default GoogleLogoutApp;
