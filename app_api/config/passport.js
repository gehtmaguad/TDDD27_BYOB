var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(
  new LocalStrategy({
    // use email and pwd as keys from post requests
    // instead of username and password as key
    usernameField: 'email',
    passwordField: 'pwd'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
      if (err) {
        return done(err);
      } else if (!user) {
        return done(null, false, {
          message: 'Wrong username'
        });
      } else if (!user.validatePwd(password)) {
        return done(null, false, {
          message: 'Wrong password'
        });
      } else {
        return done(null, user);
      }
    });
  }
));
