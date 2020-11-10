const mongoose = require("mongoose");
const { Schema } = mongoose;

const vendorSchema = new Schema({
    name: {
        type: String
    },
    items: {
        type: Array
    },
    date_created: {
        type: Date,
        default: Date.now,
    }
});

const Vendor = mongoose.model("vendors", vendorSchema);