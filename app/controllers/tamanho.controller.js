const Tamanho = require("../models/tamanho.model.js");

exports.insert = (req, res) => {

  console.log("papa");
  // Validar a request
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo da tamanho deve estar definido."
    });
  } else {
    // Criar uma "Tamanho"
    const tamanho = new Tamanho({
      descricao: req.body.descricao,
    });

    // Guardar "Tamanho" na base de dados
    Tamanho.insert(tamanho, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao inserir a tamanho..."
        });
      else res.send(data);
    });
  }
};

// Atualizar a tamanho pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da tamanhos deve estar definido."
    });
  }

  Tamanho.updateById(
    req.params.id,
    new Tamanho(req.body),
    (err, data) => {
      if (err) {
        if (err.Tamanho === "not_found") {
          res.status(404).send({
            message: `Não foi encontrado a tamanho com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Foi gerado um erro a atualizar a tamanho com id = ${req.params.id}.`
          });
        }
      } else res.send(data);
    }
  );
};

// Apagar uma tamanho pelo seu id
exports.delete = (req, res) => {
  Tamanho.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.Jogo === "not_found") {
        res.status(404).send({
          message: `Não foi encontrado a tamanho com id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar a tamanho com id = ${req.params.id}.`
        });
      }
    } else res.send({ message: 'A tamanho foi eliminada com sucesso.' });
  });
};

// Receber todos as tamanhos da base de dados
exports.getAll = (req, res) => {
  Tamanho.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da(s) tamanho(s)...",
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id;
  Tamanho.getById(id,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção do Tamanho...",
      });
    else res.send(data);
  });
};