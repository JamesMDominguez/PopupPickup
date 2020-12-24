const mongoose = require("mongoose");
const { Schema } = mongoose;

const loadListSchema = new Schema({
    market: {
        type: String
    },
    loadListName: {
        type: Array
    },
    loadListVendor: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const LoadList = mongoose.model("loadList", loadListSchema);