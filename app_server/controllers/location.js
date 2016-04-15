/* GET home page */
module.exports.homelist = function(req, res) {
  res.render('locations-list', { title: 'Home' });
};

/* GET locatoinInfo page */
module.exports.locationInfo = function(req, res) {
  res.render('location-info', { title: 'Location Info' });
};

/* GET addComment page */
module.exports.addComment = function(req, res) {
  res.render('location-comment-form', { title: 'Add Comment' });
};

/* GET join page */
module.exports.join = function(req, res) {
  res.render('location-join-form', { title: 'Join' });
};
