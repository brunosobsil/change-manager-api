var express = require('express');
var router = express.Router();
var pool = require('../db/pool');

// GET 
router.get('/analistas', function(req, res) {

    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Erro ao conectar a base de dados"});
          return;
        }   
        
        connection.query("SELECT usuario,nome,email,perfil FROM ANALISTAS",function(err,rows){
            if(!err) {
                res.json(rows);
            }
            connection.release();
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Erro ao conectar a base de dados"});
              return;     
        });
    });
});

router.post('/analistas', function(req,res){

    pool.getConnection(function(err,connection){
        
        if (err) {
          res.json({"code" : 100, "status" : "Erro ao conectar a base de dados"});
          return;
        }
        
        var qry = "INSERT INTO ANALISTAS (usuario,senha,nome,email,perfil) VALUES ?";
        var values = [[
            req.body.usuario,
            req.body.senha,
            req.body.nome,
            req.body.email,
            req.body.perfil
        ]];
        
        connection.query(qry,[values],
            function(err,result){
                if(!err) {
                    res.json({'code': 201, 'status': 'Registro inserido'});
                }else{
                    res.json({'code': 500, 'status': 'Internal server error'});
                    console.log(err.sqlMessage);
                    console.log(err.sql);
                }
                connection.release();        
            }
        );        
        
        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Erro ao conectar a base de dados"});
              return;     
        });
    });

})

module.exports = router;