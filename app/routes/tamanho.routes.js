module.exports = app => {
    const tamanho = require("../controllers/tamanho.controller.js");

    let router = require("express").Router();

    // get todas as tamanhos
    router.get("/", tamanho.getAll);

    // inserir uma tamanho
    router.post("/", tamanho.insert);

    // Apagar uma tamanho pelo id
    router.delete("/:id", tamanho.delete);

    // Atualizar uma tamanho
    router.put("/:id", tamanho.update);


    app.use('/api/tamanhos', router);
};