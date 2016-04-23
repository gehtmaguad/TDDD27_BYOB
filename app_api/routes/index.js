var express = require('express');
var router = express.Router();

// Include controllers
var ctrlLocations = require('../controllers/locations');
var ctrlComments = require('../controllers/comments');

// location routes
router.get('/locations', ctrlLocations.listByDistance);
router.post('/locations', ctrlLocations.create);
router.get('/locations/:locationid', ctrlLocations.read);
router.put('/locations/:locationid', ctrlLocations.update);
router.delete('/locations/:locationid', ctrlLocations.delete);

// comments routes
router.post('/locations/:locationid/comments', ctrlComments.create);
router.get('/locations/:locationid/comments/:commentid', ctrlComments.read);
router.put('/locations/:locationid/comments/:commentid', ctrlComments.update);
router.delete('/locations/:locationid/comments/:commentid', ctrlComments.delete);

module.exports = router;
