const sql = require("./db.js");

// Construtor
const Peca = function (peca) {
  this.nome = peca.nome;
  this.descricao = peca.descricao;
  this.id_cor = peca.id_cor;
  this.id_marca = peca.id_marca;
  this.id_categoria = peca.id_categoria;
  this.id_genero = peca.id_genero;
  this.preco = peca.preco;
  this.taxa_iva = peca.taxa_iva;
  this.taxa_desconto = peca.taxa_desconto;
  this.tridimensional = peca.tridimensional;
  this.imagemTextura = peca.imagemTextura ? peca.imagemTextura : null;
};

Peca.getAllPecas = (nome, result) => {
  let query = `
 SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    p.id_cor,
    p.id_marca,
    p.id_categoria,
    p.id_genero,
    p.tridimensional,
    p.imagemTextura,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.preco,
    p.taxa_iva,
    p.taxa_desconto,
    (SELECT f.nome_arquivo 
 FROM pecas_fotos pf 
 LEFT JOIN fotos f ON pf.id_foto = f.id 
 WHERE pf.id_peca = p.id 
 LIMIT 1) AS nome_arquivo
FROM 
    peca p
LEFT JOIN cor c ON p.id_cor = c.id
LEFT JOIN marca m ON p.id_marca = m.id
LEFT JOIN categoria cat ON p.id_categoria = cat.id
LEFT JOIN genero g ON p.id_genero = g.id
LEFT JOIN pecas_fotos pf ON p.id = pf.id_peca
LEFT JOIN fotos f ON pf.id_foto = f.id
GROUP BY 
    p.id, 
    p.nome, 
    p.descricao, 
    p.id_cor, 
    p.id_marca, 
    p.id_categoria, 
    p.id_genero, 
    p.tridimensional, 
    p.imagemTextura, 
    c.descricao, 
    m.nome, 
    cat.descricao, 
    g.descricao, 
    p.preco, 
    p.taxa_iva, 
    p.taxa_desconto;

  `;

  if (nome) {
    query += ` WHERE nome LIKE '%${nome}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    ////console.log("pecas: ", res);
    result(null, res);
  });
};

Peca.getAllPecasCategoriaUnity = (categoria, result) => {
  //console.log("teste tes");
  //console.log("Model foi chamado.");
  //console.log("Categoria recebida no model:", categoria);

  let query = `SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    p.tridimensional,
    p.imagemTextura,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.preco,
    p.taxa_iva,
    p.taxa_desconto,

      (SELECT GROUP_CONCAT(CONCAT(t.descricao, ': ', s.quantidade) SEPARATOR ',') 
     FROM stock s 
     LEFT JOIN tamanho t ON s.id_tamanho = t.id 
     WHERE s.id_peca = p.id) AS stock

    FROM 
    peca p
    LEFT JOIN cor c ON p.id_cor = c.id
    LEFT JOIN marca m ON p.id_marca = m.id
    LEFT JOIN categoria cat ON p.id_categoria = cat.id
    LEFT JOIN genero g ON p.id_genero = g.id
    WHERE 
    p.id_categoria IN (
        SELECT id 
        FROM categoria 
        WHERE descricao LIKE ?
    )
    AND
    p.tridimensional = 1;
  `;

  // Passando o parâmetro corretamente
  const params = [`${categoria}`];

  //console.log("Parâmetros:", params);

  sql.query(query, params, (err, res) => {
    if (err) {
      //console.log("Erro ao executar query: ", err);
      result(null, err);
      return;
    }
    //console.log("Peca: ", res);
    result(null, res);
  });
};

Peca.getById = (id, result) => {
  let query;
  query = `SELECT 
  p.id AS id, 
  p.nome AS nome, 
  p.descricao AS descricao, 
  p.id_marca,
  p.id_cor,
  p.id_categoria,
  p.id_genero,
  p.tridimensional,
  p.imagemTextura,
  c.descricao AS cor, 
  m.nome AS marca, 
  cat.descricao AS categoria, 
  g.descricao AS genero, 
  p.preco, 
  p.taxa_iva, 
  p.taxa_desconto, 
  t.descricao AS tamanho, 
  SUM(s.quantidade) AS quantidade_total_stock, 
  (SELECT COUNT(f.id) 
   FROM pecas_fotos pf 
   LEFT JOIN fotos f ON pf.id_foto = f.id 
   WHERE pf.id_peca = p.id) AS quantidade_fotos,
  (SELECT GROUP_CONCAT(f.nome_arquivo SEPARATOR ', ') 
   FROM pecas_fotos pf 
   LEFT JOIN fotos f ON pf.id_foto = f.id 
   WHERE pf.id_peca = p.id) AS caminhos_fotos 
FROM 
  peca p 
LEFT JOIN cor c ON p.id_cor = c.id 
LEFT JOIN marca m ON p.id_marca = m.id 
LEFT JOIN categoria cat ON p.id_categoria = cat.id 
LEFT JOIN genero g ON p.id_genero = g.id 
LEFT JOIN stock s ON p.id = s.id_peca 
LEFT JOIN tamanho t ON s.id_tamanho = t.id 
WHERE 
  p.id = ? 
GROUP BY 
  p.id, t.descricao;
`;

  sql.query(query, id, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("Peca: ", res);
    result(null, res);
  });
};

Peca.getAllPecasNomeCategoria = (categoria, result) => {
  let query = `SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.taxa_iva,
    p.taxa_desconto,
    (SELECT f.nome_arquivo 
 FROM pecas_fotos pf 
 LEFT JOIN fotos f ON pf.id_foto = f.id 
 WHERE pf.id_peca = p.id 
 LIMIT 1) AS nome_arquivo
    FROM 
    peca p
    LEFT JOIN cor c ON p.id_cor = c.id
    LEFT JOIN marca m ON p.id_marca = m.id
    LEFT JOIN categoria cat ON p.id_categoria = cat.id
    LEFT JOIN genero g ON p.id_genero = g.id
    LEFT JOIN pecas_fotos pf ON p.id = pf.id_peca
LEFT JOIN fotos f ON pf.id_foto = f.id
    WHERE 
    p.id_categoria IN (
        SELECT id 
        FROM categoria 
        WHERE descricao LIKE ?
    );`;

  sql.query(query, [`%${categoria}%`], (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Peca.getAllPecasByCategoriaId = ($id, result) => {
  let query = `SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.preco,
    p.taxa_iva,
    p.taxa_desconto,
    (SELECT f.nome_arquivo 
 FROM pecas_fotos pf 
 LEFT JOIN fotos f ON pf.id_foto = f.id 
 WHERE pf.id_peca = p.id 
 LIMIT 1) AS nome_arquivo
FROM 
    peca p
LEFT JOIN cor c ON p.id_cor = c.id
LEFT JOIN marca m ON p.id_marca = m.id
LEFT JOIN categoria cat ON p.id_categoria = cat.id
LEFT JOIN genero g ON p.id_genero = g.id
LEFT JOIN pecas_fotos pf ON p.id = pf.id_peca
LEFT JOIN fotos f ON pf.id_foto = f.id
WHERE 
    p.id_categoria = ?
GROUP BY 
    p.id, 
    p.nome, 
    p.descricao, 
    p.id_cor, 
    p.id_marca, 
    p.id_categoria, 
    p.id_genero, 
    p.tridimensional, 
    p.imagemTextura, 
    c.descricao, 
    m.nome, 
    cat.descricao, 
    g.descricao, 
    p.preco, 
    p.taxa_iva, 
    p.taxa_desconto;
`;

  sql.query(query, [$id], (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Peca.getAllPecasByGeneroId = ($id, result) => {
  let query = `
SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.preco,
    p.taxa_iva,
    p.taxa_desconto,
    (SELECT f.nome_arquivo 
 FROM pecas_fotos pf 
 LEFT JOIN fotos f ON pf.id_foto = f.id 
 WHERE pf.id_peca = p.id 
 LIMIT 1) AS nome_arquivo
    FROM 
    peca p
    LEFT JOIN cor c ON p.id_cor = c.id
    LEFT JOIN marca m ON p.id_marca = m.id
    LEFT JOIN categoria cat ON p.id_categoria = cat.id
    LEFT JOIN genero g ON p.id_genero = g.id
    LEFT JOIN pecas_fotos pf ON p.id = pf.id_peca
LEFT JOIN fotos f ON pf.id_foto = f.id
    WHERE 
    p.id_genero = ?
GROUP BY 
    p.id, 
    p.nome, 
    p.descricao, 
    p.id_cor, 
    p.id_marca, 
    p.id_categoria, 
    p.id_genero, 
    p.tridimensional, 
    c.descricao, 
    m.nome, 
    cat.descricao, 
    g.descricao, 
    p.preco, 
    p.taxa_iva, 
    p.taxa_desconto;
  `;

  sql.query(query, $id, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Peca.getAllPecasByMarcaId = ($id, result) => {
  let query = `SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.preco,
    p.taxa_iva,
    p.taxa_desconto,
    (SELECT f.nome_arquivo 
 FROM pecas_fotos pf 
 LEFT JOIN fotos f ON pf.id_foto = f.id 
 WHERE pf.id_peca = p.id 
 LIMIT 1) AS nome_arquivo
    FROM 
    peca p
    LEFT JOIN cor c ON p.id_cor = c.id
    LEFT JOIN marca m ON p.id_marca = m.id
    LEFT JOIN categoria cat ON p.id_categoria = cat.id
    LEFT JOIN genero g ON p.id_genero = g.id
    LEFT JOIN pecas_fotos pf ON p.id = pf.id_peca
LEFT JOIN fotos f ON pf.id_foto = f.id
    WHERE 
    p.id_marca = ?
GROUP BY 
    p.id, 
    p.nome, 
    p.descricao, 
    p.id_cor, 
    p.id_marca, 
    p.id_categoria, 
    p.id_genero, 
    p.tridimensional, 
    c.descricao, 
    m.nome, 
    cat.descricao, 
    g.descricao, 
    p.preco, 
    p.taxa_iva, 
    p.taxa_desconto;
`;

  sql.query(query, [$id], (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Peca.getAllPecasComDesconto = ($id, result) => {

  let query = `SELECT 
    p.id AS id,
    p.nome AS nome,
    p.descricao AS descricao,
    c.descricao AS cor,
    m.nome AS marca,
    cat.descricao AS categoria,
    g.descricao AS genero,
    p.preco,
    p.taxa_iva,
    p.taxa_desconto,
    (SELECT f.nome_arquivo 
 FROM pecas_fotos pf 
 LEFT JOIN fotos f ON pf.id_foto = f.id 
 WHERE pf.id_peca = p.id 
 LIMIT 1) AS nome_arquivo
    FROM 
    peca p
    LEFT JOIN cor c ON p.id_cor = c.id
    LEFT JOIN marca m ON p.id_marca = m.id
    LEFT JOIN categoria cat ON p.id_categoria = cat.id
    LEFT JOIN genero g ON p.id_genero = g.id
    LEFT JOIN pecas_fotos pf ON p.id = pf.id_peca
LEFT JOIN fotos f ON pf.id_foto = f.id
    WHERE 
    p.taxa_desconto > 0
GROUP BY 
    p.id, 
    p.nome, 
    p.descricao, 
    p.id_cor, 
    p.id_marca, 
    p.id_categoria, 
    p.id_genero, 
    p.tridimensional, 
    c.descricao, 
    m.nome, 
    cat.descricao, 
    g.descricao, 
    p.preco, 
    p.taxa_iva, 
    p.taxa_desconto;
`;

  sql.query(query, [$id], (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Peca.insert = (newPeca, result) => {
  sql.query('INSERT INTO peca SET ?', newPeca, (err, res) => {
    if (err) {
      //console.log('error: ', err);
      result(err, null);
      return;
    }

    //console.log("Peca inserido: ", { id: res.insertId, ...newPeca });
    result(null, { id: res.insertId, ...newPeca });
  });
};

Peca.delete = (id, result) => {
  sql.query('DELETE FROM peca WHERE id = ?', id, (err, res) => {
    if (err) {
      //console.log('error: ', err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Peca with the id
      result({ Peca: "not_found" }, null);
      return;
    }

    //console.log("Peca eliminada com o id: ", id);
    result(null, res);
  });
};

Peca.updateById = (id, Peca, result) => {
  sql.query(
    'UPDATE peca SET ? WHERE id = ?',
    [Peca, id],
    (err, res) => {
      if (err) {
        //console.log('error: ', err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Peca
        result({ Peca: "not_found" }, null);
        return;
      }

      //console.log('Peca atualizada: ', { id: id, ...Peca });
      result(null, { id: id, ...Peca });
    }
  );
};

module.exports = Peca;
