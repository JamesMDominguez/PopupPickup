// External Packages
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");

// DB config
const mongoURI = process.env.MONGODB_URI || "mongodb://localhost/may-challenge";

mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Models
require("./models/event");

// Middleware start
const app = express();
const db = mongoose.connection;
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

// Route Files
require("./routes/eventsRoutes")(app);

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