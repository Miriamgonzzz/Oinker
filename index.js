const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine","handlebars");

app.get("/",(req,res)=>{
    res.render("home");
});

const mysite = require("./routes/main");
app.use("/",mysite);

app.use(express.static("public"));
app.listen(3000);