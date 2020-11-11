const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
    eventName: {
        type: String
    },
    longitude: {
        type: Number
    },
    latitude: {
        type: Number
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const Event = mongoose.model("events", eventSchema);