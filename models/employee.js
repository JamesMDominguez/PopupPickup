const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
    employeeName: {
        type: String
    },
    vendor: {
        type: String
    },
});

const Employee = mongoose.model("employee", employeeSchema);