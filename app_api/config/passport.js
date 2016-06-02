// load passport module
var passport = require('passport');
// load passport-local module
var LocalStrategy = require('passport-local').Strategy;
// load mongoose module
var mongoose = require('mongoose');
// instantiate schema
var User = mongoose.model('User');

// configure passport with local stategy
passport.use(
  new LocalStrategy({
    // use email and pwd as keys from post requests
    // instead of username and password as key
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function(username, password, done) {
    // find user by email, which acts as a unique key
    User.findOne({ email: username }, function(err, user) {
      // in case of error return the error
      if (err) {
        return done(err);
      // if no user is found return error message
      } else if (!user) {
        return done(null, false, {
          message: 'Wrong username'
        });
      // if the password does not match return error message
      } else if (!user.validatePwd(password)) {
        return done(null, false, {
          message: 'Wrong password'
        });
      // if successful return user object
      } else {
        return done(null, user);
      }
    });
  }
));
