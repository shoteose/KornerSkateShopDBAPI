module.exports = app => {
    const marca = require("../controllers/marca.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/marca:
     *   get:
     *     summary: Consulta todas as marcas
     *     tags: [Marca]
     *     responses:
     *       200:
     *         description: Lista de marcas retornada com sucesso
     */
    router.get("/", marca.getAll);

    /**
     * @swagger
     * /api/marca/{id}:
     *   get:
     *     summary: Consulta uma marca pelo ID
     *     tags: [Marca]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da marca
     *     responses:
     *       200:
     *         description: Detalhes da marca retornados com sucesso
     */
    router.get('/:id', marca.getById);

    /**
     * @swagger
     * /api/marca:
     *   post:
     *     summary: Insere uma nova marca
     *     tags: [Marca]
     *     requestBody:
     *       description: Dados da marca a ser inserida
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Nome da marca
     *                 example: "Antix"
     *     responses:
     *       200:
     *         description: Marca inserida com sucesso
     */
    router.post("/", marca.insert);

    /**
     * @swagger
     * /api/marca/{id}:
     *   delete:
     *     summary: Remove uma marca pelo ID
     *     tags: [Marca]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da marca a ser eliminada
     *     responses:
     *       200:
     *         description: Marca eliminada com sucesso
     */
    router.delete("/:id", marca.delete);

    /**
     * @swagger
     * /api/marca/{id}:
     *   put:
     *     summary: Atualiza uma marca pelo ID
     *     tags: [Marca]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da marca
     *     requestBody:
     *       description: Dados da marca a ser atualizada
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Novo nome da marca
     *                 example: "Anti-Hero"
     *     responses:
     *       200:
     *         description: Marca atualizada com sucesso
     */
    router.put("/:id", marca.update);

    app.use('/api/marca', router);
};
