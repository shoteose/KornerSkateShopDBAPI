const sql = require("./db.js");

// construtor
const Genero = function (genero) {
  this.descricao = genero.descricao;
};

Genero.insert = (newGenero, result) => {
  sql.query("INSERT INTO genero SET ?", newGenero, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("Genero inserida: ", { id: res.insertId, ...newGenero });
    result(null, { id: res.insertId, ...newGenero });
  });
};

Genero.getAll = (result) => {
  let query;
  query = "SELECT * FROM genero";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Generos: ", res);
    result(null, res);
  });
};

Genero.insert = (newGenero, result) => {
    sql.query('INSERT INTO genero SET ?', newGenero, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
  
      console.log("Genero inserido: ", { id: res.insertId, ...newGenero });
      result(null, { id: res.insertId, ...newGenero });
    });
  }

  Genero.updateById = (id, Genero, result) => {
    sql.query(
      'UPDATE genero SET descricao = ? WHERE id = ?',
      [Genero.descricao, id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Genero
          result({ Genero: "not_found" }, null);
          return;
        }
  
        console.log('Genero atualizada: ', { id: id, ...Genero });
        result(null, { id: id, ...Genero });
      }
    );
  };

  Genero.delete = (id, result) => {
    sql.query('DELETE FROM genero WHERE id = ?', id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Genero with the id
        result({ Genero: "not_found" }, null);
        return;
      }
  
      console.log("Genero eliminada com o id: ", id);
      result(null, res);
    });
  };

module.exports = Genero;
