const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const config = require("config");
const idC = config.get("idClient");
const seC = config.get("secClient");
const mongoose = require("mongoose");
const User = require("../models/Users");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: idC,
        clientSecret: seC,
        callbackURL:
          "https://gentle-castle-34317.herokuapp.com/api/auth/google/redirect",
      },
      (accessToken, refreshToken, profile, done) => {
        User.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            //if the user already exists
            done(null, currentUser);
          } else {
            new User({
              googleId: profile.id,
              name: profile.given_name,
              profile_photo: profile.picture,
              email: profile.email,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
              });
          }
        });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    }).select("-date -googleId -email");
  });
};
