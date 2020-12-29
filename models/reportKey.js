const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportKeySchema = new Schema({
    market: {
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

const ReportKey = mongoose.model("reportKey", reportKeySchema);