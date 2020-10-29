const mongoose = require("mongoose");
const { Schema } = mongoose;

const customerSchema = new Schema({
    name: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const Customer = mongoose.model("customer", customerSchema);