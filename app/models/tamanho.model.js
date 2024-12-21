const sql = require("./db.js");

// construtor
const Tamanho = function (tamanho) {
  this.descricao = tamanho.descricao;
};

Tamanho.insert = (newTamanho, result) => {
  sql.query("INSERT INTO tamanho SET ?", newTamanho, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Tamanho inserida: ", { id: res.insertId, ...newTamanho });
    result(null, { id: res.insertId, ...newTamanho });
  });
};

Tamanho.getAll = (result) => {
  let query;
  query = "SELECT * FROM tamanho";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Tamanhos: ", res);
    result(null, res);
  });
};

Tamanho.getById = (id, result) => {
  let query;
  query = "SELECT * FROM tamanho WHERE id = ?";

  sql.query(query, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Tamanho: ", res);
    result(null, res);
  });
};

Tamanho.insert = (newTamanho, result) => {
    sql.query('INSERT INTO tamanho SET ?', newTamanho, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
  
      console.log("Tamanho inserido: ", { id: res.insertId, ...newTamanho });
      result(null, { id: res.insertId, ...newTamanho });
    });
  }

  Tamanho.updateById = (id, Tamanho, result) => {
    sql.query(
      'UPDATE tamanho SET descricao = ? WHERE id = ?',
      [Tamanho.descricao, id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Tamanho
          result({ Tamanho: "not_found" }, null);
          return;
        }
  
        console.log('Tamanho atualizada: ', { id: id, ...Tamanho });
        result(null, { id: id, ...Tamanho });
      }
    );
  };

  Tamanho.delete = (id, result) => {
    sql.query('DELETE FROM tamanho WHERE id = ?', id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Tamanho with the id
        result({ Tamanho: "not_found" }, null);
        return;
      }
  
      console.log("Tamanho eliminada com o id: ", id);
      result(null, res);
    });
  };

module.exports = Tamanho;
