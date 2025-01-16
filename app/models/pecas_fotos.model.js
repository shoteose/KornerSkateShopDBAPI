const sql = require("./db.js");

// construtor
const Pecas_Fotos = function (pecas_fotos) {
    this.id_peca = pecas_fotos.id_peca;
    this.id_foto = pecas_fotos.id_foto;
};

Pecas_Fotos.getAll = (result) => {
    let query;
    query = `
  SELECT
  pecas_fotos.id AS id,
  pecas_fotos.id_peca AS id_peca,
  pecas_fotos.id_foto AS id_foto
  FROM pecas_fotos
  LEFT JOIN peca p ON pecas_fotos.id_peca = p.id
  ORDER BY pecas_fotos.id_peca ASC
  `;

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("Pecas_Fotoses: ", res);
        result(null, res);
    });
};

Pecas_Fotos.getById = (id, result) => {
    let query;
    query = "SELECT * FROM pecas_fotos WHERE id_peca = ?";

    sql.query(query, id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        //console.log("Pecas_Fotos: ", res);
        result(null, res);
    });
};

Pecas_Fotos.insert = (newPecas_Fotos, result) => {
    console.log("Inserção de nova pecas_fotos:", newPecas_Fotos);

    sql.query('INSERT INTO pecas_fotos SET ?', newPecas_Fotos, (err, res) => {
        if (err) {
            console.error("error:", err);
            result(err, null);
            return;
        }

        //console.log("Pecas_Fotos inserida com sucesso: ", { id: res.insertId, ...newPecas_Fotos });
        result(null, { id: res.insertId, ...newPecas_Fotos });
    });
};


Pecas_Fotos.updateById = (id, Pecas_Fotos, result) => {
    sql.query(
        'UPDATE pecas_fotos SET descricao = ? WHERE id = ?',
        [Pecas_Fotos.descricao, id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Pecas_Fotos
                result({ Pecas_Fotos: "not_found" }, null);
                return;
            }

            //console.log('Pecas_Fotos atualizada: ', { id: id, ...Pecas_Fotos });
            result(null, { id: id, ...Pecas_Fotos });
        }
    );
};

Pecas_Fotos.delete = (id, result) => {
    sql.query('DELETE FROM pecas_fotos WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ Pecas_Fotos: "not_found" }, null);
            return;
        }

        console.log("Pecas_Fotos eliminada com o id: ", id);
        result(null, res);
    });
};

module.exports = Pecas_Fotos;
