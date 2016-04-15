var express = require('express');
var router = express.Router();

/* Specify controllers */
var ctrlLocation = require('../controllers/location');
var ctrlAbout = require('../controllers/about');

/* GET location pages */
router.get('/', ctrlLocation.homelist);
router.get('/location', ctrlLocation.locationInfo);
router.get('/location/review/new', ctrlLocation.addReview);

/* GET about page */
router.get('/about', ctrlAbout.about);

module.exports = router;
