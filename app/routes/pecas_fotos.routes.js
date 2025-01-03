module.exports = app => {
    const pecas_fotos = require("../controllers/pecas_fotos.controller.js");

    let router = require("express").Router();

    // get todas as pecas_fotos
    router.get("/", pecas_fotos.getAll);

    router.get('/:id', pecas_fotos.getById);


    // inserir uma pecas_fotos
    router.post("/", pecas_fotos.insert);

    // Apagar uma pecas_fotos pelo id
    router.delete("/:id", pecas_fotos.delete);

    // Atualizar uma pecas_fotos
    router.put("/:id", pecas_fotos.update);


    app.use('/api/pecas_fotos', router);
};