var express = require('express');
var router = express.Router();

/* specify controllers */
var ctrlLocation = require('../controllers/location');
var ctrlAbout = require('../controllers/about');
var ctrlInit = require('../controllers/init');

/* get html layout */
//router.get('/', ctrlInit.angularApp);

/* TODO: Delete Urls once angular routing if fully implemented */
/* GET location pages */
//router.get('/', ctrlLocation.homelist);
//router.get('/location/:locationid', ctrlLocation.locationInfo);
//router.get('/location/:locationid/comment/new', ctrlLocation.createComment);
//router.get('/locationcreate', ctrlLocation.createLocation);

/* POST location pages */
//router.post('/location/:locationid/comment/new', ctrlLocation.sendComment);
//router.post('/locationcreate', ctrlLocation.sendLocation);

/* GET about page */
//router.get('/about', ctrlAbout.about);

module.exports = router;
