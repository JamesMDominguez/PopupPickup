const mongoose = require("mongoose");
const { Schema } = mongoose;

const vendorSchema = new Schema({
    name: {
        type: String
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model("products", vendorSchema);