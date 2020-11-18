const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    userName: {
        type: String
    },
    userType: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    }
});
const User = mongoose.model("users", userSchema);