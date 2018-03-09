var express = require('express');
var router = express.Router();
var dao = require('../dao/analistasDAO');

// GET 
router.get('/analistas', function(req, res) {

    var ret = dao.listarTodos(function(ret){
        res.json(ret);
    });

});

// POST
router.post('/analistas', function(req,res){

    var ret = dao.incluir(req.body,function(ret){
        res.json(ret);
    });

})

// PUT
router.put('/analistas', function(req,res){

    var ret = dao.alterar(req.body,function(ret){
        res.json(ret);
    });    

});

// DELETE

router.delete('/analistas', function(req,res){

    var ret = dao.excluir(req.body,function(ret){
        res.json(ret);
    });

});

module.exports = router;