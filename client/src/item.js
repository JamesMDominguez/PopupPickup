import React from "react"
import './App.css';

const Item = ({ productName, price, quantity }) =>
    (
            <div className="item">
                <p>{productName}</p>
                <p>Price:${price}</p>
                <p>Qty:{quantity}</p>
            </div>

    )
export default Item;



