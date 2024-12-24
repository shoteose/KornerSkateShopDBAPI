module.exports = app => {
    const user = require("../controllers/user.controller.js");

    let router = require("express").Router();

    // get todas as users
    router.get("/", user.getAll);

    router.get('/:id', user.getById);

    router.post('/login/',user.login);
    // inserir uma user
    router.post("/", user.insert);

    // Apagar uma user pelo id
    router.delete("/:id", user.delete);

    // Atualizar uma user
    router.put("/:id", user.update);


    app.use('/api/user', router);
};