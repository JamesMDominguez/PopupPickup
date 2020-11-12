import React from "react"
import { GoogleLogin } from 'react-google-login';


const GoogleLoginApp = ({isLogedIn}) => {

  const responseGoogle = (response) => {
    let proName = response.profileObj.name
    console.log(response);
    let x = document.getElementById("inText");
    x.innerHTML = proName;                  // Insert text
    document.getElementById("inText").appendChild(x);
  }

  isLogedIn = true
  console.log(isLogedIn);


  return (

      <GoogleLogin
        clientId="1007864084087-lnkgf4coj0uplienjl9s9lj20mqa2via.apps.googleusercontent.com" buttonText="Login"
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            className="w3-theme-d1 w3-btn"
            style={{ borderRadius: "25px", padding: "10px",width:"100%" }}
            disabled={renderProps.disabled}>Login</button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={isLogedIn}
      />
      

  )
}


export default GoogleLoginApp;
