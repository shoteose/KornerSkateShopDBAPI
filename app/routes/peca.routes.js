module.exports = app => {
    const peca = require("../controllers/peca.controller.js");

    let router = require("express").Router();

    // Consultar todos os filmes
    router.get("/", peca.getAllPecas);
    router.get("/unity/", peca.getAllPecasCategoriaUnity);
    router.get("/categoria/:id", peca.getAllPecasByCategoriaId);
    router.get("/genero/:id", peca.getAllPecasByCategoriaId);
    router.get("/sales/", peca.getAllPecasComDesconto);

    router.get('/:id', peca.getById);

    // inserir uma peca
    router.post("/", peca.insert);

    // Apagar uma peca pelo id
    router.delete("/:id", peca.delete);

    // Atualizar uma peca
    router.put("/:id", peca.update);

    app.use('/api/peca', router);
};