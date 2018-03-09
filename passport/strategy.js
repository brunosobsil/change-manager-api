var dao = require('../dao/analistasDAO');
var passportJWT = require('passport-jwt');
var ExtractJwt  = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJwt.fromHeader();
jwtOptions.secretOrKey = 'senhadeteste';

var strategy = new JwtStrategy(jwtOptions, function(analista, next){
    dao.pegaAnalista(analista,function(analista){
        if(analista){
            next(null, analista);
        }else{
            next(null,false);
        }
    })
});

module.exports = strategy;