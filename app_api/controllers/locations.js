// load mongoose module
var mongoose = require('mongoose');
// load helper module
var helper = require('./helper');

// access mongoose schema instance
var LocationModel = mongoose.model('Location');
var User = mongoose.model('User');

// GET location by ID
module.exports.read = function (req, res) {
  LocationModel
    // find location document by id
    .findById(req.params.locationid)
    // execute query with callback function
    .exec(function(err, location) {
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
      // send location document and 200 Ok
      helper.sendJsonResponse(res, 200, location);
    });
};

// GET location list sorted by distance
module.exports.listByDistance = function(req, res) {

  // Get parameters from url
  var longitude = parseFloat(req.query.longitude);
  var latitude = parseFloat(req.query.latitude);
  var maxElements = parseInt(req.query.maxElements);
  var distance = parseInt(req.query.distance);
  // Check if parameters are null
  if (!longitude && longitude !==0 || !latitude && latitude !==0 || !maxElements || !distance) {
    // if there are parameters with null, send 400 bad request and return to caller
    helper.sendJsonResponse(res, 404, {
      "message": "required query parameters are longitude, latitude, maxElements, distance in meter"
    });
    return;
  }

  // create a point object for querying by distance
  var point = {
    type: "Point",
    coordinates: [longitude, latitude]
  };
  // create options object for parameterizing the query
  var options = {
    spherical: true,
    maxDistance: distance,
    num: maxElements
  };

  // execute geoNear Query
  LocationModel.geoNear(point, options, function(err, result, stats) {
    var locations = [];
    // Check for errors
    if (err) {
      helper.sendJsonResponse(res, 404, err);
      return;
    }
    // Loop through results, parse each result and push to locations array
    result.forEach(function(element) {
      locations.push({
        _id: element.obj._id,
        author: element.obj.author,
        theme: element.obj.theme,
        address: element.obj.address,
        datum: element.obj.datum,
        participants: element.obj.participants,
        required: element.obj.required,
        provided: element.obj.provided,
        distance: element.dis,
        createdOn: element.obj.createdOn,
        afterwards: element.obj.afterwards
      });
    });

    // Respond with res, locations array and 200 Ok
    helper.sendJsonResponse(res, 200, locations);
  });
};

// POST location
module.exports.create = function(req, res) {
  // create comment is wrapped in getAuthor as a callback
  // in order to use username variable
  helper.getAuthor(req, res, function(req, res, username) {
    var geocoderProvider = 'google';
    var httpAdapter = 'https';
    // optional
    var extra = {
        apiKey: process.env.API_KEY,
        formatter: null
    };
    var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

    geocoder.geocode(req.body.address, function(err, resi) {
      if (resi[0]) {
        // create new document
        LocationModel.create({
          // id is autogenerated
          // createdOn is autogenerated
          // get fields by parsing request
          author: username,
          theme: req.body.theme,
          address: req.body.address,
          datum: req.body.datum,
          coords: [parseFloat(resi[0].longitude),
            parseFloat(resi[0].latitude)],
          participants: req.body.participants,
          required: req.body.required,
          provided: req.body.provided,
          afterwards: req.body.afterwards
        }, function(error, location) {
          // check for errors
          if (error) {
            // if there are errors send 400 bad request and return to caller
            helper.sendJsonResponse(res, 400, error);
            return;
          }
          // Respond with created document and status code 201 Created
          helper.sendJsonResponse(res, 201, location);
        });
      } else {
        helper.sendJsonResponse(res, 400, err);
      }
    });
  });
};

// PUT location by ID
module.exports.update = function (req, res) {
  helper.getAuthor(req, res, function(req, res, username) {
    var geocoderProvider = 'google';
    var httpAdapter = 'https';
    // optional
    var extra = {
        apiKey: process.env.API_KEY,
        formatter: null
    };
    var geocoder = require('node-geocoder')(geocoderProvider, httpAdapter, extra);

    geocoder.geocode(req.body.address, function(err, resi) {
      LocationModel
        .findById(req.params.locationid)
        // Exclude comments as they are updated seperately in commentsController
        .select('-comments')
        // execute query with callback function
        .exec(function(err, doc) {
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
          doc.author = username;
          doc.theme = req.body.theme;
          doc.address = req.body.address;
          doc.datum = req.body.datum;
          doc.coords = [parseFloat(resi[0].longitude),
            parseFloat(resi[0].latitude)];
          doc.participants = req.body.participants;
          doc.required = req.body.required;
          doc.provided = req.body.provided;
          doc.afterwards = req.body.afterwards;

          // save the updated location document
          doc.save(function(err, doc) {
            // check for errors
            if (err) {
              // if there are errors send 400 bad request and return to caller
              helper.sendJsonResponse(res, 404, err);
              return;
            }
            // Respond with updated document and status code 201 Created
            helper.sendJsonResponse(res, 201, doc);
          });
        });
    });
  });
};

// DELETE location by ID
module.exports.delete = function(req, res) {
  LocationModel
    // find location document by id and remove it
    .findByIdAndRemove(req.params.locationid)
    // execute query with callback function
    .exec(function(err, location) {
      // check for errors
      if (err) {
        // if there are errors send 400 bad request and return to caller
        helper.sendJsonResponse(res, 400, err);
        return;
      }
      // Respond with 200 Ok
      helper.sendJsonResponse(res, 200, location);
    });
};
