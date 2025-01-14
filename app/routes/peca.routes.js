module.exports = app => {
    const peca = require("../controllers/peca.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/peca:
     *   get:
     *     summary: Consulta todas as peças
     *     tags: [Peça]
     *     responses:
     *       200:
     *         description: Lista de peças retornada com sucesso
     */
    router.get("/", peca.getAllPecas);

    /**
     * @swagger
     * /api/peca/unity:
     *   get:
     *     summary: Consulta peças por categoria para o Unity filtrado pelas peças tridimensionais
     *     tags: [Peça]
     *     parameters:
     *       - in: query
     *         name: categoria
     *         schema:
     *           type: string
     *         description: Nome da categoria a ser filtrada
     *     responses:
     *       200:
     *         description: Lista de peças retornada com sucesso
     */
    router.get("/unity/", peca.getAllPecasCategoriaUnity);

    /**
     * @swagger
     * /api/peca/genero/{id}:
     *   get:
     *     summary: Consulta peças por ID do gênero
     *     tags: [Peça]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do gênero
     *     responses:
     *       200:
     *         description: Lista de peças retornada com sucesso
     */
    router.get("/genero/:id", peca.getAllPecasByGeneroId);

    /**
     * @swagger
     * /api/peca/categoria/{id}:
     *   get:
     *     summary: Consulta peças por ID da categoria
     *     tags: [Peça]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da categoria
     *     responses:
     *       200:
     *         description: Lista de peças retornada com sucesso
     */
    router.get("/categoria/:id", peca.getAllPecasByCategoriaId);

    /**
     * @swagger
     * /api/peca/sales:
     *   get:
     *     summary: Consulta peças com desconto
     *     tags: [Peça]
     *     responses:
     *       200:
     *         description: Lista de peças retornada com sucesso
     */
    router.get("/sales/", peca.getAllPecasComDesconto);

    /**
     * @swagger
     * /api/peca/marca/{id}:
     *   get:
     *     summary: Consulta peças por ID da marca
     *     tags: [Peça]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da marca
     *     responses:
     *       200:
     *         description: Lista de peças retornada com sucesso
     */
    router.get("/marca/:id", peca.getAllPecasByMarcaId);

    /**
     * @swagger
     * /api/peca/{id}:
     *   get:
     *     summary: Consulta uma peça pelo ID
     *     tags: [Peça]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da peça
     *     responses:
     *       200:
     *         description: Detalhes da peça retornados com sucesso
     */
    router.get('/:id', peca.getById);

    /**
     * @swagger
     * /api/peca:
     *   post:
     *     summary: Insere uma nova peça
     *     tags: [Peça]
     *     requestBody:
     *       description: Dados da peça a ser inserida
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Nome da peça
     *                 example: "Forbidden Pleasure"
     *               descricao:
     *                 type: string
     *                 description: Descrição da peça
     *                 example: "Tshirt MadeInPortugal"
     *               id_cor:
     *                 type: integer
     *                 description: ID da cor
     *                 example: 1
     *               id_marca:
     *                 type: integer
     *                 description: ID da marca
     *                 example: 2
     *               id_categoria:
     *                 type: integer
     *                 description: ID da categoria
     *                 example: 3
     *               id_genero:
     *                 type: integer
     *                 description: ID do gênero
     *                 example: 4
     *               tridimensional:
     *                 type: integer
     *                 description: Indica se a peça possui um modelo 3D (1 true, 0 false)
     *                 example: 1
     *               preco:
     *                 type: number
     *                 format: float
     *                 description: Preço da peça
     *                 example: 29.99
     *               taxa_iva:
     *                 type: number
     *                 format: float
     *                 description: Taxa de IVA aplicada
     *                 example: 23.0
     *               taxa_desconto:
     *                 type: number
     *                 format: float
     *                 description: Taxa de desconto aplicada
     *                 example: 10.0
     *               imagemTextura:
     *                 type: string
     *                 format: binary
     *                 description: Imagem de textura em formato binário (codificada em base64)
     *                 example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
     *     responses:
     *       200:
     *         description: Peça inserida com sucesso
     */
    router.post("/", peca.insert);

    /**
     * @swagger
     * /api/peca/{id}:
     *   delete:
     *     summary: Remove uma peça pelo ID
     *     tags: [Peça]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da peça a ser eliminada
     *     responses:
     *       200:
     *         description: Peça eliminada com sucesso
     */
    router.delete("/:id", peca.delete);

    /**
     * @swagger
     * /api/peca/{id}:
     *   put:
     *     summary: Atualiza uma peça pelo ID
     *     tags: [Peça]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID da peça
     *     requestBody:
     *       description: Dados da peça a ser atualizada
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nome:
     *                 type: string
     *                 description: Nome atualizado da peça
     *                 example: "Camisa atualizada"
     *               descricao:
     *                 type: string
     *                 description: Descrição atualizada da peça
     *                 example: "Camisa preta de algodão"
     *               tridimensional:
     *                 type: integer
     *                 description: Indica se a peça possui um modelo 3D (1 true, 0 false)
     *                 example: 0
     *               imagemTextura:
     *                 type: string
     *                 format: binary
     *                 description: Nova imagem de textura (codificada em base64, opcional)
     *                 example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg..."
     *     responses:
     *       200:
     *         description: Peça atualizada com sucesso
     */
    router.put("/:id", peca.update);

    app.use('/api/peca', router);
};