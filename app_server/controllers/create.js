/* GET create preparty page */
module.exports.create = function(req, res) {
  res.render('create-form', { title: 'Create Preparty' });
};
