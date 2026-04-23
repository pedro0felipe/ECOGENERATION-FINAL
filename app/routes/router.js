var express = require("express");
const { produtosModel } = require("../models/produtosModel");
const { diagnosticosModel } = require("../models/diagnosticosModel");
const { usuariosModel } = require("../models/usuariosModel");
const { comprasModel } = require("../models/comprasModel");
var router = express.Router();
const { validationResult, check } = require('express-validator');

// ===== IMPORTAR ROTAS DE ADMIN =====
const routerAdmin = require('../admin/routes/router-adm');

// ===== MIDDLEWARE — protege rotas que precisam de login =====
function requireLogin(req, res, next) {
    if (!req.session.usuarioLogado) {
        return res.redirect('/login');
    }
    next();
}

// ===== PAGINA INICIAL =====
router.get("/", function (req, res) {
    res.render("index", { titulo: "Pagina inicial" });
});

// ===== ECOLOJA =====
router.get("/ecoloja", async function (req, res) {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const categorias = {
            1: 'entrada',
            2: 'medio',
            3: 'avancado'
        };
        const titulos = {
            1: 'Entrada',
            2: 'Médio',
            3: 'Avançado'
        };

        const currentPage = page >= 1 && page <= 3 ? page : 1;
        const categoria = categorias[currentPage];
        const tituloPagina = titulos[currentPage];
        const produtos = await produtosModel.findByCategoria(categoria);

        res.render("ecoloja", {
            titulo: "EcoLoja",
            produtos: produtos,
            currentPage,
            totalPages: 3,
            categoriaPagina: categoria,
            tituloCategoria: tituloPagina
        });
    } catch (erro) {
        console.log(erro);
    }
});

// ===== DETALHE DO PRODUTO =====
router.get('/produto/:id', async function (req, res) {
    try {
        const resultados = await produtosModel.findById(req.params.id);
        if (!resultados || resultados.length === 0) {
            return res.status(404).render('404', { titulo: 'Produto não encontrado' });
        }
        const produto = resultados[0];
        res.render('produto', { titulo: produto.nome_produto, produto });
    } catch (erro) {
        console.log(erro);
        res.status(500).send('Erro interno do servidor');
    }
});

// ===== CONFIRMAR COMPRA =====
router.get('/confirmar-compra/:id', requireLogin, async function (req, res) {
    try {
        const resultados = await produtosModel.findById(req.params.id);
        if (!resultados || resultados.length === 0) {
            return res.redirect('/ecoloja');
        }
        const produto = resultados[0];
        res.render('confirmar-compra', { titulo: 'Confirmar Compra', produto });
    } catch (erro) {
        console.log(erro);
        res.redirect('/ecoloja');
    }
});

// ===== PROCESSAR COMPRA =====
router.post('/confirmar-compra/:id', requireLogin, async function (req, res) {
    try {
        const resultados = await produtosModel.findById(req.params.id);
        if (!resultados || resultados.length === 0) {
            return res.redirect('/ecoloja');
        }
        const produto = resultados[0];

        const novaCompra = await comprasModel.create({
            id_usuario: req.session.usuarioId,
            id_produto: produto.id_produto,
            nome_produto: produto.nome_produto,
            preco_produto: produto.preco_produto,
            imagem_produto: produto.imagem_produto
        });

        // Guarda o id da compra na sessão para exibir na página de sucesso
        req.session.ultimaCompraId = novaCompra.insertId;
        req.session.ultimaCompraProduto = produto.nome_produto;
        req.session.ultimaCompraPreco = produto.preco_produto;

        res.redirect('/compra-sucesso');
    } catch (erro) {
        console.log(erro);
        res.redirect('/ecoloja');
    }
});

// ===== COMPRA SUCESSO =====
router.get('/compra-sucesso', requireLogin, function (req, res) {
    const nomeProduto = req.session.ultimaCompraProduto || 'Produto';
    const precoProduto = req.session.ultimaCompraPreco || '0.00';
    const compraId = req.session.ultimaCompraId || '---';
    res.render('compra-sucesso', {
        titulo: 'Compra Realizada!',
        nomeProduto,
        precoProduto,
        compraId
    });
});

// ===== PERFIL DO USUÁRIO =====
router.get('/perfil', requireLogin, async (req, res) => {
    try {
        const usuarios = await usuariosModel.findById(req.session.usuarioId);
        const usuario = usuarios[0];
        const diagnosticos = await diagnosticosModel.findByUsuario(req.session.usuarioId);
        const compras = await comprasModel.findByUsuario(req.session.usuarioId);
        res.render('perfil', {
            titulo: 'Meu Perfil',
            usuario,
            diagnosticos,
            compras
        });
    } catch (erro) {
        console.log(erro);
        res.redirect('/');
    }
});

