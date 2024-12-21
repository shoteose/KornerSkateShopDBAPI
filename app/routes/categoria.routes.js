module.exports = app => {
    const categoria = require("../controllers/categoria.controller.js");

    let router = require("express").Router();

    // get todas as categorias
    router.get("/", categoria.getAll);

    router.get('/:id', categoria.getById);

    // inserir uma categoria
    router.post("/", categoria.insert);

    // Apagar uma categoria pelo id
    router.delete("/:id", categoria.delete);

    // Atualizar uma categoria
    router.put("/:id", categoria.update);


    app.use('/api/categorias', router);
};