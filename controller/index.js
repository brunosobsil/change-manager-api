var express = require('express');
var router  = express.Router();
var analistasController = require('./analistasController.js');
var loginController = require('./loginController.js');

router.use(analistasController);
router.use(loginController);

module.exports = router;