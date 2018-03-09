var express     = require("express");
var mysql       = require('mysql');
var app         = express();
var controllers = require('./controller/index');
var bodyParser  = require('body-parser');
var passport    = require('passport');
var strategy    = require('./passport/strategy');;

app.use(bodyParser.json());
app.use(controllers);

passport.use(strategy);
app.use(passport.initialize());

app.listen(3001, function(){
    console.log('Rest API Started on port 3001...')
});