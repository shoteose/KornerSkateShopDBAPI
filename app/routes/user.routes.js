module.exports = app => {
    const user = require("../controllers/user.controller.js");

    let router = require("express").Router();

    /**
     * @swagger
     * /api/user:
     *   get:
     *     summary: Consulta todos os utilizadores
     *     tags: [User]
     *     responses:
     *       200:
     *         description: Lista de utilizadores retornada com sucesso
     */
    router.get("/", user.getAll);

    /**
     * @swagger
     * /api/user/{id}:
     *   get:
     *     summary: Consulta um utilizador pelo ID
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do utilizador
     *     responses:
     *       200:
     *         description: Detalhes do utilizador retornados com sucesso
     */
    router.get('/:id', user.getById);

    /**
     * @swagger
     * /api/user/emailcheck/{email}:
     *   get:
     *     summary: Verifica se um email já está registado
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: email
     *         required: true
     *         schema:
     *           type: string
     *         description: Email do utilizador
     *     responses:
     *       200:
     *         description: Resultado da verificação de email retornado com sucesso
     */
    router.get('/emailcheck/:email', user.emailcheck);

    /**
     * @swagger
     * /api/user/login:
     *   post:
     *     summary: Realiza o login de um utilizador
     *     tags: [User]
     *     requestBody:
     *       description: Credenciais para login
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email do utilizador
     *                 example: "utilizador@exemplo.com"
     *               pass:
     *                 type: string
     *                 description: Palavra-passe do utilizador
     *                 example: "senha123"
     *     responses:
     *       200:
     *         description: Login realizado com sucesso
     *       401:
     *         description: Credenciais inválidas
     */
    router.post('/login/', user.login);

    /**
     * @swagger
     * /api/user:
     *   post:
     *     summary: Insere um novo utilizador
     *     tags: [User]
     *     requestBody:
     *       description: Dados do utilizador a ser inserido
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email do utilizador
     *                 example: "utilizador@exemplo.com"
     *               nome:
     *                 type: string
     *                 description: Nome do utilizador
     *                 example: "Paulo"
     *               apelido:
     *                 type: string
     *                 description: Apelido do utilizador
     *                 example: "Novo"
     *               pass:
     *                 type: string
     *                 description: Palavra-passe do utilizador
     *                 example: "senha123"
     *     responses:
     *       200:
     *         description: Utilizador inserido com sucesso
     */
    router.post("/", user.insert);

    /**
     * @swagger
     * /api/user/{id}:
     *   delete:
     *     summary: Remove um utilizador pelo ID
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do utilizador a ser eliminado
     *     responses:
     *       200:
     *         description: Utilizador eliminado com sucesso
     */
    router.delete("/:id", user.delete);

    /**
     * @swagger
     * /api/user/{id}:
     *   put:
     *     summary: Atualiza um utilizador pelo ID
     *     tags: [User]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *         description: ID do utilizador
     *     requestBody:
     *       description: Dados do utilizador a ser atualizado
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 description: Email atualizado do utilizador
     *                 example: "novoemail@exemplo.com"
     *               nome:
     *                 type: string
     *                 description: Nome atualizado do utilizador
     *                 example: "Carlos"
     *               apelido:
     *                 type: string
     *                 description: Apelido atualizado do utilizador
     *                 example: "Pereira"
     *               pass:
     *                 type: string
     *                 description: Nova palavra-passe do utilizador
     *                 example: "novasenha456"
     *     responses:
     *       200:
     *         description: Utilizador atualizado com sucesso
     */
    router.put("/:id", user.update);

    app.use('/api/user', router);
};
