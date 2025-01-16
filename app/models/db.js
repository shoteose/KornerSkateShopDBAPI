const mysql = require('mysql');
const DBConfig = require('../config/db.config.js');

// Criar conexão à base de dados
const connection = mysql.createConnection({
  host: DBConfig.DBSERVER,
  user: DBConfig.DBUSER,
  password: DBConfig.DBPASS,
  database: DBConfig.DBNAME
});

// Abrir conexão à base de dados
connection.connect(error => {
  if (error) throw error;
  console.log('Ligação à base de dados estabelecida...');

  const query = 'SET GLOBAL max_allowed_packet = 524288000';
  connection.query(query, (err, res) => {
    if (err) {
      console.error('Erro ao ajustar max_allowed_packet:', err.message);
      return;
    }
    console.log('max_allowed_packet ajustado para 500 MB');
  });

});



module.exports = connection;