const passport = require("passport");
const mongoose = require("mongoose")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = mongoose.model("users")

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        //check if user already exists in our db with the given profile ID
        User.findOne({googleId: profile.id}).then((currentUser)=>{
          if(currentUser){
            //if we already have a record with the given profile ID
            done(null, currentUser);
          } else{
               //if not, create a new user 
              new User({
                googleId: profile.id,
              }).save().then((newUser) =>{
                done(null, newUser);
              });
           } 
        })
      })
  );

module.exports = (app) => {
  app.get("/api/auth/google", async (req, res) => {
    console.log('HIT')
     passport.authenticate("google", {
    scope: ["profile", "email"]
      })
  });

    app.get("/auth/google/redirect",passport.authenticate('google'),(req,res)=>{
      res.send(req.user);
      res.send("you reached the redirect URI");
    });

    app.get("/auth/logout", (req, res) => {
      req.logout();
      res.send(req.user);
    });
}