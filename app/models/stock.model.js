const sql = require("./db.js");

// construtor
const Stock = function (stock) {
  this.id_peca = stock.id_peca;
  this.id_tamanho = stock.id_tamanho;
  this.quantidade = stock.quantidade;
};

/*

m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.preco,
    p.taxa_iva,
    p.taxa_desconto
    FROM 
    peca p
    LEFT JOIN cor c ON p.id_cor = c.id
    LEFT JOIN marca m ON p.id_marca = m.id
    LEFT JOIN categoria cat ON p.id_categoria = cat.id

*/

Stock.getAll = (result) => {
  let query;
  query = `
  SELECT
  stock.id AS id,
  stock.id_peca AS id_peca,
  stock.id_tamanho AS id_tamanho,
  stock.quantidade AS quantidade,
  p.nome AS peca,
  t.descricao AS tamanho
  FROM stock
  LEFT JOIN peca p ON stock.id_peca = p.id
  LEFT JOIN tamanho t ON stock.id_tamanho = t.id
  ORDER BY stock.id_peca ASC
  `;

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Stockes: ", res);
    result(null, res);
  });
};

Stock.getById = (id, result) => {
  let query;
  query = "SELECT * FROM stock WHERE id = ?";

  sql.query(query, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Stock: ", res);
    result(null, res);
  });
};

Stock.insert = (newStock, result) => {
  console.log("Preparando para inserir nova stock:", newStock);

  sql.query('INSERT INTO stock SET ?', newStock, (err, res) => {
    if (err) {
      console.error("error:", err);
      result(err, null);
      return;
    }

    console.log("Stock inserida com sucesso no banco de dados:", { id: res.insertId, ...newStock });
    result(null, { id: res.insertId, ...newStock });
  });
};


Stock.updateById = (id, Stock, result) => {
  sql.query(
    'UPDATE stock SET quantidade = ? WHERE id = ?',
    [Stock.quantidade, id],
    (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Stock
        result({ Stock: "not_found" }, null);
        return;
      }

      console.log('Stock atualizada: ', { id: id, ...Stock });
      result(null, { id: id, ...Stock });
    }
  );
};

Stock.delete = (id, result) => {
  sql.query('DELETE FROM stock WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Stock with the id
      result({ Stock: "not_found" }, null);
      return;
    }

    console.log("Stock eliminada com o id: ", id);
    result(null, res);
  });
};

module.exports = Stock;
