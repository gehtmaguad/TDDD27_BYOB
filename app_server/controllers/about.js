/* GET about page */
module.exports.about = function(req, res) {
  res.render('about', {
    title: 'About',
    pageHeader: {
      title: 'About our service'
    },
    content: 'Description of service is missing at the moment ...'
  });
};
