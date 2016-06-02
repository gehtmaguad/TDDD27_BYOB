// load mongoose module
var mongoose = require('mongoose');
// access mongoose schema instance
var User = mongoose.model('User');

// expose sendJsonResponse directly
module.exports = {
  sendJsonResponse: function(res, status, content) {
    // set status of response object
    res.status(status);
    // set json content of response object
    res.json(content);
  }, getAuthor : function(req, res, callback) {
    // validate payload
    if (!req.payload || !req.payload.email) {
      helper.sendJsonResponse(res, 401, {"message": "no user found"});
    }
    // find user by given email
    User.findOne({email:req.payload.email})
      .exec(function(err, user) {
        if (err) {
          // if error send 404 not found
          helper.sendJsonResponse(res, 404, err);
          return;
        } else if (!user) {
          // if error send 401 not authorized
          helper.sendJsonResponse(res, 401, {"message": "no user found"});
        } else {
          // if successful execute callback
          callback(req, res, user.username);
        }
    });
  }
};
