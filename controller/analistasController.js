var express = require('express');
var router = express.Router();
var dao = require('../dao/analistasDAO');
var passport = require('passport');

// GET 
router.get('/analistas', passport.authenticate('jwt',{ session: false}), function(req, res) {

    var ret = dao.listarTodos(function(ret){
        res.json(ret);
    });

});

// POST
router.post('/analistas', passport.authenticate('jwt',{ session: false}), function(req, res) {

    var ret = dao.incluir(req.body,function(ret){
        res.json(ret);
    });

})

// PUT
router.put('/analistas', passport.authenticate('jwt',{ session: false}), function(req, res) {

    var ret = dao.alterar(req.body,function(ret){
        res.json(ret);
    });    

});

// DELETE
router.delete('/analistas', passport.authenticate('jwt',{ session: false}), function(req, res) {

    var ret = dao.excluir(req.body,function(ret){
        res.json(ret);
    });

});

module.exports = router;