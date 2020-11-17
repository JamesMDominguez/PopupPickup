import React, { useEffect, useState } from "react"
import { GoogleLogin } from 'react-google-login';
import axios from "axios";
import AppUsers from "./AppUsers";
const defaultValues = {
  userName: "",
  email: "",
  userType: "",
  imgUrl: ""
}

const GoogleLoginApp = ({ isLogedIn }) => {

  const [users, setUsers] = useState([])
  const [inputs, setInputs] = useState(defaultValues)
  const [isUser, setIsUser] = useState(false)

  const getUsers = async () => {
    const res = await axios.get("/api/users/jsm")
    setUsers(res.data)
  }

  const handleSubmit = async (event) => {
    event.stopPropagation()
    event.preventDefault()
    const res = await axios.post("/api/users/jsm", inputs)
    setUsers(res.data)
    setInputs(defaultValues)
  }

  useEffect(() => { getUsers() }, [])

  const responseGoogle = (response) => {
    console.log(response)
    users.email.map(p => {
      if (p.email = response.profileObj.email) {
        setIsUser(true)
      }
    })
    if(isUser){
      console.log('welcome back');
  }
  else if(!isUser){
  setInputs({ ...inputs, email: response.profileObj.email, userName: response.profileObj.name, imgUrl: response.profileObj.imageUrl })
  }
  console.log(isUser)
  }

  isLogedIn = true


  return (
    <div>
      <GoogleLogin
        clientId="1007864084087-lnkgf4coj0uplienjl9s9lj20mqa2via.apps.googleusercontent.com" buttonText="Login"
        render={renderProps => (
          <button
            onClick={renderProps.onClick}
            onClick={handleSubmit}
            className="w3-theme-d1 w3-btn"
            style={{ borderRadius: "25px", padding: "10px", width: "100%" }}
            disabled={renderProps.disabled}>Login</button>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        isSignedIn={isLogedIn}
      />

      <div className="container">
        {users.map(p => (
          <AppUsers
            imgUrl={p.imgUrl}
            userName={p.userName}
            email={p.email}
            userType={p.userType}
          />
        ))}
      </div>
    </div>
  )
}


export default GoogleLoginApp;
