//requerimientos que hemos instalado en node
const express = require("express");
const exphbs = require("express-handlebars");
var mysql = require('mysql');
const body = require('body-parser')

//creamos el servidor de aplicaciones
const app = express();
//const {insert}=require(/conexion);

//informamos a Express que vamos a utilizar handlebars de motor de templating
app.engine("handlebars", exphbs.engine());
app.set("view engine","handlebars");
app.use(body.urlencoded({extended:true}))

var conexion= mysql.createConnection({
    host : '127.0.0.1',
    database : 'oinker',
    user : 'root',
    password : '',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
    });

//get para configurar ruteo
app.get("/",(req,res)=>{
    res.render("home");
});

app.get("/mostrarMensajes",(req,res)=>{
    res.render("mostrarMensajes");
});

app.get("/escribirMensaje",(req,res)=>{
    res.render("escribirMensaje");
});

app.post("/",(req,res)=>{

        const nombre = req.body.nombre;
        console.log(req.body.nombre);
        const correo = req.body.correo;
        const nick = req.body.nick;
        const password = req.body.password;
        conexion.query("INSERT INTO usuario(nombreUsuario,correoUsuario,nickUsuario,passwordUsuario) VALUES ('"+nombre+"','"+correo+"','"+nick+"','"+password+"')"), (error,results)=>{
            if(error){
                console.log(error);
            }else{
                res.send('ALTA Existosa')
            }
        }
});
//ruta para la carpeta routes
const mysite = require("./routes/main");
app.use("/",mysite);

//ruta carpeta de estilos + JavaScript
app.use(express.static("public"));
app.listen(3000);