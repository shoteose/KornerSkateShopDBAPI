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
  this.imagemTextura = peca.imagemTextura;
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

Peca.getAllPecasCategoriaUnity = (categoria, result) => {
  let query = `SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    p.tridimensional,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.taxa_iva,
    p.taxa_desconto
    FROM 
    peca p
    LEFT JOIN cor c ON p.id_cor = c.id
    LEFT JOIN marca m ON p.id_marca = m.id
    LEFT JOIN categoria cat ON p.id_categoria = cat.id
    LEFT JOIN genero g ON p.id_genero = g.id
    WHERE 
    p.id_categoria IN (
        SELECT id 
        FROM categoria 
        WHERE descricao LIKE ?
    );
`;

  sql.query(query, [`%${categoria}%`], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};


Peca.getAllPecasNomeCategoria = (categoria, result) => {
  let query = `SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.taxa_iva,
    p.taxa_desconto
    FROM 
    peca p
    LEFT JOIN cor c ON p.id_cor = c.id
    LEFT JOIN marca m ON p.id_marca = m.id
    LEFT JOIN categoria cat ON p.id_categoria = cat.id
    LEFT JOIN genero g ON p.id_genero = g.id
    WHERE 
    p.id_categoria IN (
        SELECT id 
        FROM categoria 
        WHERE descricao LIKE ?
    );
`;

  sql.query(query, [`%${categoria}%`], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};



module.exports = Peca;
