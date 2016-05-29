var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

// Include controllers
var ctrlLocations = require('../controllers/locations');
var ctrlComments = require('../controllers/comments');
var ctrlAuth = require('../controllers/auth');

// location routes
router.get('/locations', ctrlLocations.listByDistance);
router.post('/locations', auth, ctrlLocations.create);
router.get('/locations/:locationid', ctrlLocations.read);
router.put('/locations/:locationid', auth, ctrlLocations.update);
router.delete('/locations/:locationid', auth, ctrlLocations.delete);

// comments routes
router.post('/locations/:locationid/comments', auth, ctrlComments.create);
router.get('/locations/:locationid/comments/:commentid', ctrlComments.read);
router.put('/locations/:locationid/comments/:commentid', auth, ctrlComments.update);
router.delete('/locations/:locationid/comments/:commentid', auth, ctrlComments.delete);

// auth routes
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
