module.exports = app => {
    const fotos = require("../controllers/fotos.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/fotos:
     *   get:
     *     summary: Consulta todas as fotos
     *     tags: [Fotos]
     *     responses:
     *       200:
     *         description: Lista de fotos retornada com sucesso
     */
    router.get("/", fotos.getAll);

    /**
     * @swagger
     * /api/fotos/{id}:
     *   get:
     *     summary: Consulta uma foto pelo ID
     *     tags: [Fotos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da foto
     *     responses:
     *       200:
     *         description: Detalhes da foto retornados com sucesso
     */
    router.get('/:id', fotos.getById);

    /**
     * @swagger
     * /api/fotos:
     *   post:
     *     summary: Insere uma nova foto
     *     tags: [Fotos]
     *     requestBody:
     *       description: Dados da foto a ser inserida
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome_arquivo:
     *                 type: string
     *                 description: Nome do arquivo da foto
     *                 example: "xenaxana.png"
     *     responses:
     *       200:
     *         description: Foto inserida com sucesso
     */
    router.post("/", fotos.insert);

    /**
     * @swagger
     * /api/fotos/{id}:
     *   delete:
     *     summary: Remove uma foto pelo ID
     *     tags: [Fotos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da foto a ser removida
     *     responses:
     *       200:
     *         description: Foto removida com sucesso
     */
    router.delete("/:id", fotos.delete);

    /**
     * @swagger
     * /api/fotos/{id}:
     *   put:
     *     summary: Atualiza uma foto pelo ID
     *     tags: [Fotos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da foto
     *     requestBody:
     *       description: Dados da foto a ser atualizada
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome_arquivo:
     *                 type: string
     *                 description: Novo nome do arquivo da foto
     *                 example: "xenaxanaxananna.png"
     *     responses:
     *       200:
     *         description: Foto atualizada com sucesso
     */
    router.put("/:id", fotos.update);

    app.use('/api/fotos', router);
};
