module.exports = app => {
    const cor = require("../controllers/cor.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/cor:
     *   get:
     *     summary: Consulta todas as cores
     *     tags: [Cor]
     *     responses:
     *       200:
     *         description: Lista de cores retornada com sucesso
     */
    router.get("/", cor.getAll);

    /**
     * @swagger
     * /api/cor/{id}:
     *   get:
     *     summary: Consulta uma cor pelo ID
     *     tags: [Cor]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da cor
     *     responses:
     *       200:
     *         description: Detalhes da cor retornados com sucesso
     */
    router.get('/:id', cor.getById);

    /**
     * @swagger
     * /api/cor:
     *   post:
     *     summary: Insere uma nova cor
     *     tags: [Cor]
     *     requestBody:
     *       description: Dados da cor a ser inserida
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Descrição da cor
     *                 example: "Vermelho"
     *     responses:
     *       200:
     *         description: Cor inserida com sucesso
     */
    router.post("/", cor.insert);

    /**
     * @swagger
     * /api/cor/{id}:
     *   delete:
     *     summary: Remove uma cor pelo ID
     *     tags: [Cor]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da cor a ser eliminada
     *     responses:
     *       200:
     *         description: Cor eliminada com sucesso
     */
    router.delete("/:id", cor.delete);

    /**
     * @swagger
     * /api/cor/{id}:
     *   put:
     *     summary: Atualiza uma cor pelo ID
     *     tags: [Cor]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da cor
     *     requestBody:
     *       description: Dados da cor a ser atualizada
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Nova descrição da cor
     *                 example: "Azul"
     *     responses:
     *       200:
     *         description: Cor atualizada com sucesso
     */
    router.put("/:id", cor.update);

    app.use('/api/cor', router);
};
