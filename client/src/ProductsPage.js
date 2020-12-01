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
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [inputs, setInputs] = useState(defaultValues)

    const [vendors, setVendors] = useState([])
    const [vinputs, setVendorInputs] = useState(defaultValuesVendor)

    const [vendorChosen, setVendorChosen] = useState()

    const Item = ({ product, ...props }) =>
        (
            <div className="item" {...props}>
                <div onClick={(event) => {
                    event.stopPropagation()
                    const shouldDelete = window.confirm('delete product')
                    if (shouldDelete) {
                        handleDelete(product._id, event)
                    }
                }} style={{ cursor: 'pointer', fontSize: "20px", float: "left" }}>
                    x
                </div>
                <p>{product.name}</p>
                <p>{product.price}</p>
            </div>
        )

    const Item2 = ({ name, ...props }) =>
        (
            <div className="item" {...props} onClick={() => setVendorChosen(name)}>
                <div
                    style={{ cursor: 'pointer', float: "left", paddingTop: "5px" }}
                    onClick={(myEvent) => {
                        myEvent.stopPropagation()
                        const shouldDelete = window.confirm('delete vendor')
                        if (shouldDelete) {
                            handleVenodorDelete({name}, myEvent)
                        }
                    }}
                >x</div>
                <p>{name}</p>
            </div>
        )

    const getProducts = async () => {
        const res = await axios.get("/api/products")
        setProducts(res.data)
    }

    const handleDelete = async (productId, event) => {
        const res = await axios.delete(`/api/products/${productId}`)
        setProducts(res.data)
    }
    const handleVenodorDelete = async (vendorId, myEvent) => {
        const res = await axios.delete(`/api/vendors/${vendorId}`)
        setVendors(res.data)
    }


    const handleSubmit = async (event) => {
        event.stopPropagation()
        event.preventDefault()
        if (selectedProduct) {
            const res = await axios.put(`/api/products/${selectedProduct}`, inputs)
            setProducts(res.data)
        }
        else {
            setInputs({ ...inputs, vendor: vendorChosen })
            const res = await axios.post("/api/products", inputs)
            setProducts(res.data)
        }
        setInputs(defaultValues)
        setSelectedProduct(null)
    }

    const getVendors = async () => {
        const res = await axios.get("/api/vendors")
        setVendors(res.data)
    }

    const handleVendorSubmit = async (event) => {
        event.stopPropagation()
        event.preventDefault()

        const res = await axios.post("/api/vendors", vinputs)
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
                        style={{ backgroundColor: "#9A2A32" }}
                        name={p.name}
                    />
                ))
                }
            </div>

            <div className="container">
                {
                    products.map(p => {
                        if (p.vendor === vendorChosen) {
                            return <Item
                                product={p}
                                onClick={() => {
                                    setSelectedProduct(p._id)
                                    setInputs(p)
                                }}
                            />
                        }
                    })
                }
            </div>


            <div style={{ paddingLeft: "30%" }}>

                <form //Edit Product
                    onSubmit={handleSubmit}
                    className="w3-theme-d3 w3-container"
                    style={{ width: "60%", padding: "25px", borderRadius: "25px" }}>

                    <h2 style={{ textAlign: "center" }}>{selectedProduct ? "Edit Product" : "New Product"}</h2>

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
                <form //Create Vendor
                    onSubmit={handleVendorSubmit}
                    className="w3-theme-d3 w3-container"
                    style={{ width: "60%", padding: "25px", borderRadius: "25px" }}>

                    <h2 style={{ textAlign: "center" }}>{selectedProduct ? "Edit Vendor" : "New Vendor"}</h2>

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
