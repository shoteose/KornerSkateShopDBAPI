module.exports = app => {
    const peca = require("../controllers/peca.controller.js");

    let router = require("express").Router();

    // Consultar todos os filmes
    router.get("/", peca.getAllPecas);
    router.get("/unity/",peca.getAllPecasCategoria);

    app.use('/api/pecas', router);
};