var pool = require('../db/pool');
var bcrypt = require('bcrypt');

module.exports.listarTodos = function(callBack){
    
    pool.getConnection(function(err,connection){

        if (err) {          
            callBack({message:"Erro ao conectar a base de dados"});            
        }           

        connection.query("SELECT usuario,nome,email,perfil FROM ANALISTAS",function(err,rows){
            if(!err) {    
                callBack(rows);                
            }
            connection.release();
        });

        connection.on('error', function(err) {
            callBack({message:"Erro ao conectar a base de dados"});            
        });
    });
}

module.exports.pegaAnalista = function(analista,callBack){
    
    pool.getConnection(function(err,connection){

        if (err) {          
            callBack({message:"Erro ao conectar a base de dados"});            
        }           

        connection.query("SELECT usuario,senha,nome,email,perfil FROM ANALISTAS WHERE usuario = ?", [analista.usuario],
            function(err,row){
                if(!err) {    
                    callBack(row);                
                }
                connection.release();
            }
        );

        connection.on('error', function(err) {
            callBack({message:"Erro ao conectar a base de dados"});            
        });
    });
}

module.exports.incluir = function(analista,callBack){

    pool.getConnection(function(err,connection){
        
        if (err) {
            callBack({message:"Erro ao conectar a base de dados"});            
        }

        var hash = bcrypt.hashSync(analista.senha,10);
        
        var qry = "INSERT INTO ANALISTAS (usuario,senha,nome,email,perfil) VALUES ?";
        var values = [[
            analista.usuario,
            hash,
            analista.nome,
            analista.email,
            analista.perfil
        ]];
        
        connection.query(qry,[values],
            function(err,result){
                if(!err) {
                    callBack({message:"Registro inserido"});                    
                }else{
                    callBack({message:"Erro ao conectar a base de dados"});
                    console.log(err.sqlMessage);
                    console.log(err.sql);                    
                }
                connection.release();        
            }
        );        
        
        connection.on('error', function(err) {      
            callBack({message:"Erro ao conectar a base de dados"});            
        });
    });

}

module.exports.alterar = function(analista,callBack){

    pool.getConnection(function(err,connection){
        
        if (err) {
           callBack({message:"Erro ao conectar a base de dados"});
        }

        var hash = bcrypt.hashSync(analista.senha,10);
        
        var qry = "UPDATE ANALISTAS SET senha = ?, nome = ?, email = ?, perfil = ? WHERE usuario = ?";
        var values = [            
                hash,                        
                analista.nome,   
                analista.email,   
                analista.perfil,
                analista.usuario
        ];
        
        connection.query(qry,values,
            function(err,result){
                if(!err) {
                    callBack({message:"Registro alterado"});
                }else{
                    callBack({message:"Erro interno do servidor"});
                    console.log(err.sqlMessage);
                    console.log(err.sql);
                }
                connection.release();        
            }
        );        
        
        connection.on('error', function(err) {      
            callBack({message:"Erro ao conectar a base de dados"});
        });
    });

}

module.exports.excluir = function(analista,callBack){

    pool.getConnection(function(err,connection){
        
        if (err) {
           callBack({message:"Erro ao conectar a base de dados"});
        }
        
        var qry = "DELETE FROM ANALISTAS WHERE usuario = ?";
        var values = [                            
            analista.usuario
        ];
        
        connection.query(qry,values,
            function(err,result){
                if(!err) {
                    callBack({message:"Registro excluido"});
                }else{
                    callBack({message:"Erro interno do servidor"});
                    console.log(err.sqlMessage);
                    console.log(err.sql);
                }
                connection.release();        
            }
        );        
        
        connection.on('error', function(err) {      
            callBack({message:"Erro ao conectar a base de dados"});
        });
    });
}