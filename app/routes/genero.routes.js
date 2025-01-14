module.exports = app => {
    const genero = require("../controllers/genero.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/genero:
     *   get:
     *     summary: Consulta todos os gêneros
     *     tags: [Gênero]
     *     responses:
     *       200:
     *         description: Lista de gêneros retornada com sucesso
     */
    router.get("/", genero.getAll);

    /**
     * @swagger
     * /api/genero/{id}:
     *   get:
     *     summary: Consulta um gênero pelo ID
     *     tags: [Gênero]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do gênero
     *     responses:
     *       200:
     *         description: Detalhes do gênero retornados com sucesso
     */
    router.get('/:id', genero.getById);

    /**
     * @swagger
     * /api/genero:
     *   post:
     *     summary: Insere um novo gênero
     *     tags: [Gênero]
     *     requestBody:
     *       description: Nome do gênero a ser inserido
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Nome do gênero
     *                 example: "Masculino"
     *     responses:
     *       200:
     *         description: Gênero inserido com sucesso
     */
    router.post("/", genero.insert);

    /**
     * @swagger
     * /api/genero/{id}:
     *   delete:
     *     summary: Remove um gênero pelo ID
     *     tags: [Gênero]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do gênero a ser eliminado
     *     responses:
     *       200:
     *         description: Gênero eliminado com sucesso
     */
    router.delete("/:id", genero.delete);

    /**
     * @swagger
     * /api/genero/{id}:
     *   put:
     *     summary: Atualiza um gênero pelo ID
     *     tags: [Gênero]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do gênero
     *     requestBody:
     *       description: Dados do gênero a ser atualizado
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               descricao:
     *                 type: string
     *                 description: Novo nome/descricao do gênero
     *                 example: "Feminino"
     *     responses:
     *       200:
     *         description: Gênero atualizado com sucesso
     */
    router.put("/:id", genero.update);

    app.use('/api/genero', router);
};
