const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('cadastro', { errors: {}, old: {} });
});

router.post(
  '/',
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
      // passa erros mapeados para a view (errors.campo.msg)
      return res.render('cadastro', { errors: errors.mapped(), old: req.body });
    }
    // TODO: salvar usuário / continuar fluxo
    res.redirect('/');
  }
);

module.exports = router;
