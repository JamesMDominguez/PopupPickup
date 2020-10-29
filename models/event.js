const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
    name: {
        type: String
    },
    City: {
        type: String
    },
    eventCode: {
        type: Number
    },
    Vendors: {
        type: Array
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const Event = mongoose.model("events", eventSchema);