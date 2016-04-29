// load mongoose module
var mongoose = require('mongoose');
// load helper module
var helper = require('./helper');

// access mongoose schema instance
var LocationModel = mongoose.model('Location');

// GET comment by ID
module.exports.read = function (req, res) {
  LocationModel
    // find location doucment by id
    .findById(req.params.locationid)
    // select _id and comments from the document and ignore other fields
    .select('_id comments')
    // execute query with callbacl function
    .exec(function(err, location) {
      // declare variables
      var comment;
      // check if a location document got returned from the query
      if (!location) {
        // if no location document got returned send 404 not found and return to caller
        helper.sendJsonResponse(res, 404, {
          "message": "no location with id " + req.params.locationid
        });
        return;
      // check for errors
      } else if (err) {
        // if there are errors send 400 bad request and return to caller
        helper.sendJsonResponse(res, 400, err);
        return;
      }
      // check if location has commennts in it
      if (location.comments && location.comments.length > 0) {
        // if the location has comments then try to find a comment by the given id
        comment = location.comments.id(req.params.commentid);
        // if no comment with that id found send 404 not found and return to caller
        if (!comment) {
          helper.sendJsonResponse(res, 404, {
            "message": "no comment with id " + req.params.commentid
          });
          return;
        }
        // if no errors, send the requested comment (subdocument)
        // and _id of the location (main document)
        // Respond with 200 OK
        helper.sendJsonResponse(res, 200, {
          location : {
            id : req.params.locationid
          },
          comment : comment
        });
      // if location document does not have subdocuments send 404 not found
      } else {
        helper.sendJsonResponse(res, 404, {
          "message": "location " + location.theme + " has no comments"
        });
      }
    });
};

// POST comment
module.exports.create = function(req, res) {
  // get location ID from params
  var locationId = req.params.locationid;
  // check if locationID variable evaluates to false
  if (!locationId) {
    // if locationId evaluates to false
    // send 404 not found and return to caller
    helper.sendJsonResponse(res, 404, {
      "message": "required parameter is locationID"
    });
    return;
  }

  LocationModel
    // find location document by id
    .findById(locationId)
    // select all comments from the document and ignore other fields
    .select('comments')
    // execute query with callback function
    .exec( function(err, doc) {
      // check if a location document got returned from the query
      if (!doc) {
        // if no location document got returned send 404 not found and return to caller
        helper.sendJsonResponse(res, 404, {
          "message": "no location with id " + req.params.locationid
        });
        return;
      // check for errors
      } else if (err) {
        // if there are errors send 400 bad request and return to caller
        helper.sendJsonResponse(res, 400, err);
        return;
      }
      // Push a new comment object to the list of comments in the location document
      doc.comments.push({
        author: req.body.author,
        text: req.body.text
      });
      // save the updated location document
      doc.save(function(err, doc) {
        // check for errors
        if (err) {
          // if there are errors send 400 bad request and return to caller
          helper.sendJsonResponse(res, 400, err);
          return;
        }
        // Return only the recently added comment, not the whole location doc
        // Respond with 201 Created
        var comment = doc.comments[doc.comments.length -1];
        helper.sendJsonResponse(res, 201, comment);
      });
    });
};

// PUT comment by ID
module.exports.update = function(req, res) {
  // declare variables
  var comment;
  // get location ID and comments ID from params
  var locationId = req.params.locationid;
  var commentId = req.params.commentid;
  // check if locationID or commentID variable evaluates to false
  if (!locationId || !commentId) {
    // if locationId evaluates to false
    // send 404 not found and return to caller
    helper.sendJsonResponse(res, 404, {
      "message": "required parameters are locationID and commentId"
    });
    return;
  }
  // query location document
  LocationModel
    // find location doucment by id
    .findById(locationId)
    // select all comments from the document and ignore other fields
    .select('comments')
    // execute query with callback function
    .exec( function(err, doc) {
      // check if a location document got returned from the query
      if (!doc) {
        // if no location document got returned send 404 not found and return to caller
        helper.sendJsonResponse(res, 404, {
          "message": "no location with id " + req.params.locationid
        });
        return;
      // check for errors
      } else if (err) {
        // if there are errors send 400 bad request and return to caller
        helper.sendJsonResponse(res, 400, err);
        return;
      }
      // Check if location has commennts in it
      if (doc.comments && doc.comments.length > 0) {
        // if the location has comments then try to find a comment by the given id
        comment = location.comments.id(req.params.commentid);
        // if no comment with that id found send 404 not found and return to caller
        if (!comment) {
          helper.sendJsonResponse(res, 404, {
            "message": "no comment with id " + req.params.commentid
          });
          return;
        }
        // parse form field from the request object and update comment
        comment.author = req.body.author;
        comment.text = req.body.text;
        // save the updated location document
        doc.save(function(err, doc) {
          // check for errors
          if (err) {
            // if there are errors send 400 bad request and return to caller
            helper.sendJsonResponse(res, 400, err);
            return;
          }
          // Return only the recently added comment, not the whole location doc
          // Respond with 200 Ok
          helper.sendJsonResponse(res, 200, comment);
        });
        // if location document does not have subdocuments send 404 not found
        } else {
          helper.sendJsonResponse(res, 404, {
            "message": "location " + location.theme + " has no comments"
          });
        }

    });
}

// DELETE comment by ID
module.exports.delete = function(req, res) {
  // declare variables
  var comment;
  // get location ID and comments ID from params
  var locationId = req.params.locationid;
  var commentId = req.params.commentid;
  // check if locationID or commentID variable evaluates to false
  if (!locationId || !commentId) {
    // if locationId evaluates to false
    // send 404 not found and return to caller
    helper.sendJsonResponse(res, 404, {
      "message": "required parameters are locationID and commentId"
    });
    return;
  }
  // query location document
  LocationModel
    // find location doucment by id
    .findById(locationId)
    // select all comments from the document and ignore other fields
    .select('comments')
    // execute query with callback function
    .exec( function(err, doc) {
      // check if a location document got returned from the query
      if (!doc) {
        // if no location document got returned send 404 not found and return to caller
        helper.sendJsonResponse(res, 404, {
          "message": "no location with id " + locationid
        });
        return;
      // check for errors
      } else if (err) {
        // if there are errors send 400 bad request and return to caller
        helper.sendJsonResponse(res, 400, err);
        return;
      }
      // Check if location has commennt with id in it
      // Check if location has commennts in it
      if (doc.comments && doc.comments.length > 0) {
        // if the location has comments then try to find a comment by the given id
        comment = location.comments.id(commentid);
        // if no comment with that id found send 404 not found and return to caller
        if (!comment) {
          helper.sendJsonResponse(res, 404, {
            "message": "no comment with id " + commentid
          });
          return;
        }
        // Remove comment from document
        doc.comments.id(commentId).remove();
        // save the updated location document
        doc.save(function(err, doc) {
          // check for errors
          if (err) {
            // if there are errors send 400 bad request and return to caller
            helper.sendJsonResponse(res, 400, err);
            return;
          }
          // Return only the recently added comment, not the whole location doc
          // Respond with 200 Ok
          helper.sendJsonResponse(res, 200, comment);
        });
      // if location document does not have subdocuments send 404 not found
      } else {
        helper.sendJsonResponse(res, 404, {
          "message": "location " + location.theme + " has no comments"
        });
      }
    });
}
