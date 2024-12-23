const sql = require("./db.js");

// construtor
const Cor = function (cor) {
  this.descricao = cor.descricao;
};

Cor.getAll = (result) => {
  let query;
  query = "SELECT * FROM cor";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Cores: ", res);
    result(null, res);
  });
};

Cor.getById = (id, result) => {
  let query;
  query = "SELECT * FROM cor WHERE id = ?";

  sql.query(query, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Cor: ", res);
    result(null, res);
  });
};

Cor.insert = (newCor, result) => {
  console.log("Preparando para inserir nova cor:", newCor);

  sql.query("INSERT INTO cor (descricao) VALUES (?)", newCor.descricao, (err, res) => {
    if (err) {
      console.error("error:", err);
      result(err, null);
      return;
    }

    console.log("Cor inserida com sucesso no banco de dados:", { id: res.insertId, ...newCor });
    result(null, { id: res.insertId, ...newCor });
  });
};


  Cor.updateById = (id, Cor, result) => {
    sql.query(
      'UPDATE cor SET descricao = ? WHERE id = ?',
      [Cor.descricao, id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Cor
          result({ Cor: "not_found" }, null);
          return;
        }
  
        console.log('Cor atualizada: ', { id: id, ...Cor });
        result(null, { id: id, ...Cor });
      }
    );
  };

  Cor.delete = (id, result) => {
    sql.query('DELETE FROM cor WHERE id = ?', id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Cor with the id
        result({ Cor: "not_found" }, null);
        return;
      }
  
      console.log("Cor eliminada com o id: ", id);
      result(null, res);
    });
  };

module.exports = Cor;
