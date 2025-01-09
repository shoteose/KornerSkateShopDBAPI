const Peca = require("../models/peca.model.js");
const zlib = require('zlib');

function compressorImagem(data) {
  const buffer = Buffer.from(data, 'base64');
  const comprimido = zlib.deflateSync(buffer, { level: 9 });

  console.log(data.length);
  console.log("_________________");
  console.log(comprimido.length);
  // ver se é menor que 40mb
  if (comprimido.length > 40 * 1024 * 1024) {
    throw new Error('O tamanho do arquivo comprimido excede 40 MB.');
  }

  return comprimido; // Retorna o binário comprimido
}

function decompressorImagem(dadosComprimidos) {
  return zlib.inflateSync(dadosComprimidos);
}


exports.getAllPecas = (req, res) => {
  const title = req.query.nome;

  //req.body.$imagemBinaria = decompressorImagem(req.body.$imagemBinaria);
  /*
    if (req.body.$imagemBinaria != null) {
      try {
        req.body.$imagemBinaria = decompressorImagem(req.body.$imagemBinaria);
      } catch (error) {
        console.error("Erro ao descomprimir a imagem:", error.message);
        return res.status(400).send({
          message: "Erro ao descomprimir os dados da imagem.",
        });
      }
    }
  */

  Peca.getAllPecas(title, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da(s) Pecas(s)...",
      });
    } else {

      // descomprimir cada imagem de Textura
      data.forEach((peca) => {
        if (peca.imagemTextura != null) {
          try {
            // Descomprimir a imagem
            peca.imagemTextura = decompressorImagem(peca.imagemTextura);
          } catch (error) {
            console.error(error.message);
          }
        }
      });

      res.send(data);
    }
  });
};

exports.insert = (req, res) => {
  // Validar a request
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).send({
      message: "O conteúdo da Peca deve estar definido."
    });
  } else {
    // Criar uma "Peca"
    if (req.body.imagemTextura != null) {
      console.log("recebi imagem");
      $imagemBinaria = compressorImagem(req.body.imagemTextura);
    } else {
      $imagemBinaria = null;
    }

    const peca = new Peca({
      nome: req.body.nome,
      descricao: req.body.descricao,
      id_cor: req.body.id_cor,
      id_marca: req.body.id_marca,
      id_categoria: req.body.id_categoria,
      id_genero: req.body.id_genero,
      tridimensional: req.body.tridimensional,
      preco: req.body.preco,
      taxa_iva: req.body.taxa_iva,
      taxa_desconto: req.body.taxa_desconto,
      imagemTextura: $imagemBinaria
    });

    // Guardar "Peca" na base de dados
    Peca.insert(peca, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Ocorreu um erro ao inserir a Peca..."
        });
      else {
        res.send(data);
      }
    });
  }
};

// Atualizar a Peca pelo seu id
exports.update = (req, res) => {
  // Validar a request
  if (!req.body) {
    res.status(400).send({
      message: "O conteúdo da Pecas deve estar definido."
    });
  }

  let peca = new Peca(req.body);

  if (peca.imagemTextura != null) {
    peca.imagemTextura = compressorImagem(req.body.imagemTextura);
  } else {
    peca.imagemTextura = null;
  }

  if (peca.tridimensional == 0) {
    peca.imagemTextura = null;
  }

  Peca.updateById(
    req.params.id,
    peca,

    (err, data) => {
      if (err) {
        if (err.Peca === "not_found") {
          res.status(404).send({
            message: `Não foi encontrado a Peca com id = ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: `Foi gerado um erro a atualizar a Peca com id = ${req.params.id}.`
          });
        }
      } else {
        res.send(data);
      }
    }
  );
};

// Apagar uma Peca pelo seu id
exports.delete = (req, res) => {
  Peca.delete(req.params.id, (err, data) => {
    if (err) {
      if (err.Jogo === "not_found") {
        res.status(404).send({
          message: `Não foi encontrado a Peca com id = ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: `Foi gerado um erro a apagar a Peca com id = ${req.params.id}.`
        });
      }
    } else res.send({ message: 'A Peca foi eliminada com sucesso.' });
  });
};

exports.getAllPecasCategoriaUnity = (req, res) => {
  const categoria = req.query.categoria;

  Peca.getAllPecasCategoriaUnity(categoria, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da(s) Pecas(s)...",
      });
    } else {

      // descomprimir cada imagem de Textura
      data.forEach((peca) => {
        if (peca.imagemTextura != null) {
          try {
            // Descomprimir a imagem
            peca.imagemTextura = decompressorImagem(peca.imagemTextura);
          } catch (error) {
            console.error(error.message);
          }
        }
      });

      res.send(data);
    }
  });
};

exports.getAllPecasByCategoriaId = (req, res) => {

  const id = req.params.id;
  Peca.getAllPecasByCategoriaId(id, (err, data) => {

    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da Peca...",
      });
    } else {
      res.send(data);
    }
  });

};

exports.getAllPecasByGeneroId = (req, res) => {

  const id = req.params.id;
  console.log(id);
  Peca.getAllPecasByGeneroId(id, (err, data) => {

    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da Peca...",
      });
    } else {
      res.send(data);
    }

  });

};

exports.getAllPecasByMarcaId = (req, res) => {

  const id = req.params.id;
  Peca.getAllPecasByMarcaId(id, (err, data) => {

    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da Peca...",
      });
    } else {
      res.send(data);
    }

  });

};

exports.getAllPecasComDesconto = (req, res) => {

  const id = req.params.id;
  Peca.getAllPecasComDesconto(id, (err, data) => {

    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da Peca...",
      });
    } else {
      res.send(data);
    }

  });

};


exports.getById = (req, res) => {
  const id = req.params.id;
  Peca.getById(id, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da Peca...",
      });
    } else {
      // descomprimir cada imagem de Textura
      data.forEach((peca) => {
        if (peca.imagemTextura != null) {
          try {
            // Descomprimir a imagem
            peca.imagemTextura = decompressorImagem(peca.imagemTextura);
          } catch (error) {
            console.error(error.message);
          }
        }
      });

      res.send(data);
    }
  });
};

