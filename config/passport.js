// require passport-local for local strategy
const localStrategy = require("passport-local");
const mongoose = require("mongoose");

// require user schema for authentication
const User = mongoose.model("User");

module.exports = function (passport) {
  passport.use(
    new localStrategy.Strategy(
      { usernameField: "email", passReqToCallback: true },
      (req, email, password, done) => {
        console.log(email);
        // check for already existed user
        User.findOne({ email: email })
          .then((user) => {
            if (!user) {
              return done(null, false, { message: "Incorrect Username" });
            }
            if (!user.authenticate(password)) {
              return done(null, false, { message: "Incorrect Password" });
            }
            return done(null, user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    )
  );
  // serialize the user._id in session cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  // desiarile the user on subsequent calls
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
