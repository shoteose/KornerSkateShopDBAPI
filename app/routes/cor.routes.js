module.exports = app => {
    const cor = require("../controllers/cor.controller.js");

    let router = require("express").Router();

    // get todas as cors
    router.get("/", cor.getAll);
    router.post("/add/", cor.insert);

    router.get('/:id', cor.getById);

    // inserir uma cor

    // Apagar uma cor pelo id
    router.delete("/:id", cor.delete);

    // Atualizar uma cor
    router.put("/:id", cor.update);


    app.use('/api/cor', router);
};