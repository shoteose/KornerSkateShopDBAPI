module.exports = app => {
    const marca = require("../controllers/marca.controller.js");

    let router = require("express").Router();

    // get todas as marcas
    router.get("/", marca.getAll);

    router.get('/:id', marca.getById);


    // inserir uma marca
    router.post("/", marca.insert);

    // Apagar uma marca pelo id
    router.delete("/:id", marca.delete);

    // Atualizar uma marca
    router.put("/:id", marca.update);


    app.use('/api/marcas', router);
};