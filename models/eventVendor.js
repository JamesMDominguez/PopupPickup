const mongoose = require("mongoose");
const { Schema } = mongoose;

const eVendor = new Schema({
    eventName: {
        type: String
    },
    vendorName:{
        type: String
    },
});

const EventsVendor = mongoose.model("eventsVendor", eVendor);