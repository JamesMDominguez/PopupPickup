import React, {useEffect,useState} from "react"
import './App.css';
import axios from "axios";

import LoginForm from './LoginForm'

const defaultValues = {
  userName: "",
  userType:""
}

  const LoginPage = () => {
  const [users, setUsers] = useState([])
  const [inputs, setInputs] = useState(defaultValues)



  const getUsers = async () => {
    const res = await axios.get("/api/users")
    setUsers(res.data)
}




useEffect(() => { getUsers() }, [])

    return (
      <div>
        <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Users</h1>



        <LoginForm />



      </div>
    )
}

export default LoginPage;
