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
    status:{
        type: String
    },
    cartVendor: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model("cart", cartSchema);