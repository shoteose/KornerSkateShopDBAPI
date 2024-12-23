const Marca = require("../models/marca.model.js");

exports.insert = (req, res) => {
    // Validar a request
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).send({
        message: "O conteúdo da marca deve estar definido."
      });
    } else {
    // Criar uma "Marca"
    const marca = new Marca({
      nome: req.body.nome,
    });
  
    // Guardar "Marca" na base de dados
    Marca.insert(marca, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao inserir a marca..."
        });
      else res.send(data);
    });
  }
};

// Atualizar a marca pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da marcas deve estar definido."
    });
  }

  Marca.updateById(
    req.params.id,
    new Marca(req.body),
    (err, data) => {
      if (err) {
        if (err.Marca === "not_found") {
          res.status(404).send({
             message: `Não foi encontrado a marca com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
             message: `Foi gerado um erro a atualizar a marca com id = ${req.params.id}.`
          });
        }
      } else res.send(data);
    }
  );
};


  // Apagar uma marca pelo seu id
  exports.delete = (req, res) => {
    Marca.delete(req.params.id, (err, data) => {
      if (err) {
        if (err.Jogo === "not_found") {
          res.status(404).send({
            message: `Não foi encontrado a marca com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Foi gerado um erro a apagar a marca com id = ${req.params.id}.`
          });
        }
      } else res.send({ message: 'A marca foi eliminada com sucesso.' });
    });
  };

// Receber todos as marcas da base de dados
exports.getAll = (req, res) => {
  Marca.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da(s) marca(s)...",
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  const id = req.params.id; 
  Marca.getById((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da marca...",
      });
    else res.send(data);
  });
};