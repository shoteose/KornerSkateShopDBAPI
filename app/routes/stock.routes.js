module.exports = app => {
    const stock = require("../controllers/stock.controller.js");

    let router = require("express").Router();

    // get todas as stocks
    router.get("/", stock.getAll);

    router.get("/:id", stock.getById);
    
    // inserir uma stock
    router.post("/", stock.insert);
    
    // Apagar uma stock pelo id
    router.delete("/:id", stock.delete);

    // Atualizar uma stock
    router.put("/:id", stock.update);


    app.use('/api/stock', router);
};