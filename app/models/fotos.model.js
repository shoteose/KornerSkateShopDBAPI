const sql = require("./db.js");

// construtor
const Fotos = function (fotos) {
    this.nome_arquivo = fotos.nome_arquivo;
};


Fotos.getAll = (result) => {
    let query;
    query = "SELECT * FROM fotos ORDER BY id DESC";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Fotoss: ", res);
        result(null, res);
    });
};

Fotos.insert = (newFotos, result) => {
    sql.query('INSERT INTO fotos SET ?', newFotos, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log("Fotos inserido: ", { id: res.insertId, ...newFotos });
        result(null, { id: res.insertId, ...newFotos });
    });
}

Fotos.getById = (id, result) => {
    let query;
    query = "SELECT * FROM fotos WHERE id = ?";
  
    sql.query(query, id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Fotos: ", res);
      result(null, res);
    });
  };

Fotos.updateById = (id, Fotos, result) => {
    sql.query(
        'UPDATE fotos SET titulo = ? ,descricao = ? , url = ? WHERE id = ?',
        [Fotos.titulo ,Fotos.descricao, Fotos.url , id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Fotos
                result({ Fotos: "not_found" }, null);
                return;
            }

            console.log('Fotos atualizada: ', { id: id, ...Fotos });
            result(null, { id: id, ...Fotos });
        }
    );
};

Fotos.delete = (id, result) => {
    sql.query('DELETE FROM fotos WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Fotos with the id
            result({ Fotos: "not_found" }, null);
            return;
        }

        console.log("Fotos eliminada com o id: ", id);
        result(null, res);
    });
};

module.exports = Fotos;
