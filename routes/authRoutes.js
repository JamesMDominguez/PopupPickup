const passport = require("passport");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Users = mongoose.model("users");

const saltRounds = 10;

LocalStrategy = require("passport-local").Strategy;

// called by passport.authenticate
passport.use(
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        // user not found, bad username
        return done(null, false);
      }

      // check password against stored hash
      bcrypt.compare(password, user.passHash, (err, res) => {
        if (res !== true) {
          // password did not match
          return done(null, false);
        }

        // password did match
        return done(null, user);
      });
    });
  })
);

passport.serializeUser((user, next) => {
  next(null, user._id);
});

passport.deserializeUser((id, next) => {
  Users.findById(id, (err, user) => {
    next(err, user);
  });
});

module.exports = (app) => {
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    const { _id, username, userType } = req.user;

    res.status(200).send(JSON.stringify({ _id, username, userType }));
  });

  app.post("/api/signup", async (req, res, next) => {
    const { username, password, userType } = req.body;
    const user = await Users.findOne({ username });

    if (user) {
      // dont create new user if username taken
      return res.status(401).send("User Exists");
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      const user = Users.create({ username, passHash: hash, userType });
      return res.status(200).send({ username, userType, _id: user.id });
    });
  });

  app.get('/api/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
};
