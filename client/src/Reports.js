import React, { useEffect, useState } from "react"
import './App.css';
import './css/homePage.css';
import axios from "axios";
import { useAuthState } from './AuthProvider'

const defaultValues = {
    market: "",
    name: "",
    price: "",
    vendor: "",
    quantity: "",
    date_created: "",
}

const defaultKey = {
    market: "",
    vendor: "",
    date_created: "",
}

const Reports = () => {

    const [cart, setCart] = useState([])
    const { user } = useAuthState()
    const [products, setProducts] = useState([])
    const [loadList, setLoadList] = useState([])
    const [eventVendors, setEventVendors] = useState([])
    const [reportKey, setReportKey] = useState([])


    const [inputs, setInputs] = useState(defaultValues)
    const [inputsKey, setInputsKey] = useState(defaultKey)


    const [overlayDisplay, setOverlayDisplay] = useState('none')
    const [overlayContent, setOverlayContent] = useState('')

    const [newReportDisplay, setNewReportDisplay] = useState('none')
    const [ReportDisplay, setReportDisplay] = useState('none')


    const [currentQuantity, setCurrentQuantity] = useState('')

    const [reportLocation, setReportLocation] = useState('')
    const [selectedReport, setSelectedReport] = useState('')
    const [selectedReportDate, setSelectedReportDate] = useState('')

    const [ReportDate, setReportDate] = useState('')


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
    const getReportKey = async () => {
        const res = await axios.get("/api/reportKey")
        setReportKey(res.data)
    }
    const handleSubmit = async (event) => {
        const res = await axios.post("/api/loadList", inputs)
        setLoadList(res.data)
        setInputs(defaultValues)
        setCurrentQuantity(0)

    }

    const handleSubmitKey = async (event) => {
        const res = await axios.post("/api/reportKey", inputsKey)
        setReportKey(res.data)
        setInputsKey(defaultKey)
    }
    const getEventVendors = async () => {
        const res = await axios.get("/api/eventsVendor")
        setEventVendors(res.data)
    }

    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let salesTotal = 0

    useEffect(() => { getCart() }, [])
    useEffect(() => { getProducts() }, [])
    useEffect(() => { getLoadLists() }, [])
    useEffect(() => { getReportKey() }, [])
    useEffect(() => { getEventVendors() }, [])


    return (
        <div>
            <img style={{ width: "100%" }} src="https://i.postimg.cc/QtZTsHHw/Screen-Shot-2020-12-13-at-9-46-54-PM.png" alt="Untitled-Artwork" border="0" />
            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Reports</h1>

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


            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%", padding: "5px" }}>
                Report
                <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%", padding: "5px" }}>
                    <div>{reportKey.map((p) => {
                        if(p.vendor===(user?user.username:"")){
                        return (<div onClick={() => {
                            setSelectedReport(p.market)
                            setSelectedReportDate(p.date_created)
                            setReportDisplay("block")
                            loadList.map((p) => {
                                if (selectedReport === p.market) {
                                    return (<div className="item" style={{ margin: "10px", textAlign: "left", paddingLeft: "10px" }}>{p.date_created + " | " + p.vendor + " | " + p.name + " | Price:" + p.price + " | Quantity:" + p.quantity + " | Market:" + p.market}</div>)
                                }
                            }) 
                        }}
                            className="item" style={{ margin: "10px", textAlign: "left", paddingLeft: "10px" }}>{p.market + " | " + p.date_created}</div>)
                    }
                        }
                    )}</div>
                    <div style={{ backgroundColor: "#2e8b57", borderRadius: "25px", padding: "10px", margin: "5px" }}
                        onClick={() => {
                            setNewReportDisplay("block")
                        }}
                    >New Report</div>
                    <div id="overlay2" style={{ display: newReportDisplay }}>
                        <div id="text">
                            <div>
                                <label>Date:</label>
                                <input
                                    className="w3-input"
                                    style={{
                                        borderRadius: "25px",
                                        marginBottom: "20px",
                                        textAlign: "center"
                                    }}
                                    onChange={(e) => {
                                        setInputsKey({ ...inputsKey, date_created: e.target.value })
                                        setReportDate(e.target.value)
                                    }}
                                    type="date"
                                />
                            </div>
                            <p>Select Location</p>

                            <div>{eventVendors.map((p) => {
                                if (user) {
                                    if (p.vendorName === user.username) {
                                        return (
                                            <div className="item" style={{ margin: "10px" }}
                                                onClick={() => {
                                                    setReportLocation(p.eventName)
                                                    setInputsKey({ ...inputsKey, market: p.eventName, vendor: (user ? user.username : " ") })
                                                }}
                                            >{p.eventName}</div>
                                        )
                                    }
                                }
                            })}</div>
                            <div className="item" style={{ backgroundColor: "#0063a0" }}
                                onClick={() => {
                                    let shouldAdd = true
                                    reportKey.forEach((p) => {
                                        if ((p.date_created === ReportDate) && (p.market === reportLocation)) {
                                            shouldAdd = false
                                            alert("report already exists")
                                        }
                                    })
                                    if (shouldAdd) {
                                        handleSubmitKey()
                                    }
                                    setNewReportDisplay("none")
                                }
                                }>Confirm</div>
                            <div className="item" style={{ backgroundColor: "#0063a0", marginTop: "10px" }}
                                onClick={() => { setNewReportDisplay("none") }}
                            >Close</div>

                        </div>
                    </div>

                </div>



                <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%", padding: "5px", display: ReportDisplay }}>
                    {selectedReportDate + " " + selectedReport}
                    <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "1%", padding: "5px" }}>

                    <div>{loadList.map((p) => {
                        if (selectedReport === p.market && selectedReportDate === p.date_created) {
                            return (
                                <div className="item" style={{ margin: "10px", textAlign: "left", paddingLeft: "10px" }}>
                                    {p.date_created + " | " + p.vendor + " | " + p.name + " | Price:" + p.price + " | Quantity:" + p.quantity + " | Market:" + p.market}
                                </div>
                            )
                        }
                    })}
                    </div>
                    </div>

                    <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "1%", padding: "5px" }}>
                        add products to report
                <div className="container">
                            {products.map((p) => {
                                if (user) {
                                    if (p.vendor === user.username) {
                                        return (
                                            <>
                                                <div className="item" style={{ padding: "5px" }}
                                                    onClick={() => {
                                                        setOverlayDisplay('block')
                                                        setOverlayContent(p.name)
                                                        setInputs({ ...inputs, market: selectedReport, name: p.name, price: p.price, vendor: (user ? user.username : " "), date_created: selectedReportDate })

                                                    }}>{p.name}</div>

                                                <div id="overlay2" style={{ display: overlayDisplay }}>
                                                    <div id="text" style={{ backgroundColor: "#f5f5f5" }}>
                                                        <p>{overlayContent}</p>
                                                        <div>
                                                            <label>Quantity:</label>
                                                            <input
                                                                className="w3-input"
                                                                style={{
                                                                    borderRadius: "25px",
                                                                    marginBottom: "20px",
                                                                    textAlign: "center"
                                                                }}
                                                                onChange={(e) => {
                                                                    setCurrentQuantity(e.target.value)
                                                                    setInputs({ ...inputs, quantity: e.target.value })
                                                                }}
                                                                type="number"
                                                                value={currentQuantity}
                                                            />
                                                        </div>
                                                        <div style={{ display: "inline", backgroundColor: "gray", borderRadius: "25px", padding: "10px", margin: "5px" }}
                                                            onClick={() => {
                                                                setOverlayDisplay('none')
                                                            }}>Close</div>
                                                        <div style={{ display: "inline", backgroundColor: "#2e8b57", borderRadius: "25px", padding: "10px", margin: "5px" }}
                                                            onClick={() => {
                                                                setOverlayDisplay('none')
                                                                handleSubmit()
                                                            }}
                                                        >+</div>
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    }
                                }
                            })}
                        </div>
                    </div>
                    <div style={{ backgroundColor: "#0063a0", borderRadius: "25px", padding: "10px", margin: "5px" }}>Download CSV</div>
                    <div style={{ backgroundColor: "#0073a0", borderRadius: "25px", padding: "5px", margin: "5px" }}
                        onClick={() => {
                            setReportDisplay("none")

                        }}
                    >Close</div>
                </div>
            </div>
        </div>
    )
}

export default Reports;
