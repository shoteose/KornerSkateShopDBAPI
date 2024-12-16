module.exports = app => {
    const peca = require("../controllers/peca.controller.js");

    let router = require("express").Router();

    // Consultar todos os filmes
    router.get("/", peca.getAllPecas);

    app.use('/api/pecas', router);
};