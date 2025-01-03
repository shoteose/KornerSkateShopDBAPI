const express = require('express');
const cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const PORT = process.env.PORT || 3000;
const corsOptions = {
  origin: 'http://localhost'
};

const swaggerDefinition = {
  openapi: '3.0.1',
  info: {
    title: 'Korner Skate Shop API | Documentação',
    version: '1.0.0',
    description: 'Documentação da REST API da Korner Skate Shop',
    contact: {
      name: 'IPVC . ESTG . João Paulo Martins Novo'
    }
  },
  basePath: '/',
};

const swaggerOptions = {
  swaggerDefinition,
  apis: ['./app/routes/*.js'], // Caminho para os ficheiros que contêm as rotas da API
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(cors(corsOptions));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// tratamento (parse) de pedidos de content-type - application/json
app.use(express.json());

// tratamento (parse) de pedidos de content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// Configura o Express para usar o middleware de análise de dados URL-encoded. Particularmente útil para o tratamento de formulários HTML que enviam dados através de pedidos POST ou PUT transformando-os num objeto acessível através de req.body. O uso de { extended: true } garante que a análise de dados possa lidar com arrays e objetos no formato URL-encoded. 

// route de "entrada" - apenas para efeito de teste
app.get("/", (req, res) => {
  res.json({ message: "Korner Skate Shop API" });
});

// importação das movie.routes com um argumento de inicialização
require('./app/routes/peca.routes.js')(app);
require('./app/routes/categoria.routes.js')(app);
require('./app/routes/cor.routes.js')(app);
require('./app/routes/stock.routes.js')(app);
require('./app/routes/genero.routes.js')(app);
require('./app/routes/marca.routes.js')(app);
require('./app/routes/tamanho.routes.js')(app);
require('./app/routes/media.routes.js')(app);
require('./app/routes/user.routes.js')(app);
require('./app/routes/fotos.routes.js')(app);
require('./app/routes/pecas_fotos.routes.js')(app);

// ativação do servidor, onde serão recebidos os pedidos, na porta definida
app.listen(PORT, () => {
  console.log(`Servidor ativo na porta ${PORT}.`);
});
