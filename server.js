// External Packages
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");

// DB config
//const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/PopupPickup";
const mongoURI = 'mongodb+srv://JamesDominguez:dominguez@cluster0.y2ep1.mongodb.net/app_users?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Models
require("./models/event");
require("./models/product");
require("./models/vendor");
require("./models/customer");

// Middleware start
const app = express();
const db = mongoose.connection;
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Route Files
require("./routes/eventsRoutes")(app);
require("./routes/vendorRoutes")(app);

if (process.env.NODE_ENV === "production") {
  // express will serve production assets (main.js/css)
  app.use(express.static("client/build"));

  // express will serve index.html if unrec. route
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server listening on 5000");
});