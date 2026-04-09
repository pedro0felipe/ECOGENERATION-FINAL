const express = require("express");
const dotenv = require("dotenv").config();
const pool = require("./config/pool_conexoes");
const session = require("express-session");
const app = express();

app.use(express.static("./app/public"));
app.use(express.static("./app/admin/public"));

app.set("view engine", "ejs");
app.set("views", [
  "./app/views/pages",
  "./app/admin/views"
]);

app.use(session({
  secret: 'ecogeneration-secret-key',
  resave: true,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Middleware global — disponibiliza dados da sessão para TODAS as views
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  res.locals.usuarioLogado = req.session && req.session.usuarioLogado;
  res.locals.usuarioNome = req.session && req.session.usuarioNome || '';
  res.locals.adminLoggedIn = req.session && req.session.adminLoggedIn;
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const rota = require("./app/routes/router");
app.use("/", rota);

const porta = process.env.APP_PORT || 3000;
app.listen(porta, () => {
  console.log(`Servidor online!\n http://localhost:${porta}`);
});
