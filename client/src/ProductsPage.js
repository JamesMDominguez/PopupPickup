import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios";

const defaultValues = {
    name: "",
    price: "",
    quantity: "",
    vendor: ""
}

const defaultValuesVendor = {
    name: ""
}

const ProductsPage = () => {

    const [products, setProducts] = useState([])
    const [inputs, setInputs] = useState(defaultValues)

    const [vendors, setVendors] = useState([])
    const [vinputs, setVendorInputs] = useState(defaultValuesVendor)

    const [vendorChosen, setVendorChosen] = useState()

    const Item = ({ productName, price, quantity, vendors }) =>
        (
            <div className="item">
                <p>{vendors}</p>
                <p>{productName}</p>
                <p>{price}</p>
                <p>{quantity}</p>
            </div>
        )

    const Item2 = ({ name }) =>
        (
            <div className="item" onClick={() => setVendorChosen(name)}>
                <p>{name}</p>
            </div>
        )

    const getProducts = async () => {
        const res = await axios.get("/api/products/jsm")
        setProducts(res.data)
    }

    const handleSubmit = async (event) => {
        event.stopPropagation()
        event.preventDefault()

        const res = await axios.post("/api/products/jsm", inputs)
        setProducts(res.data)
        setInputs(defaultValues)
    }

    const getVendors = async () => {
        const res = await axios.get("/api/vendors/jsm")
        setVendors(res.data)
    }

    const handleVendorSubmit = async (event) => {
        event.stopPropagation()
        event.preventDefault()

        const res = await axios.post("/api/vendors/jsm", vinputs)
        setVendors(res.data)
        setVendorInputs(defaultValuesVendor)
    }

    useEffect(() => { getVendors() }, [])

    useEffect(() => { getProducts() }, [])

    return (
        <div>

            <img style={{ width: "100%" }} src="https://i.postimg.cc/kgx8Wcsg/IMG-0735.jpg" alt="Untitled-Artwork" border="0" />

            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Inventory</h1>

            <div className="container">
                {vendors.map(p => (
                    <Item2
                        name={p.name}
                    />
                ))
                }
            </div>

            <div className="container">
                {
                    products.map(p => {
                        if (p.vendor == vendorChosen) {
                            return <Item 
                                productName={p.name}
                                price={p.price}
                            />
                        }
                    })
                }
            </div>


            <div style={{ paddingLeft: "30%" }}>
                <form //login
                    onSubmit={handleSubmit}
                    className="w3-theme-d3 w3-container"
                    style={{ width: "60%", padding: "25px", borderRadius: "25px" }}>

                    <input
                        type="text"
                        placeholder="Vandor"
                        value={inputs.vendor}
                        onChange={e => setInputs({ ...inputs, vendor: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="text"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={e => setInputs({ ...inputs, name: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="text"
                        placeholder="Price"
                        value={inputs.price}
                        onChange={e => setInputs({ ...inputs, price: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="text"
                        placeholder="Quantity"
                        value={inputs.quantity}
                        onChange={e => setInputs({ ...inputs, quantity: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="submit"
                        value="Submit"
                        className="w3-theme-d1 w3-btn"
                        style={{ borderRadius: "25px", width: "100%" }}
                    />
                </form>
            </div>
            <br />
            <div style={{ paddingLeft: "30%" }}>
                <form
                    onSubmit={handleVendorSubmit}
                    className="w3-theme-d3 w3-container"
                    style={{ width: "60%", padding: "25px", borderRadius: "25px" }}>

                    <input
                        type="text"
                        placeholder="VendorName"
                        value={vinputs.name}
                        onChange={e => setVendorInputs({ ...vinputs, name: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="submit"
                        value="Submit"
                        className="w3-theme-d1 w3-btn"
                        style={{ borderRadius: "25px", width: "100%" }}
                    />
                </form>
            </div>

        </div>
    )
}


export default ProductsPage;
