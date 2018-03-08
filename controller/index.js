var express = require('express');
var router  = express.Router();
var analistasController = require('./analistasController.js');

router.use(analistasController);

module.exports = router;