// ===== EXCLUIR CONTA =====
router.post('/excluir-conta', requireLogin, async (req, res) => {
    try {
        await usuariosModel.delete(req.session.usuarioId);
        req.session.destroy();
        res.redirect('/?conta=excluida');
    } catch (erro) {
        console.log(erro);
        res.redirect('/perfil');
    }
});

// ===== CADASTRO =====
router.get('/cadastro', (req, res) => {
    res.render('cadastro', { titulo: 'Cadastro', old: {}, errors: {} });
});

router.post('/cadastro',
    [
        check('nome').notEmpty().withMessage('Nome é obrigatório'),
        check('email').isEmail().withMessage('Email inválido'),
        check('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('cadastro', { old: req.body, errors: errors.mapped() });
        }
        try {
            const existente = await usuariosModel.findByEmail(req.body.email);
            if (existente.length > 0) {
                return res.render('cadastro', {
                    old: req.body,
                    errors: { email: { msg: 'Este e-mail já está cadastrado.' } }
                });
            }
            await usuariosModel.create({
                nome: req.body.nome,
                email: req.body.email,
                senha: req.body.senha
            });
            res.redirect('/login');
        } catch (erro) {
            console.log(erro);
            res.render('cadastro', { old: req.body, errors: { geral: { msg: 'Erro ao cadastrar. Tente novamente.' } } });
        }
    }
);

// ===== LOGIN =====
router.get('/login', (req, res) => {
    res.render('login', { errors: {}, old: {} });
});

router.post('/login',
    [
        check('email').isEmail().withMessage('Email inválido'),
        check('senha').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', { errors: errors.mapped(), old: req.body });
        }
        try {
            const usuarios = await usuariosModel.findByEmail(req.body.email);
            if (usuarios.length === 0) {
                return res.render('login', {
                    errors: { geral: { msg: 'E-mail não cadastrado.' } },
                    old: req.body
                });
            }
            const usuario = usuarios[0];
            if (req.body.senha !== usuario.senha_usuario) {
                return res.render('login', {
                    errors: { geral: { msg: 'Email ou senha inválidos.' } },
                    old: req.body
                });
            }
            req.session.usuarioLogado = true;
            req.session.usuarioId = usuario.id_usuario;
            req.session.usuarioNome = usuario.nome_usuario;
            res.redirect('/');
        } catch (erro) {
            console.log(erro);
            res.render('login', {
                errors: { geral: { msg: 'Erro ao fazer login. Tente novamente.' } },
                old: req.body
            });
        }
    }
);

// ===== LOGOUT =====
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// ===== DIAGNÓSTICO =====
router.get('/diagnostico', requireLogin, (req, res) => {
    res.render('diagnostico', { titulo: 'Diagnóstico de Autonomia Energética' });
});

router.post('/diagnostico', requireLogin, async (req, res) => {
    const { frequencia, impacto, preparacao, prioridade, tolerancia } = req.body;
    let pontuacao = 0;

    switch (frequencia) {
        case 'nunca': pontuacao += 10; break;
        case 'poucas': pontuacao += 5; break;
        case 'algumas': pontuacao -= 5; break;
        case 'frequentemente': pontuacao -= 10; break;
    }
    switch (impacto) {
        case 'nao_afeta': pontuacao += 10; break;
        case 'afeta_pouco': pontuacao += 5; break;
        case 'afeta_bastante': pontuacao -= 5; break;
        case 'afeta_muito': pontuacao -= 10; break;
    }
    switch (preparacao) {
        case 'sistema_completo': pontuacao += 10; break;
        case 'power_bank': pontuacao += 5; break;
        case 'lanternas': pontuacao -= 5; break;
        case 'nenhuma': pontuacao -= 10; break;
    }
    switch (prioridade) {
        case 'iluminacao': pontuacao += 5; break;
        case 'celular': pontuacao += 0; break;
        case 'geladeira': pontuacao -= 5; break;
        case 'trabalho': pontuacao -= 10; break;
    }
    switch (tolerancia) {
        case 'um_dia': pontuacao += 10; break;
        case 'algumas_horas': pontuacao += 5; break;
        case 'uma_hora': pontuacao -= 5; break;
        case 'nao_consigo': pontuacao -= 10; break;
    }

    let nivel = pontuacao >= 20 ? 'alta' : pontuacao >= 0 ? 'media' : 'baixa';

    try {
        await diagnosticosModel.create({
            id_usuario: req.session.usuarioId ? parseInt(req.session.usuarioId) : null,
            frequencia, impacto, preparacao, prioridade, tolerancia,
            nivel_autonomia: nivel
        });
    } catch (erro) {
        console.log('Erro ao salvar diagnóstico:', erro);
    }

    const categoria = nivel === 'alta' ? 'avancado' : nivel === 'media' ? 'medio' : 'entrada';
    const produtosRecomendados = await produtosModel.findByCategoria(categoria);
    res.render('resultado', { nivel, produtosRecomendados });
});

