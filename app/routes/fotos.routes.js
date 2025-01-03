module.exports = app => {
    const fotos = require("../controllers/fotos.controller.js");

    let router = require("express").Router();

    // get todas as fotoss
    router.get("/", fotos.getAll);

    router.get('/:id', fotos.getById);


    // inserir uma fotos
    router.post("/", fotos.insert);

    // Apagar uma fotos pelo id
    router.delete("/:id", fotos.delete);

    // Atualizar uma fotos
    router.put("/:id", fotos.update);


    app.use('/api/fotos', router);
};