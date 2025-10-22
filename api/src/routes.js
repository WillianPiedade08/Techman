const express = require('express');

const router = express.Router();

const Usuario = require('./controllers/usuario');
const Equipamento = require('./controllers/equipamento');
const Comentario = require('./controllers/comentario');

router.get('/usuario', Usuario.read);
router.get('/usuario/:id', Usuario.read);
router.get('/perfil', Usuario.readPerfis);
router.post('/login', Usuario.login);

router.post('/equipamento', Equipamento.create);
router.get('/equipamento', Equipamento.read);
router.get('/equipamento/:id', Equipamento.read);
router.delete('/equipamento/:id', Equipamento.del);

router.post('/comentario', Comentario.create);
router.get('/comentario', Comentario.read);
router.get('/comentario/equipamento/:id', Comentario.read);

router.get('/', (req, res) => { return res.json({
    message: "API TechMan funcionando normalmente!",
    rotas:[
        { metodo: "GET", rota: "/usuario", descricao: "Lista todos os usuários" },
        { metodo: "GET", rota: "/usuario/:id", descricao: "Lista um usuário pelo ID" },
        { metodo: "GET", rota: "/perfil", descricao: "Lista todos os perfis de usuário" },
        { metodo: "POST", rota: "/login", descricao: "Faz login do usuário" },
        { metodo: "POST", rota: "/equipamento", descricao: "Cadastra um novo equipamento" },
        { metodo: "GET", rota: "/equipamento", descricao: "Lista todos os equipamentos" },
        { metodo: "GET", rota: "/equipamento/:id", descricao: "Lista um equipamento pelo ID" },
        { metodo: "DELETE", rota: "/equipamento/:id", descricao: "Deleta um equipamento pelo ID" },
        { metodo: "POST", rota: "/comentario", descricao: "Cadastra um novo comentário" },
        { metodo: "GET", rota: "/comentario", descricao: "Lista todos os comentários" },
        { metodo: "GET", rota: "/comentario/equipamento/:id", descricao: "Lista os comentários de um equipamento pelo ID" }
    ]
}) });

module.exports = router;