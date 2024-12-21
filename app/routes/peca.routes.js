module.exports = app => {
    const peca = require("../controllers/peca.controller.js");

    let router = require("express").Router();

    // Consultar todos os filmes
    router.get("/", peca.getAllPecas);

    router.get("/unity/", peca.getAllPecasCategoriaUnity);

    router.get('/:id', peca.getById);


    app.use('/api/peca', router);
};