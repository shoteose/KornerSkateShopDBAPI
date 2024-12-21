const sql = require("./db.js");

// construtor
const Media = function (media) {
    this.titulo = media.titulo;
    this.descricao = media.descricao;
    this.url = media.url;
};


Media.getAll = (result) => {
    let query;
    query = "SELECT * FROM media";

    sql.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("Medias: ", res);
        result(null, res);
    });
};

Media.insert = (newMedia, result) => {
    sql.query('INSERT INTO media SET ?', newMedia, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        console.log("Media inserido: ", { id: res.insertId, ...newMedia });
        result(null, { id: res.insertId, ...newMedia });
    });
}

Media.getById = (id, result) => {
    let query;
    query = "SELECT * FROM media WHERE id = ?";
  
    sql.query(query, id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("Media: ", res);
      result(null, res);
    });
  };

Media.updateById = (id, Media, result) => {
    sql.query(
        'UPDATE media SET titulo = ? ,descricao = ? , url = ? WHERE id = ?',
        [Media.titulo ,Media.descricao, Media.url , id],
        (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Media
                result({ Media: "not_found" }, null);
                return;
            }

            console.log('Media atualizada: ', { id: id, ...Media });
            result(null, { id: id, ...Media });
        }
    );
};

Media.delete = (id, result) => {
    sql.query('DELETE FROM media WHERE id = ?', id, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Media with the id
            result({ Media: "not_found" }, null);
            return;
        }

        console.log("Media eliminada com o id: ", id);
        result(null, res);
    });
};

module.exports = Media;
