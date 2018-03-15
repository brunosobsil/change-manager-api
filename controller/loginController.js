var express = require('express');
var router  = express.Router();
var dao     = require('../dao/analistasDAO');
var jwt     = require('jsonwebtoken');
var bcrypt  = require('bcrypt');

router.post('/login', function(req,res){

    if(req.body.usuario && req.body.senha){

        var analista = req.body;
        dao.pegaAnalista(analista, function(rows){
            if(rows[0]){
                var analistaGravado = rows[0];                
                if(bcrypt.compareSync(analista.senha, analistaGravado.senha)){
                    analista = analistaGravado;
                    analista.senha = '******';
                    var payload = {usuario: analista.usuario};
                    var token = jwt.sign(payload, 'senhadeteste',{
                        expiresIn: '1h'
                    });
                    res.status(200).json({message: 'Autorizado', token: token, usuario: analista});
                }else{
                    res.status(401).json({message: 'Nao autorizado'});
                }
            }else{
                res.status(401).json({message: 'Nao autorizado'});
            }
        });

    }else{
        res.status(401).json({message: 'Nao autorizado'});
    }

});

module.exports = router;