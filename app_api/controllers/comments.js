var mongoose = require('mongoose');
var helper = require('./helper');
var Loc = mongoose.model('Location');

module.exports.create = function (req, res) {
  helper.sendJsonResponse(res, 200, {"status": "success"});
};
