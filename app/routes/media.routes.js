module.exports = app => {
    const media = require("../controllers/media.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/media:
     *   get:
     *     summary: Consulta todos os medias
     *     tags: [Media]
     *     responses:
     *       200:
     *         description: Lista de medias retornada com sucesso
     */
    router.get("/", media.getAll);

    /**
     * @swagger
     * /api/media/{id}:
     *   get:
     *     summary: Consulta um media pelo ID
     *     tags: [Media]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do media
     *     responses:
     *       200:
     *         description: Detalhes do media retornados com sucesso
     */
    router.get('/:id', media.getById);

    /**
     * @swagger
     * /api/media:
     *   post:
     *     summary: Insere um novo media
     *     tags: [Media]
     *     requestBody:
     *       description: Dados do media a ser inserido
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               titulo:
     *                 type: string
     *                 description: Título do media
     *                 example: "Adriano Alves Alpes Suicos Laax"
     *               descricao:
     *                 type: string
     *                 description: Descrição do media
     *                 example: "adriano a ripar mais uma vez"
     *               url:
     *                 type: string
     *                 description: URL do media (Youtube e Instagram aceites)
     *                 example: "https://www.instagram.com/reel/DELko43txJI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
     *     responses:
     *       200:
     *         description: Media inserido com sucesso
     */
    router.post("/", media.insert);

    /**
     * @swagger
     * /api/media/{id}:
     *   delete:
     *     summary: Remove um media pelo ID
     *     tags: [Media]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do media a ser eliminado
     *     responses:
     *       200:
     *         description: Media eliminado com sucesso
     */
    router.delete("/:id", media.delete);

    /**
     * @swagger
     * /api/media/{id}:
     *   put:
     *     summary: Atualiza um media pelo ID
     *     tags: [Media]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do media
     *     requestBody:
     *       description: Dados do media a ser atualizado
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               titulo:
     *                 type: string
     *                 description: Novo título do media
     *                 example: "Adriano Alves Alpes Suicos Laax"
     *               descricao:
     *                 type: string
     *                 description: Nova descrição do media
     *                 example: "adriano a ripar mais uma vez"
     *               url:
     *                 type: string
     *                 description: Novo URL do media (Youtube e Instagram aceites)
     *                 example: "https://www.instagram.com/reel/DELko43txJI/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="
     *     responses:
     *       200:
     *         description: Media atualizado com sucesso
     */
    router.put("/:id", media.update);

    app.use('/api/media', router);
};
