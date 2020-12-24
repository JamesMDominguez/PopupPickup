import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import axios from "axios";
import { useAuthState } from './AuthProvider'

const defaultValues = {
    name: "",
    price: "",
    quantity: "",
    vendor: "",
    url: "",
    _id:""
}

const Reports = () => {

    const [cart, setCart] = useState([])
    const { user } = useAuthState()
    const [products, setProducts] = useState([])
    const [loadList, setLoadList] = useState([])
    const [eventVendors, setEventVendors] = useState([])

    const [inputs, setInputs] = useState(defaultValues)
    const [overlayDisplay, setOverlayDisplay] = useState('none')
    const [overlayContent, setOverlayContent] = useState('')

    const [ displayReport, setDisplayReport] = useState('none')
    const [ newReportDisplay, setNewReportDisplay] = useState('none')

    const [ reportLocation, setReportLocation] = useState('')


    


    const getCart = async () => {
        const res = await axios.get("/api/cart")
        setCart(res.data)
    }
    const getProducts = async () => {
        const res = await axios.get("/api/products")
        setProducts(res.data)
    }
    const getLoadLists = async () => {
        const res = await axios.get("/api/loadList")
        setLoadList(res.data)
    }
    const handleSubmit = async (event) => {
        event.stopPropagation()
        event.preventDefault()

        const res = await axios.post("/api/loadList", inputs)
        setProducts(res.data)
        setInputs(defaultValues)
    }
    const getEventVendors = async () => {
        const res = await axios.get("/api/eventsVendor")
        setEventVendors(res.data)
      }

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let salesTotal = 0

    useEffect(() => { getCart() }, [])
    useEffect(() => { getProducts() }, [])
    useEffect(() => { getLoadLists() }, [])
    useEffect(() => { getEventVendors() }, [])


    return (
        <div>
            <img style={{ width: "100%" }} src="https://i.postimg.cc/QtZTsHHw/Screen-Shot-2020-12-13-at-9-46-54-PM.png" alt="Untitled-Artwork" border="0" />
            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Reports</h1>

            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%" }}>
                <div className="container" style={{ padding: "10px" }}>
                    <div className="item">
                        <p>Load List</p>
                    </div>
                    <div className="item">
                        <p>Sales</p>
                    </div>
                </div>
            </div>

            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%" }}>
                Sales
    <div className="container" style={{ padding: "10px" }}>{cart.map((p) => {
                if (user) {
                    if (p.status === "Confirm" && user.username === p.cartUser) {
                        salesTotal = salesTotal + p.cartPrice
                        return (
                            <div className="item" style={{ padding: "5px" }}>
                                <p>{p.cartName}</p>
                            </div>
                        )
                    }
                }
            })}</div>
                <p>${salesTotal}</p>
            </div>


            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%", padding: "5px"}}>
                Report
                <div style={{backgroundColor: "#2e8b57", borderRadius: "25px", padding: "10px", margin: "5px"}}
                onClick={()=>{setNewReportDisplay("block")}}
                >New Report</div>
                <div id="overlay2" style={{display:newReportDisplay}}>
                    <div id="text">
                        <p>{date}</p>
                        <div>{eventVendors.map((p)=>{
                        if(user){
                        if(p.vendorName==user.username){
                            return(
                            <div className="item" style={{margin:"10px"}}>{p.eventName}</div>
                            )
                        }
                    }
                    })}</div>
                    <div style={{display: "inline", backgroundColor: "#2e8b57", borderRadius: "25px", padding: "10px", margin: "5px"}}
                    onClick={()=>{
                        setDisplayReport("block")
                        setNewReportDisplay("none")
                    }}>X</div>
                    </div>
                </div>

                <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%", padding: "5px", display: displayReport}}>
                products
                <div className="container">
                    {products.map((p) => {
                        if (user) {
                            if (p.vendor == user.username) {
                                return (
                                    <>
                                    <div className="item" style={{ padding: "5px" }}
                                    onClick={()=>{
                                        setOverlayDisplay('block')
                                        setOverlayContent(p.name)
                                    }}>{p.name}</div>

                                    <div id="overlay2" style={{ display: overlayDisplay }}>
                                      <div id="text" style={{ backgroundColor:"#f5f5f5"}}>
                                          <p>{overlayContent}</p>
                                          <div>
                                            <label>Quantity:</label>
                                            <input
                                            className="w3-input"
                                            style={{
                                                borderRadius: "25px",
                                                marginBottom: "20px",
                                                textAlign:"center"
                                            }}
                                            type="number"
                                            />
                                        </div>
                                        <div style={{ display: "inline", backgroundColor: "gray", borderRadius: "25px", padding: "10px", margin: "5px" }}
                                        onClick={()=>{
                                        setOverlayDisplay('none')
                                        }}>Close</div>
                                        <div style={{display: "inline", backgroundColor: "#2e8b57", borderRadius: "25px", padding: "10px", margin: "5px"}}>+</div>
                                      </div>
                                     </div>
                                    </>
                                )
                            }
                        }
                    })}
                </div>
              </div>
            </div>

        </div>
    )
}

export default Reports;
