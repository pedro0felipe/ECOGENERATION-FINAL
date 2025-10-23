var express = require("express");
var router = express.Router();
const { body, validationResult, check } = require('express-validator');
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

router.get("/miniventilador", function (req, res) {
    res.render("miniventilador", {titulo:"ventilador"})
});

router.get("/carregador", function (req, res) {
    res.render("carregador", {titulo:"carregador"})
});

router.get('/cadastro', (req, res) => {
  // Note o 'pages/cadastro' em vez de 'pages/cadastro'
  res.render('cadastro', { titulo: 'Cadastro', old: {}, errors: {} });
});

router.post(
  '/cadastro',
  [
    check('nome').notEmpty().withMessage('Nome é obrigatório'),
    check('email').isEmail().withMessage('Email inválido'),
    check('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    check('sexo').notEmpty().withMessage('Campo é obrigatório'),
    check('descricao').notEmpty().withMessage('Descrição é obrigatória'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // renderiza novamente o formulário com erros
      return res.render('cadastro', { old: req.body, errors: errors.mapped() });
    }
    res.redirect('/');
  }
);

// Rota para renderizar a página de login
router.get('/login', (req, res) => {
    // fornece 'old' e 'errors' no formato esperado pelo template EJS
    res.render('login', { errors: {}, old: {} });
});




router.post(
  '/login',
  [
    check('email').isEmail().withMessage('Email inválido'),
    check('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const mappedErrors = errors.mapped();
      return res.render('login', { errors: mappedErrors, old: req.body });
    }
    // Login bem-sucedido, redireciona para a tela inicial
    res.redirect('/');
  }
);

module.exports = router;


