const mongoose = require("mongoose");
const { Schema } = mongoose;

var today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
const reportKeySchema = new Schema({
    market: {
        type: String
    },
    vendor: {
        type: String
    },
    date_created: {
        type: String,
        default: date,
    },
});

const ReportKey = mongoose.model("reportKey", reportKeySchema);