import React from "react"
import './App.css';

const Item = ({ vendor, productName, price, quantity }) =>
    (
        <div>
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "25% 25% 25% 25%",
                    width: "80%",
                    backgroundColor: "rgb(36 121 125)",
                    borderRadius: "25px",
                    paddingLeft: "2%",
                    marginLeft: "10%"

                }}>
                <p>{vendor}</p>
                <p>{productName}</p>
                <p>${price}</p>
                <p>{quantity}</p>

            </div>
            <br />
        </div>
    )
export default Item;