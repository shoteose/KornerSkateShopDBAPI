const Pecas_fotos = require("../models/pecas_fotos.model.js");

exports.insert = (req, res) => {
    // Validar a request
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "O conteúdo da pecas_fotos deve estar definido."
        });
    } else {
        // Criar uma "Pecas_fotos"
        const pecas_fotos = new Pecas_fotos({
            id_peca: req.body.id_peca,
            id_foto: req.body.id_foto
        });

        // Guardar "Pecas_fotos" na base de dados
        Pecas_fotos.insert(pecas_fotos, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Ocorreu um erro ao inserir a pecas_fotos..."
                });
            else res.send(data);
        });
    }
};

// Atualizar a pecas_fotos pelo seu id
exports.update = (req, res) => {
    // Validar a request
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo da pecas_fotoss deve estar definido."
        });
    }

    Pecas_fotos.updateById(
        req.params.id,
        new Pecas_fotos(req.body),
        (err, data) => {
            if (err) {
                if (err.Pecas_fotos === "not_found") {
                    res.status(404).send({
                        message: `Não foi encontrado a pecas_fotos com id = ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Foi gerado um erro a atualizar a pecas_fotos com id = ${req.params.id}.`
                    });
                }
            } else res.send(data);
        }
    );
};


// Apagar uma pecas_fotos pelo seu id
exports.delete = (req, res) => {
    Pecas_fotos.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.Jogo === "not_found") {
                res.status(404).send({
                    message: `Não foi encontrado a pecas_fotos com id = ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Foi gerado um erro a apagar a pecas_fotos com id = ${req.params.id}.`
                });
            }
        } else res.send({ message: 'A pecas_fotos foi eliminada com sucesso.' });
    });
};

// Receber todos as pecas_fotoss da base de dados
exports.getAll = (req, res) => {
    Pecas_fotos.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocorreu um erro na obtenção da(s) pecas_fotos(s)...",
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
  const id = req.params.id; 
  Pecas_fotos.getById(id,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da Pecas_fotos...",
      });
    else res.send(data);
  });
};