// ===== PÁGINAS DE PRODUTOS INDIVIDUAIS =====
router.get("/sobre-nos", (req, res) => res.render("sobre-nos", { titulo: "Sobre Nós" }));
router.get("/entrada", (req, res) => res.render("entrada", { titulo: "Entrada" }));
router.get("/medio", (req, res) => res.render("medio", { titulo: "Médio" }));
router.get("/avancado", (req, res) => res.render("avancado", { titulo: "Avançado" }));
router.get("/lampada", (req, res) => res.render("lampada", { titulo: "Lâmpada" }));
router.get("/ventilador", (req, res) => res.render("ventilador", { titulo: "Ventilador" }));
router.get("/lumi", (req, res) => res.render("lumi", { titulo: "Lumi" }));
router.get("/miniventilador", (req, res) => res.render("miniventilador", { titulo: "Mini Ventilador" }));
router.get("/painel-solar", (req, res) => res.render("painel-solar", { titulo: "Painel Solar" }));
router.get("/powerbank", (req, res) => res.render("powerbank", { titulo: "Powerbank" }));
router.get("/ventiladorsolar", (req, res) => res.render("ventiladorsolar", { titulo: "Ventilador Solar" }));
router.get("/lampadasolar", (req, res) => res.render("lampadasolar", { titulo: "Lâmpada Solar" }));
router.get("/kitenergiasolarportatil", (req, res) => res.render("kitenergiasolarportatil", { titulo: "Kit Energia Solar" }));
router.get("/carregador", (req, res) => res.render("carregador", { titulo: "Carregador" }));
router.get("/painelsolarmedio", (req, res) => res.render("painelsolarmedio", { titulo: "Painel Solar Médio" }));
router.get("/carregadorusb", (req, res) => res.render("carregadorusb", { titulo: "Carregador USB" }));
router.get("/luminariasolar", (req, res) => res.render("luminariasolar", { titulo: "Luminária Solar" }));
router.get("/minipainel", (req, res) => res.render("minipainel", { titulo: "Mini Painel Solar" }));
router.get("/ventiladormedio", (req, res) => res.render("ventiladormedio", { titulo: "Ventilador Médio" }));
router.get("/estacao", (req, res) => res.render("estacao", { titulo: "Estação de Energia" }));
router.get("/kitmedioo", (req, res) => res.render("kitmedioo", { titulo: "Kit Médio" }));
router.get("/estacaodeenergiaportatil", (req, res) => res.render("estacaodeenergiaportatil", { titulo: "Estação de Energia Portátil" }));
router.get("/bluetti", (req, res) => res.render("bluetti", { titulo: "Bluetti EB3A" }));
router.get("/estacaoeolica", (req, res) => res.render("estacaoeolica", { titulo: "Estação Eólica" }));
router.get("/kitgerador", (req, res) => res.render("kitgerador", { titulo: "Kit Gerador Solar" }));
router.get("/estacaogeradorsolar", (req, res) => res.render("estacaogeradorsolar", { titulo: "Gerador Solar" }));
router.get("/ecoflow", (req, res) => res.render("ecoflow", { titulo: "Ecoflow River 3" }));
router.get("/esttacao", (req, res) => res.render("esttacao", { titulo: "Estação Solar" }));
router.get("/placamil", (req, res) => res.render("placamil", { titulo: "Kit Painel Solar Ecoflow" }));
router.get("/luminaria", (req, res) => res.render("luminaria", { titulo: "Luminária" }));
router.get("/calculadora-tela-inicial", (req, res) => res.render("diagnosticotela-inicial", { titulo: "Diagnóstico" }));
router.get("/calculadora-perguntas", (req, res) => res.render("calculadora-perguntas", { titulo: "EcoCalculadora" }));

// ===== ROTAS DE ADMIN =====
router.use('/', routerAdmin);

module.exports = router;
