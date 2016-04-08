var express = require('express');
var ctrlMain = require('../controllers/main');
var router = express.Router();

router.get('/', ctrlMain.index);

module.exports = router;
