const sql = require("./db.js");

// Construtor
const Peca = function (peca) {
  this.id = peca.id;
  this.nome = peca.nome;
  this.descricao = peca.descricao;
  this.id_cor = peca.id_cor;
  this.id_marca = peca.id_marca;
  this.id_categoria = peca.id_categoria;
  this.id_genero = peca.id_genero;
  this.taxa_iva = peca.taxa_iva;
  this.taxa_desconto = peca.taxa_desconto;
};

Peca.getAllPecas = (nome, result) => {
  let query = "SELECT * FROM peca";

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pecas: ", res);
    result(null, res);
  });
};

Peca.getAllPecasCategoria = (categoria, result) => {
  let query = "SELECT * FROM peca";

  if (categoria) {
    query += ` WHERE id_categoria IN (SELECT id FROM categoria WHERE descricao LIKE ?)`;
  }

  // Usando prepared statement para evitar injeção de SQL
  sql.query(query, [`%${categoria}%`], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("pecas: ", res);
    result(null, res);
  });
};




module.exports = Peca;
