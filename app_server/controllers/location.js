/* GET home page */
module.exports.homelist = function(req, res) {
  res.render('locations-list', { title: 'Home' });
};

/* GET locatoinInfo page */
module.exports.locationInfo = function(req, res) {
  res.render('index', { title: 'Location Info' });
};

/* GET addReview page */
module.exports.addReview = function(req, res) {
  res.render('index', { title: 'Add Review' });
};
