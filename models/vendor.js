const mongoose = require("mongoose");
const { Schema } = mongoose;

const vendorSchema = new Schema({
    name: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    }
});

const Vendor = mongoose.model("vendors", vendorSchema);