const sql = require("./db.js");

// construtor
const Categoria = function (categoria) {
  this.descricao = categoria.descricao;
};

Categoria.insert = (newCategoria, result) => {
  sql.query("INSERT INTO categoria SET ?", newCategoria, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Categoria inserida: ", { id: res.insertId, ...newCategoria });
    result(null, { id: res.insertId, ...newCategoria });
  });
};

Categoria.getAll = (result) => {
  let query;
  query = "SELECT * FROM categoria";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Categorias: ", res);
    result(null, res);
  });
};

Categoria.insert = (newCategoria, result) => {
    sql.query('INSERT INTO categoria SET ?', newCategoria, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
  
      console.log("Categoria inserido: ", { id: res.insertId, ...newCategoria });
      result(null, { id: res.insertId, ...newCategoria });
    });
  }

  Categoria.updateById = (id, Categoria, result) => {
    sql.query(
      'UPDATE categoria SET descricao = ? WHERE id = ?',
      [Categoria.descricao, id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Categoria
          result({ Categoria: "not_found" }, null);
          return;
        }
  
        console.log('Categoria atualizada: ', { id: id, ...Categoria });
        result(null, { id: id, ...Categoria });
      }
    );
  };

  Categoria.delete = (id, result) => {
    sql.query('DELETE FROM categoria WHERE id = ?', id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Categoria with the id
        result({ Categoria: "not_found" }, null);
        return;
      }
  
      console.log("Categoria eliminada com o id: ", id);
      result(null, res);
    });
  };

module.exports = Categoria;
