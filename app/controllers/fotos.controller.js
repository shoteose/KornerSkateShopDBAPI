const Fotos = require("../models/fotos.model.js");

exports.insert = (req, res) => {
    // Validar a request
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "O conteúdo da fotos deve estar definido."
        });
    } else {
        // Criar uma "Fotos"
        const fotos = new Fotos({
            nome_arquivo: req.body.nome_arquivo
        });

        // Guardar "Fotos" na base de dados
        Fotos.insert(fotos, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Ocorreu um erro ao inserir a fotos..."
                });
            else res.send(data);
        });
    }
};

// Atualizar a fotos pelo seu id
exports.update = (req, res) => {
    // Validar a request
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo da fotoss deve estar definido."
        });
    }

    Fotos.updateById(
        req.params.id,
        new Fotos(req.body),
        (err, data) => {
            if (err) {
                if (err.Fotos === "not_found") {
                    res.status(404).send({
                        message: `Não foi encontrado a fotos com id = ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Foi gerado um erro a atualizar a fotos com id = ${req.params.id}.`
                    });
                }
            } else res.send(data);
        }
    );
};


// Apagar uma fotos pelo seu id
exports.delete = (req, res) => {
    Fotos.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.Jogo === "not_found") {
                res.status(404).send({
                    message: `Não foi encontrado a fotos com id = ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Foi gerado um erro a apagar a fotos com id = ${req.params.id}.`
                });
            }
        } else res.send({ message: 'A fotos foi eliminada com sucesso.' });
    });
};

// Receber todos as fotoss da base de dados
exports.getAll = (req, res) => {
    Fotos.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocorreu um erro na obtenção da(s) fotos(s)...",
            });
        else res.send(data);
    });
};

exports.getById = (req, res) => {
  const id = req.params.id; 
  Fotos.getById(id,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da Fotos...",
      });
    else res.send(data);
  });
};