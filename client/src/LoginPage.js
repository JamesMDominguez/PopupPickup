import React from "react"
import './App.css';
import LoginForm from './LoginForm'


  const LoginPage = () => {

    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Users</h1>
        <LoginForm />
      </div>
    )
}

export default LoginPage;
