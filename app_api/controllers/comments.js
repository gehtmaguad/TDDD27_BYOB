var mongoose = require('mongoose');
var helper = require('./helper');
var location = mongoose.model('Location');

module.exports.create = function (req, res) {
  helper.sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.read = function (req, res) {
  location
    // Find location doucment by id
    .findById(req.params.locationid)
    // Just select the name of the document and all comments in it
    .select('theme comments')
    .exec(function(err, location) {
      var response, comment;
      // Check if location document got returned
      if (!location) {
        helper.sendJsonResponse(res, 404, {
          "message": "no location with id " + req.params.locationid
        });
        return;
      // Check for errors
      } else if (err) {
        helper.sendJsonResponse(res, 404, err);
        return;
      }
      // Check if location has commennts in it
      if (location.comments && location.comments.length > 0) {
        // Try to find a comment by id
        comment = location.comments.id(req.params.commentid);
        // if no comment with that id found return error
        if (!comment) {
          helper.sendJsonResponse(res, 404, {
            "message": "no comment with id " + req.params.commentid
          });
        } else {
          helper.sendJsonResponse(res, 200, {
            location : {
              theme : location.theme,
              id : req.params.locationid
            },
            comment : comment
          });
        }
      } else {
        helper.sendJsonResponse(res, 404, {
          "message": "location " + location.theme + "has no comments"
        })
      }

      helper.sendJsonResponse(res, 200, location);
    });
};
