module.exports = app => {
    const pecas_fotos = require("../controllers/pecas_fotos.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/pecas_fotos:
     *   get:
     *     summary: Consulta todas as associações de peças e fotos
     *     tags: [Peças-Fotos]
     *     responses:
     *       200:
     *         description: Lista de associações retornada com sucesso
     */
    router.get("/", pecas_fotos.getAll);

    /**
     * @swagger
     * /api/pecas_fotos/{id}:
     *   get:
     *     summary: Consulta uma associação entre peça e foto pelo ID da peça
     *     tags: [Peças-Fotos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da peça
     *     responses:
     *       200:
     *         description: Associação retornada com sucesso
     */
    router.get('/:id', pecas_fotos.getById);

    /**
     * @swagger
     * /api/pecas_fotos:
     *   post:
     *     summary: Associa uma nova foto a uma peça
     *     tags: [Peças-Fotos]
     *     requestBody:
     *       description: Dados da associação a ser criada
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
     *               id_foto:
     *                 type: integer
     *                 description: ID da foto
     *                 example: 5
     *     responses:
     *       200:
     *         description: Associação criada com sucesso
     */
    router.post("/", pecas_fotos.insert);

    /**
     * @swagger
     * /api/pecas_fotos/{id}:
     *   delete:
     *     summary: Remove uma associação entre peça e foto pelo ID
     *     tags: [Peças-Fotos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da associação a ser eliminada
     *     responses:
     *       200:
     *         description: Associação eliminada com sucesso
     */
    router.delete("/:id", pecas_fotos.delete);

    /**
     * @swagger
     * /api/pecas_fotos/{id}:
     *   put:
     *     summary: Atualiza uma associação entre peça e foto pelo ID
     *     tags: [Peças-Fotos]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da associação
     *     requestBody:
     *       description: Dados da associação a ser atualizada
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               id_peca:
     *                 type: integer
     *                 description: ID atualizado da peça
     *                 example: 2
     *               id_foto:
     *                 type: integer
     *                 description: ID atualizado da foto
     *                 example: 6
     *     responses:
     *       200:
     *         description: Associação atualizada com sucesso
     */
    router.put("/:id", pecas_fotos.update);

    app.use('/api/pecas_fotos', router);
};
