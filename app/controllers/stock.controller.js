const Stock = require("../models/stock.model.js");

exports.insert = (req, res) => {

  // Validar a request
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo da stock deve estar definido."
    });
  } else {
    // Criar uma "Stock"
    const stock = new Stock({
      id_peca: req.body.id_peca,
      id_tamanho: req.body.id_tamanho,
      quantidade: req.body.quantidade
    });

    // Guardar "Stock" na base de dados
    Stock.insert(stock, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao inserir a stock..."
        });
      else res.send(data);
    });
  }
};

// Atualizar a stock pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da stocks deve estar definido."
    });
  }

  Stock.updateById(
    req.params.id,
    new Stock(req.body),
    (err, data) => {
      if (err) {
        if (err.Stock === "not_found") {
          res.status(404).send({
            message: `Não foi encontrado a stock com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Foi gerado um erro a atualizar a stock com id = ${req.params.id}.`
          });
        }
      } else res.send(data);
    }
  );
};


// Apagar uma stock pelo seu id
exports.delete = (req, res) => {
  Stock.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.Jogo === "not_found") {
        res.status(404).send({
          message: `Não foi encontrado a stock com id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar a stock com id = ${req.params.id}.`
        });
      }
    } else res.send({ message: 'A stock foi eliminada com sucesso.' });
  });
};

// Receber todos as stocks da base de dados
exports.getAll = (req, res) => {
  Stock.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ostockreu um erro na obtenção da(s) stock(s)...",
      });
    else res.send(data);
  });
};

// Devolver uma stock pelo seu id
exports.getById = (req, res) => {
  Stock.getById(req.params.id, (err, data) => {
    if (err) {
      if (err.Jogo === "not_found") {
        res.status(404).send({
          message: `Não foi encontrado a stock com id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Não foi encontrado a stock com id = " + req.params.id
        });
      }
    } else res.send(data);
  });
};