module.exports = app => {
    const media = require("../controllers/media.controller.js");

    let router = require("express").Router();

    // get todas as medias
    router.get("/", media.getAll);

    router.get('/:id', media.getById);


    // inserir uma media
    router.post("/", media.insert);

    // Apagar uma media pelo id
    router.delete("/:id", media.delete);

    // Atualizar uma media
    router.put("/:id", media.update);


    app.use('/api/medias', router);
};