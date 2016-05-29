// load passport module
var passport = require('passport');
// load mongoose module
var mongoose = require('mongoose');
// load helper module
var helper = require('./helper');
// instanciate schema
var User = mongoose.model('User');

// register new user
module.exports.register = function(req, res) {
  // validate input fields
  if (!req.body.username || !req.body.email || !req.body.pwd) {
    helper.sendJsonResponse(res, 400, {
      "message": "Please fill out all fiedls"
    });
    return null;
  }

  // create new user object
  var user = new User();
  user.username = req.body.username;
  user.email = req.body.email;
  user.setPwd(req.body.pwd);

  // save new user object
  user.save(function(err) {
    var token;
    if (err) {
      // if error send 404 not found
      helper.sendJsonResponse(res, 404, err);
    } else {
      // if successful send a response with a json web token
      token = user.generateJWT();
      helper.sendJsonResponse(res, 200, {
        "token": token
      });
    }
  });
};

// login existing user
module.exports.login = function(req, res) {
  // validate input fields
  if (!req.body.email || !req.body.pwd) {
    helper.sendJsonResponse(res, 400, {
      "message": "Please fill out all fiedls"
    });
    return null;
  }

  // authenticate user using passport and local strategy
  passport.authenticate('local', function(err, user, info) {
    var token;
    if (err) {
      // if error send 404 not found
      helper.sendJsonResponse(res, 404, err);
    } else if (!user) {
      // if error send 401 not authorized
      helper.sendJsonResponse(res, 401, err);
    } else {
      // if successful send a response with a json web token
      token = user.generateJWT();
      helper.sendJsonResponse(res, 200, {
        "token": token
      });
    }
  })(req, res);
};
