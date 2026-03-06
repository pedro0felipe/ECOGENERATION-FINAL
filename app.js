const express = require("express");
const app = express();
const porta = 3000;

app.use(express.static("./app/public"));

app.set("view engine", "ejs");
app.set("views", "./app/views/pages");

app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const rota = require("./app/routes/router");
app.use("/", rota);

app.listen(porta, ()=>{
    console.log(`Servidor online!\n http://localhost:${porta}`);
})
