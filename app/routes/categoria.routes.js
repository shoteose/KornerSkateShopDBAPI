module.exports = app => {
    const categoria = require("../controllers/categoria.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/categoria:
     *   get:
     *     summary: Consulta todas as categorias
     *     tags: [Categoria]
     *     responses:
     *       200:
     *         description: Lista de categorias retornada com sucesso
     */
    router.get("/", categoria.getAll);

    /**
     * @swagger
     * /api/categoria/{id}:
     *   get:
     *     summary: Consulta uma categoria pelo ID
     *     tags: [Categoria]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da categoria
     *     responses:
     *       200:
     *         description: Detalhes da categoria retornados com sucesso
     */
    router.get('/:id', categoria.getById);

    /**
     * @swagger
     * /api/categoria:
     *   post:
     *     summary: Insere uma nova categoria
     *     tags: [Categoria]
     *     requestBody:
     *       description: Dados da categoria a ser inserida
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Descrição da categoria
     *                 example: "Roupas"
     *     responses:
     *       200:
     *         description: Categoria inserida com sucesso
     */
    router.post("/", categoria.insert);

    /**
     * @swagger
     * /api/categoria/{id}:
     *   delete:
     *     summary: Remove uma categoria pelo ID
     *     tags: [Categoria]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da categoria a ser removida
     *     responses:
     *       200:
     *         description: Categoria removida com sucesso
     */
    router.delete("/:id", categoria.delete);

    /**
     * @swagger
     * /api/categoria/{id}:
     *   put:
     *     summary: Atualiza uma categoria pelo ID
     *     tags: [Categoria]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da categoria
     *     requestBody:
     *       description: Dados da categoria a ser atualizada
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Nome da categoria
     *                 example: "Rolamentos"
     *     responses:
     *       200:
     *         description: Categoria atualizada com sucesso
     */
    router.put("/:id", categoria.update);

    app.use('/api/categoria', router);
};
