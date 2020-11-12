import React, { useEffect, useState } from "react"
import Item from "./item"
import './App.css';
import axios from "axios";

const defaultValues = {
    name: "",
    price: "",
    quantity: "",
    imgURL:""
}

const ProductsPage = () => {
    const [products, setProducts] = useState([])
    const [inputs, setInputs] = useState(defaultValues)

    const getProducts = async () => {
        const res = await axios.get("/api/vendors/jsm")
        setProducts(res.data)
    }

    const handleSubmit = async (event) => {
        event.stopPropagation()
        event.preventDefault()

        const res = await axios.post("/api/vendors/jsm", inputs)
        setProducts(res.data)
        setInputs(defaultValues)
    }

    useEffect(() => { getProducts() }, [])

    return (
        <div>
            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Vendor Inventory</h1>

            <div className="container">
                {products.map(p => (
                    <Item
                        imgURL={p.imgURL}
                        productName={p.name}
                        price={p.price}
                        quantity={p.quantity}
                    />
                ))}
            </div>
            <div style={{ paddingLeft: "30%" }}>
                <form //login
                    onSubmit={handleSubmit}
                    className="w3-theme-d3 w3-container"
                    style={{ width: "60%", padding: "25px", borderRadius: "25px" }}>


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

        </div>
    )
}


export default ProductsPage;
