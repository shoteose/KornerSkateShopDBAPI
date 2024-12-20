module.exports = app => {
    const genero = require("../controllers/genero.controller.js");

    let router = require("express").Router();

    // get todas as generos
    router.get("/", genero.getAll);

    // inserir uma genero
    router.post("/", genero.insert);

    // Apagar uma genero pelo id
    router.delete("/:id", genero.delete);

    // Atualizar uma genero
    router.put("/:id", genero.update);


    app.use('/api/generos', router);
};