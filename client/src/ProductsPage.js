import React, { useEffect, useState } from "react"
import './App.css';
import axios from "axios";
import { useAuthState } from './AuthProvider'

const defaultValues = {
    name: "",
    price: "",
    quantity: "",
    vendor: "",
    url: ""
}

const defaultValuesCart = {
    cartName: '',
    cartPrice: 0,
    cartUser: '',
    status: ''
}

const ProductsPage = () => {

    const { user } = useAuthState()
    const [products, setProducts] = useState([])
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [inputs, setInputs] = useState(defaultValues)

    const [cart, setCart] = useState([])
    const [inputsCart, setInputsCart] = useState(defaultValuesCart)

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
                <img style={{ width: "80%", borderRadius: "25px", paddingTop: "10px" }} src={product.url} alt="Untitled-Artwork" border="0" />
                <p>{product.name} ${product.price}</p>
            </div>
        )

    const getCart = async () => {
        const res = await axios.get("/api/cart")
        setCart(res.data)
    }

    const getProducts = async () => {
        const res = await axios.get("/api/products")
        setProducts(res.data)
    }

    const handleDelete = async (productId, event) => {
        const res = await axios.delete(`/api/products/${productId}`)
        setProducts(res.data)
    }

    const acceptCart = async (p) => {
        const res = await axios.put(`/api/cart/${p._id}`, { status: "Accepted", cartUser: p.cartUser, cartPrice: p.cartPrice, cartName: p.cartName })
        setCart(res.data)
    }

    const declineCart = async (p) => {
        const res = await axios.put(`/api/cart/${p._id}`, { status: "Denied", cartUser: p.cartUser, cartPrice: p.cartPrice, cartName: p.cartName })
        setCart(res.data)
    }

    const handleSubmit = async (event) => {
        event.stopPropagation()
        event.preventDefault()
        if (selectedProduct) {
            const res = await axios.put(`/api/products/${selectedProduct}`, inputs)
            setProducts(res.data)
        }
        else {
            const res = await axios.post("/api/products", inputs)
            setProducts(res.data)
        }
        setInputs(defaultValues)
        setSelectedProduct(null)
    }

    useEffect(() => { getProducts() }, [])
    useEffect(() => { getCart() }, [])

    return (
        <div>

            <img style={{ width: "100%" }} src="https://i.postimg.cc/kgx8Wcsg/IMG-0735.jpg" alt="Untitled-Artwork" border="0" />

            <h1 style={{ textAlign: "center", textDecoration: "underline" }}>Inventory</h1>

            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%" }}>
                <div className="container">
                    {
                        products.map(p => {
                            if (p.vendor === (user ? user.username : " ")) {
                                return <Item
                                    product={p}
                                    key={p._id}
                                    onClick={() => {
                                        setSelectedProduct(p._id)
                                        setInputs(p)
                                    }}
                                />
                            }
                        })
                    }
                </div>
            </div>


            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "3%" }}>

                <form //Edit Product
                    onSubmit={handleSubmit}
                >

                    <h2 style={{ textAlign: "center" }}>{selectedProduct ? "Edit Product" : "New Product"}</h2>

                    <br />

                    <input
                        type="text"
                        placeholder="Name"
                        value={inputs.name}
                        onChange={e => setInputs({ ...inputs, name: e.target.value, vendor: (user ? user.username : " ") })}
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
                        type="text"
                        placeholder="Img Url"
                        value={inputs.url}
                        onChange={e => setInputs({ ...inputs, url: e.target.value })}
                        className="w3-input"
                        style={{ borderRadius: "25px" }}
                    />

                    <br />

                    <input
                        type="submit"
                        value="Submit"
                        className="w3-btn"
                        style={{ borderRadius: "25px", width: "100%", backgroundColor: "#AC3C40" }}
                    />
                </form>
            </div>

            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%" }}>
                <h2 style={{ textAlign: "center" }}>Requests</h2>
                <div className="container">
                    {
                        cart.map(p => {
                            if ((p.cartUser === (user ? user.username : " ")) && (p.status === "pending...")) {
                                return (
                                    <div className="item" key={p._id}>
                                        <p>{p.cartName}</p>
                                        <div style={{ marginBottom: "5%" }}>
                                            <div
                                                onClick={() => {
                                                    const shouldAdd = window.confirm('Confirm Accept')
                                                    if (shouldAdd) {
                                                        acceptCart(p)
                                                    }
                                                }}
                                                style={{ display: "inline", backgroundColor: "Green", borderRadius: "25px", padding: "15px", margin: "5px" }}>Accept</div>

                                            <div
                                                onClick={() => {
                                                    const shouldAdd = window.confirm('Confirm Decline')
                                                        if (shouldAdd) {
                                                            declineCart(p)
                                                        }
                                                }}
                                                style={{ display: "inline", backgroundColor: "Red", borderRadius: "25px", padding: "15px", margin: "5px" }}>Decline</div>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>

            <div className="item" style={{ backgroundColor: "rgba(0,0,50,0.1)", margin: "5%" }}>
                <h2 style={{ textAlign: "center" }}>Orders</h2>
                <div className="container">
                    {
                        cart.map(p => {
                            if ((p.cartUser === (user ? user.username : " ")) && (p.status === "Accepted")) {
                                return (
                                    <div className="item" key={p._id}>
                                        <p>{p.cartName}</p>
                                        <div style={{ marginBottom: "5%" }}>
                                        </div>
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>

        </div>
    )
}


export default ProductsPage;
