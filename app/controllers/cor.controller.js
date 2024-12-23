const Cor = require("../models/cor.model.js");

exports.insert = (req, res) => {

  // Validar a request
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo da cor deve estar definido."
    });
  } else {
    // Criar uma "Cor"
    const cor = new Cor({
      descricao: req.body.descricao,
    });

    // Guardar "Cor" na base de dados
    Cor.insert(cor, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao inserir a cor..."
        });
      else res.send(data);
    });
  }
};

// Atualizar a cor pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da cors deve estar definido."
    });
  }

  Cor.updateById(
    req.params.id,
    new Cor(req.body),
    (err, data) => {
      if (err) {
        if (err.Cor === "not_found") {
          res.status(404).send({
            message: `Não foi encontrado a cor com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Foi gerado um erro a atualizar a cor com id = ${req.params.id}.`
          });
        }
      } else res.send(data);
    }
  );
};


// Apagar uma cor pelo seu id
exports.delete = (req, res) => {
  Cor.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.Jogo === "not_found") {
        res.status(404).send({
          message: `Não foi encontrado a cor com id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar a cor com id = ${req.params.id}.`
        });
      }
    } else res.send({ message: 'A cor foi eliminada com sucesso.' });
  });
};

// Receber todos as cors da base de dados
exports.getAll = (req, res) => {
  Cor.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da(s) cor(s)...",
      });
    else res.send(data);
  });
};

// Devolver uma cor pelo seu id
exports.getById = (req, res) => {
  Cor.getById(req.params.id, (err, data) => {
    if (err) {
      if (err.Jogo === "not_found") {
        res.status(404).send({
          message: `Não foi encontrado a cor com id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Não foi encontrado a cor com id = " + req.params.id
        });
      }
    } else res.send(data);
  });
};