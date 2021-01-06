import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import { useAuthState } from './AuthProvider'

const defaultKey = {
    name: "",
    vendor: "",
    Clockin: "",
    ClockOut:""
}

const TimeCard = () => {

    const [employee, setEmployee] = useState([])
    const [time, setTime] = useState([])
    const [inputsKey, setInputsKey] = useState(defaultKey)
    const { user } = useAuthState()
    const [selectedPunch, setSelectedPunch] = useState(null)

    const getEmployees = async () => {
        const res = await axios.get("/api/employee")
        setEmployee(res.data)
    }
    const getPunchCard = async () => {
        const res = await axios.get("/api/punchCards")
        setTime(res.data)
    }

    const handleSubmit = async (event) => {
        const res = await axios.post("/api/punchCards", inputsKey)
        setTime(res.data)
        setInputsKey(defaultKey)
    }
    const handleEdit = async (event) => {
        const res = await axios.put(`/api/punchCards/${selectedPunch}`, inputsKey)
        setTime(res.data)
        setInputsKey(defaultKey)
    }
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        
        // setTime(h + ":" + m + ":" + s)
        
    useEffect(() => { getEmployees() }, [])
    useEffect(() => { getPunchCard() }, [])


  return (
    <div>
      <img style={{ width: "100%" }} src="https://i.postimg.cc/yxnRCdMP/Clock-Header.jpg" alt="Untitled-Artwork" border="0" />
      <h1 style={{ textAlign: "center", textDecoration: "underline" }}>TimeCard</h1>

     <div className="container">{employee.map((p)=>{
         return(
         <div className="item"
         onClick={()=>{
            setInputsKey({ ...inputsKey, name: p.employeeName, vendor: (user ? user.username : " ") })
         }}
         >{p.employeeName}</div>
         )
     })}</div>
    <div className="item" style={{margin:"10px"}}>{inputsKey.name}</div>
    <div className="item" style={{margin:"10px"}}
    onClick={()=>{
        setInputsKey({ ...inputsKey, Clockin:(h + ":" + m + ":" + s)})
    }}
    >ClockIn</div>
    <div className="item" style={{margin:"10px"}} onClick={()=>{ handleSubmit() }}>Confirm</div>

    <div className="container">{time.map((p)=>{
        return(
        <div className="item" onClick={()=>{
            setSelectedPunch(p._id)
            setInputsKey(p)
        }}>{p.name+" "+p.Clockin+" "+p.ClockOut}</div>
        )
    })}</div>
        <div className="item" onClick={()=>{setInputsKey({ ...inputsKey, ClockOut:(h + ":" + m + ":" + s)})}} style={{margin:"10px"}}>ClockOut</div>
        <div className="item" style={{margin:"10px"}} onClick={()=>{ handleEdit() }}>Confirm</div>

    </div>
  )
}


export default TimeCard;
