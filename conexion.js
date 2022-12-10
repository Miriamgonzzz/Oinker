var mysql = require('mysql');

var conexion= mysql.createConnection({
    host : 'localhost:3306',
    database : 'oinker',
    user : 'root',
    password : '',
});

function conectarse(){
    
    conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
    });

    conexion.query('SELECT * FROM usuario', function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
    });
    });

conexion.end();

}


