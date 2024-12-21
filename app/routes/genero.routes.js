module.exports = app => {
    const genero = require("../controllers/genero.controller.js");

    let router = require("express").Router();

    // get todas as generos
    router.get("/", genero.getAll);

    router.get('/:id', genero.getById);


    // inserir uma genero
    router.post("/", genero.insert);

    // Apagar uma genero pelo id
    router.delete("/:id", genero.delete);

    // Atualizar uma genero
    router.put("/:id", genero.update);


    app.use('/api/genero', router);
};