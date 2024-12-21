const Categoria = require("../models/categoria.model.js");

exports.insert = (req, res) => {
    // Validar a request
    if (!req.body || Object.keys(req.body).length === 0) {
      res.status(400).send({
        message: "O conteúdo da categoria deve estar definido."
      });
    } else {
    // Criar uma "Categoria"
    const categoria = new Categoria({
      descricao: req.body.descricao
    });
  
    // Guardar "Categoria" na base de dados
    Categoria.insert(categoria, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao inserir a categoria..."
        });
      else res.send(data);
    });
  }
};

// Atualizar a categoria pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da categorias deve estar definido."
    });
  }

  Categoria.updateById(
    req.params.id,
    new Categoria(req.body),
    (err, data) => {
      if (err) {
        if (err.Categoria === "not_found") {
          res.status(404).send({
             message: `Não foi encontrado a categoria com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
             message: `Foi gerado um erro a atualizar a categoria com id = ${req.params.id}.`
          });
        }
      } else res.send(data);
    }
  );
};


  // Apagar uma categoria pelo seu id
  exports.delete = (req, res) => {
    Categoria.delete(req.params.id, (err, data) => {
      if (err) {
        if (err.Jogo === "not_found") {
          res.status(404).send({
            message: `Não foi encontrado a categoria com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Foi gerado um erro a apagar a categoria com id = ${req.params.id}.`
          });
        }
      } else res.send({ message: 'A categoria foi eliminada com sucesso.' });
    });
  };

// Receber todos as categorias da base de dados
exports.getAll = (req, res) => {
  Categoria.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da(s) categoria(s)...",
      });
    else res.send(data);
  });
};

exports.getById = (req, res) => {
  Categoria.getById((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da categoria...",
      });
    else res.send(data);
  });
};
