module.exports = app => {
    const stock = require("../controllers/stock.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/stock:
     *   get:
     *     summary: Consulta todos os stocks
     *     tags: [Stock]
     *     responses:
     *       200:
     *         description: Lista de stocks retornada com sucesso
     */
    router.get("/", stock.getAll);

    /**
     * @swagger
     * /api/stock/{id}:
     *   get:
     *     summary: Consulta um stock pelo ID
     *     tags: [Stock]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do stock
     *     responses:
     *       200:
     *         description: Detalhes do stock retornados com sucesso
     */
    router.get('/:id', stock.getById);

    /**
     * @swagger
     * /api/stock:
     *   post:
     *     summary: Insere um novo stock
     *     tags: [Stock]
     *     requestBody:
     *       description: Dados do stock a ser inserido
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id_peca:
     *                 type: integer
     *                 description: ID da peça
     *                 example: 1
     *               id_tamanho:
     *                 type: integer
     *                 description: ID do tamanho
     *                 example: 2
     *               quantidade:
     *                 type: integer
     *                 description: Quantidade em stock
     *                 example: 50
     *     responses:
     *       200:
     *         description: Stock inserido com sucesso
     */
    router.post("/", stock.insert);

    /**
     * @swagger
     * /api/stock/{id}:
     *   delete:
     *     summary: Remove um stock pelo ID
     *     tags: [Stock]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do stock a ser eliminado
     *     responses:
     *       200:
     *         description: Stock eliminado com sucesso
     */
    router.delete("/:id", stock.delete);

    /**
     * @swagger
     * /api/stock/{id}:
     *   put:
     *     summary: Atualiza um stock pelo ID
     *     tags: [Stock]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do stock
     *     requestBody:
     *       description: Dados do stock a ser atualizado
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               quantidade:
     *                 type: integer
     *                 description: Quantidade atualizada em stock
     *                 example: 30
     *     responses:
     *       200:
     *         description: Stock atualizado com sucesso
     */
    router.put("/:id", stock.update);

    app.use('/api/stock', router);
};
