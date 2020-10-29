import React from "react"


function Card(props) {
    return (
    <div className="w3-card-4" style={{width:"15%"}}>
        <img src={props.imgURL} alt="Alps" style={{width:"100%"}}/>
        <div className="w3-container">
          <p>{props.cardText}</p>
        </div>
    </div>
    );
  }
  export default Card
