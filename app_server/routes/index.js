var express = require('express');
var router = express.Router();

/* Specify controllers */
var ctrlLocation = require('../controllers/location');
var ctrlCreate = require('../controllers/create');
var ctrlAbout = require('../controllers/about');

/* GET location pages */
router.get('/', ctrlLocation.homelist);
router.get('/location/:locationid', ctrlLocation.locationInfo);
router.get('/location/:locationid/comment/new', ctrlLocation.createComment);
router.get('/location/join/new', ctrlLocation.join);

/* POST location pages */
router.post('/location/:locationid/comment/new', ctrlLocation.sendComment);

/* Get create page */
router.get('/create', ctrlCreate.create);

/* GET about page */
router.get('/about', ctrlAbout.about);

module.exports = router;
