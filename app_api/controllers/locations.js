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
