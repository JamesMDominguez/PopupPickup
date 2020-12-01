// External Packages
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const passport = require("passport");
require('dotenv').config()

// DB config
const { MONGO_URI } = process.env;
mongoose.connect(MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

// Models
require("./models/event");
require("./models/product");
require("./models/vendor");
require("./models/customer");
require("./models/user");

// Middleware start
const app = express();
const db = mongoose.connection;
app.use(bodyParser.json());

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(
	cookieSession({
		maxAge: 10800000, // 1 day
		keys: [process.env.COOKIE_KEY]
	})
);
app.use(passport.initialize());
app.use(passport.session());

// Route Files
require("./routes/eventsRoutes")(app);
require("./routes/vendorRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/productsRoutes")(app);
require("./routes/authRoutes")(app);

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