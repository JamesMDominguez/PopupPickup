const mongoose = require("mongoose");
const { Schema } = mongoose;

const loadListSchema = new Schema({
    market: {
        type: String
    },
    name: {
        type: String
    },
    price: {
        type: String
    },
    vendor: {
        type: String
    },
    quantity:{
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const LoadList = mongoose.model("loadList", loadListSchema);