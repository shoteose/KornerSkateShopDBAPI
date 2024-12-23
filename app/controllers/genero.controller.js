const Genero = require("../models/genero.model.js");

exports.insert = (req, res) => {
    // Validar a request
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).send({
        message: "O conteúdo da genero deve estar definido."
      });
    } else {
    // Criar uma "Genero"
    const genero = new Genero({
      descricao: req.body.descricao,
    });
  
    // Guardar "Genero" na base de dados
    Genero.insert(genero, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao inserir a genero..."
        });
      else res.send(data);
    });
  }
};

// Atualizar a genero pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da generos deve estar definido."
    });
  }

  Genero.updateById(
    req.params.id,
    new Genero(req.body),
    (err, data) => {
      if (err) {
        if (err.Genero === "not_found") {
          res.status(404).send({
             message: `Não foi encontrado a genero com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
             message: `Foi gerado um erro a atualizar a genero com id = ${req.params.id}.`
          });
        }
      } else res.send(data);
    }
  );
};


  // Apagar uma genero pelo seu id
  exports.delete = (req, res) => {
    Genero.delete(req.params.id, (err, data) => {
      if (err) {
        if (err.Jogo === "not_found") {
          res.status(404).send({
            message: `Não foi encontrado a genero com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Foi gerado um erro a apagar a genero com id = ${req.params.id}.`
          });
        }
      } else res.send({ message: 'A genero foi eliminada com sucesso.' });
    });
  };

// Receber todos as generos da base de dados
exports.getAll = (req, res) => {
  Genero.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da(s) genero(s)...",
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id; 
  Genero.getById((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção do Genero...",
      });
    else res.send(data);
  });
};