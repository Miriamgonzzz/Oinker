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
    
    conexion.query("SELECT tituloMensaje, textoMensaje FROM mensaje", (err, rows, fields)=>{  
      if (!err) 
      res.render("mostrarMensajes", {rows});
      //res.send(rows); 
      else
      console.log(err);
 
  })

});

app.get("/escribirMensaje",(req,res)=>{
    res.render("escribirMensaje");
});

app.post("/formu",(req,res)=>{

        const nombre = req.body.nombre;
        console.log(req.body);
        const correo = req.body.correo;
        const nick = req.body.nick;
        const password = req.body.password;         
            try {
            conexion.query("INSERT INTO usuario(nombreUsuario,correoUsuario,nickUsuario,passwordUsuario) VALUES ('"+nombre+"','"+correo+"','"+nick+"','"+password+"')");
             console.log("entro");
            res.redirect('/mostrarMensajes');
           } catch (error) {
            console.log(error);
           }
           
});

app.post("/login",(req,res)=>{

    const nick = req.body.nickLogin;
    const password = req.body.passwordLogin;        
        try {
        conexion.query("SELECT * FROM usuario WHERE(nickUsuario= ? and passwordUsuario= ? ",(err,rows,fields)=>{
            if(!fields)
            console.log(rows),
            res.redirect('/mostrarMensajes');
            else
            console.log("El usuario no esta registrado");
        })
         
       } catch (error) {
        console.log(error);
       }
       
});

app.post("/escribirMensaje",(req,res)=>{

    const titulo = req.body.titulo;
    console.log(req.body);
    const mensaje = req.body.mensaje;       
        try {
        conexion.query("INSERT INTO mensaje(tituloMensaje,textoMensaje) VALUES ('"+titulo+"','"+mensaje+"')");
         console.log("entro");
        res.redirect('/mostrarMensajes');
       } catch (error) {
        console.log(error);
       }
       
});
//ruta para la carpeta routes
const mysite = require("./routes/main");
app.use("/",mysite);

//ruta carpeta de estilos + JavaScript
app.use(express.static("public"));
app.listen(3000);