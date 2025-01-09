const sql = require("./db.js");

// construtor
const Marca = function (marca) {
  this.nome = marca.nome;
};

Marca.getAll = (result) => {
  let query;
  query = "SELECT * FROM marca";

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("Marcas: ", res);
    result(null, res);
  });
};

Marca.getById = (id, result) => {
  let query;
  query = "SELECT * FROM marca WHERE id = ?";

  sql.query(query, id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Marca: ", res);
    result(null, res);
  });
};

Marca.insert = (newMarca, result) => {
    sql.query('INSERT INTO marca (nome) VALUES (?)', newMarca.nome, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(err, null);
        return;
      }
  
      console.log("Marca inserido: ", { id: res.insertId, ...newMarca });
      result(null, { id: res.insertId, ...newMarca });
    });
  }

  Marca.updateById = (id, Marca, result) => {
    sql.query(
      'UPDATE marca SET nome = ? WHERE id = ?',
      [Marca.nome, id],
      (err, res) => {
        if (err) {
          console.log('error: ', err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          // not found Marca
          result({ Marca: "not_found" }, null);
          return;
        }
  
        console.log('Marca atualizada: ', { id: id, ...Marca });
        result(null, { id: id, ...Marca });
      }
    );
  };

  Marca.delete = (id, result) => {
    sql.query('DELETE FROM marca WHERE id = ?', id, (err, res) => {
      if (err) {
        console.log('error: ', err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Marca with the id
        result({ Marca: "not_found" }, null);
        return;
      }
  
      console.log("Marca eliminada com o id: ", id);
      result(null, res);
    });
  };

module.exports = Marca;
