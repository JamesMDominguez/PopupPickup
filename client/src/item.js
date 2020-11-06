import React from "react"
import './App.css';

const Item = ({ productName, price, quantity,imgURL }) =>
    (
            <div className="item">
                <img src={imgURL}
                alt="Avatar" style={{width:"70%",height:"auto",borderRadius:"30px"}}/>
                <p>{productName}</p>
                <p>Price:${price}</p>
                <p>Qty:{quantity}</p>
            </div>

    )
export default Item;



