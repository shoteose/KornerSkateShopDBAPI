const Media = require("../models/media.model.js");

exports.insert = (req, res) => {
    // Validar a request
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "O conteúdo da media deve estar definido."
        });
    } else {
        // Criar uma "Media"
        const media = new Media({
            titulo: req.body.titulo,
            descricao: req.body.descricao,
            url: req.body.url,
        });

        // Guardar "Media" na base de dados
        Media.insert(media, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Ocorreu um erro ao inserir a media..."
                });
            else res.send(data);
        });
    }
};

// Atualizar a media pelo seu id
exports.update = (req, res) => {
    // Validar a request
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo da medias deve estar definido."
        });
    }

    Media.updateById(
        req.params.id,
        new Media(req.body),
        (err, data) => {
            if (err) {
                if (err.Media === "not_found") {
                    res.status(404).send({
                        message: `Não foi encontrado a media com id = ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Foi gerado um erro a atualizar a media com id = ${req.params.id}.`
                    });
                }
            } else res.send(data);
        }
    );
};


// Apagar uma media pelo seu id
exports.delete = (req, res) => {
    Media.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.Jogo === "not_found") {
                res.status(404).send({
                    message: `Não foi encontrado a media com id = ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Foi gerado um erro a apagar a media com id = ${req.params.id}.`
                });
            }
        } else res.send({ message: 'A media foi eliminada com sucesso.' });
    });
};

// Receber todos as medias da base de dados
exports.getAll = (req, res) => {
    Media.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocorreu um erro na obtenção da(s) media(s)...",
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
  const id = req.params.id; 
  Media.getById((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da Media...",
      });
    else res.send(data);
  });
};