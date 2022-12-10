var mysql = require('mysql');

function insertar(connection,callback){
    
   var insertarQuery='INSERT INTO usuario (nombreUsuario,correoUsuario,nickUsuario,passwordUsuario) VALUES (?,?,?,?)';
   var query = mysql.format(insertarQuery,[nombre,correo,nick,password]);
   connection.query(query,function(err,result){
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
   });
    
    

connection.end();

}

module.exports = {insert};


