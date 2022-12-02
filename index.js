//requerimientos que hemos instalado en node
const express = require("express");
const exphbs = require("express-handlebars");

//creamos el servidor de aplicaciones
const app = express();

//informamos a Express que vamos a utilizar handlebars de motor de templating
app.engine("handlebars", exphbs.engine());
app.set("view engine","handlebars");

//get para configurar ruteo
app.get("/",(req,res)=>{
    res.render("home");
});

//ruta para la carpeta routes
const mysite = require("./routes/main");
app.use("/",mysite);

//ruta carpeta de estilos + JavaScript
app.use(express.static("public"));
app.listen(3000);