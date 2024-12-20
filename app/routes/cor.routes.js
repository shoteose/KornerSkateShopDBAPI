module.exports = app => {
    const cor = require("../controllers/cor.controller.js");

    let router = require("express").Router();

    // get todas as cors
    router.get("/", cor.getAll);

    // inserir uma cor
    router.post("/", cor.insert);

    // Apagar uma cor pelo id
    router.delete("/:id", cor.delete);

    // Atualizar uma cor
    router.put("/:id", cor.update);


    app.use('/api/cors', router);
};