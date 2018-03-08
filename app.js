var express     = require("express");
var mysql       = require('mysql');
var app         = express();
var controllers = require('./controller/index.js');
var bodyParser  = require('body-parser');

app.use(bodyParser.json());
app.use(controllers);

app.listen(3000);