const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    cartName: {
        type: String
    },
    cartPrice:{
        type: Number
    },
    cartUser:{
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model("cart", cartSchema);