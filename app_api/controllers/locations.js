var mongoose = require('mongoose');
var helper = require('./helper');
var location = mongoose.model('Location');

module.exports.create = function (req, res) {
  helper.sendJsonResponse(res, 200, {"status": "success"});
};

module.exports.read = function (req, res) {
  location
    .findById(req.params.locationid)
    .exec(function(err, location) {
      if (!location) {
        helper.sendJsonResponse(res, 404, {
          "message": "no location with id " + req.params.locationid
        });
        return;
      } else if (err) {
        helper.sendJsonResponse(res, 404, err);
        return;
      }
      helper.sendJsonResponse(res, 200, location);
    });
};

// url template:http://localhost:3000/api/locations?
// longitude=-0.8690884&latitude=51.455041&distance=10000&maxElements=10
module.exports.listByDistance = function(req, res) {
  // Get parameters from url
  var longitude = parseFloat(req.query.longitude);
  var latitude = parseFloat(req.query.latitude);
  var maxElements = parseInt(req.query.maxElements);
  var distance = parseInt(req.query.distance);
  // Check if parameters are null
  if (!longitude || !latitude || !maxElements || !distance) {
    helper.sendJsonResponse(res, 404, {
      "message": "required query parameters are longitude, latitude, maxElements, distance in meter"
    });
    return;
  }
  // Create point object
  var point = {
    type: "Point",
    coordinates: [longitude, latitude]
  };
  // Create options object
  var options = {
    spherical: true,
    maxDistance: distance,
    num: maxElements
  };
  // Execute geoNear Query
  location.geoNear(point, options, function(err, result, stats) {
    var locations = [];
    // Check for errors
    if (err) {
      helper.sendJsonResponse(res, 404, err);
    }
    // Loop through results and parse each result
    result.forEach(function(element) {
      locations.push({
        _id: element.obj._id,
        theme: element.obj.theme,
        address: element.obj.address,
        datum: element.obj.datum,
        coords: element.obj.coords,
        comments: element.obj.comments,
        participants: element.obj.participants,
        required: element.obj.required,
        provided: element.obj.provided,
        distance: element.dis,
        createdOn: element.obj.createdOn
      });
    });
    helper.sendJsonResponse(res, 200, locations);
  });
};
