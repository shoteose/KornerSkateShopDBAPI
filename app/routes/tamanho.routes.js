module.exports = app => {
    const tamanho = require("../controllers/tamanho.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/tamanho:
     *   get:
     *     summary: Consulta todos os tamanhos
     *     tags: [Tamanho]
     *     responses:
     *       200:
     *         description: Lista de tamanhos retornada com sucesso
     */
    router.get("/", tamanho.getAll);

    /**
     * @swagger
     * /api/tamanho/{id}:
     *   get:
     *     summary: Consulta um tamanho pelo ID
     *     tags: [Tamanho]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do tamanho
     *     responses:
     *       200:
     *         description: Detalhes do tamanho retornados com sucesso
     */
    router.get('/:id', tamanho.getById);

    /**
     * @swagger
     * /api/tamanho:
     *   post:
     *     summary: Insere um novo tamanho
     *     tags: [Tamanho]
     *     requestBody:
     *       description: Dados do tamanho a ser inserido
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Descrição do tamanho
     *                 example: "M"
     *     responses:
     *       200:
     *         description: Tamanho inserido com sucesso
     */
    router.post("/", tamanho.insert);

    /**
     * @swagger
     * /api/tamanho/{id}:
     *   delete:
     *     summary: Remove um tamanho pelo ID
     *     tags: [Tamanho]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do tamanho a ser eliminado
     *     responses:
     *       200:
     *         description: Tamanho eliminado com sucesso
     */
    router.delete("/:id", tamanho.delete);

    /**
     * @swagger
     * /api/tamanho/{id}:
     *   put:
     *     summary: Atualiza um tamanho pelo ID
     *     tags: [Tamanho]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do tamanho
     *     requestBody:
     *       description: Dados do tamanho a ser atualizado
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Nova descrição do tamanho
     *                 example: "L"
     *     responses:
     *       200:
     *         description: Tamanho atualizado com sucesso
     */
    router.put("/:id", tamanho.update);

    app.use('/api/tamanho', router);
};
