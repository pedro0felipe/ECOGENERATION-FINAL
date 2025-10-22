var express = require("express");
var router = express.Router();
const { body, validationResult } = require('express-validator');
router.get("/", function (req, res) {
    res.render("index", {titulo:"Pagina inicial"})
});
router.get("/calculadora-tela-inicial", function (req, res) {
    res.render("calculadora-tela-inicial", {titulo:"tela inicial da calculadora"})
});

// nova rota para as perguntas / calculadora
router.get("/calculadora-perguntas", function (req, res) {
    res.render("calculadora-perguntas", { titulo: "EcoCalculadora" });
});

router.get("/ecoloja", function (req, res) {
    res.render("ecoloja", {titulo:"tela inicial da ecoloja"})
});
router.get("/entrada", function (req, res) {
    res.render("entrada", {titulo:"entrada"})
});
router.get("/medio", function (req, res) {
    res.render("medio", {titulo:"medio"})
});

router.get("/avancado", function (req, res) {
    res.render("avancado", {titulo:"avançado"})
});

router.get("/lampada", function (req, res) {
    res.render("lampada", {titulo:"lampada"})
});

router.get("/carregador", function (req, res) {
    res.render("carregador", {titulo:"carregador"})
});

router.get("/cadastro", function (req, res) {
    res.render("cadastro", {titulo:"avançado"})
});
router.get('/', (req, res) => {
    res.redirect('/login');
});

// Rota para renderizar a página de login
router.get('/login', (req, res) => {
    // fornece 'old' e 'errors' no formato esperado pelo template EJS
    res.render('login', { errors: {}, old: {} });
});




module.exports = router;