const Peca = require("../models/peca.model.js");

exports.getAllPecas = (req, res) => {
  const title = req.query.nome;

  Peca.getAllPecas(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Ocorreu um erro na obtenção da(s) Pecas(s)..."
      });
    else res.send(data);
  });
};

