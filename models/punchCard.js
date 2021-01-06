const mongoose = require("mongoose");
const { Schema } = mongoose;

const punchCardSchema = new Schema({
    Clockin: {
        type: String
    },
    ClockOut: {
        type: String
    },
    name: {
        type: String
    },
    vendor: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const PunchCard = mongoose.model("punchCards", punchCardSchema);