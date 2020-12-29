const mongoose = require("mongoose");
const { Schema } = mongoose;

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
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
        type: String,
        default: date,
    },
});

const LoadList = mongoose.model("loadList", loadListSchema);