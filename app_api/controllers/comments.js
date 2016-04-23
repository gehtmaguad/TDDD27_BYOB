var mongoose = require('mongoose');
var helper = require('./helper');
var location = mongoose.model('Location');

module.exports.create = function (req, res) {
  helper.sendJsonResponse(res, 200, {"status": "success"});
};

// GET comment by ID
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

// POST comment
module.exports.create = function(req, res) {
  // get location ID from params
  var locationId = req.params.locationid;
  if (!locationId) {
    helper.sendJsonResponse(res, 404, {
      "message": "required query parameters are longitude, latitude, maxElements, distance in meter"
    });
    return;
  }
  // Query location document and select all comments
  location.findById(locationId)
  .select('comments')
  .exec( function(err, doc) {
    if (err) {
      helper.sendJsonResponse(res, 400, err);
      return;
    }
    if (!doc) {
      helper.sendJsonResponse(res, 404, {
        "message": "no location document with id " + req.params.locationid
      });
      return;
    }
    //helper.sendJsonResponse(res, 201, doc);
    // Push a new comment object to the list of comments
    doc.comments.push({
      author: req.body.author,
      text: req.body.text
    });
    // save the updated location document
    doc.save(function(err, doc) {
      if (err) {
        helper.sendJsonResponse(res, 404, err);
        return;
      }
      // Return only the recently added comment, not the whole location doc
      var comment = doc.comments[doc.comments.length -1];
      helper.sendJsonResponse(res, 201, comment);
    });
  });
};
