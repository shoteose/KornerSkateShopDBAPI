const User = require("../models/user.model.js");

exports.insert = (req, res) => {
    // Validar a request
    if (!req.body || Object.keys(req.body).length === 0) {
        res.status(400).send({
            message: "O conteúdo da user deve estar definido."
        });
    } else {
        // Criar uma "User"
        const user = new User({
            
            email: req.body.email,
            nome: req.body.nome,
            apelido: req.body.apelido,
            pass: req.body.pass,
            
        });

        // Guardar "User" na base de dados
        User.insert(user, (err, data) => {
            if (err)
                res.status(500).send({
                    message:
                        err.message || "Ocorreu um erro ao inserir a user..."
                });
            else res.send(data);
        });
    }
};

// Atualizar a user pelo seu id
exports.update = (req, res) => {
    // Validar a request
    if (!req.body) {
        res.status(400).send({
            message: "O conteúdo da users deve estar definido."
        });
    }

    User.updateById(
        req.params.id,
        new User(req.body),
        (err, data) => {
            if (err) {
                if (err.User === "not_found") {
                    res.status(404).send({
                        message: `Não foi encontrado a user com id = ${req.params.id}.`
                    });
                } else {
                    res.status(500).send({
                        message: `Foi gerado um erro a atualizar a user com id = ${req.params.id}.`
                    });
                }
            } else res.send(data);
        }
    );
};


// Apagar uma user pelo seu id
exports.delete = (req, res) => {
    User.delete(req.params.id, (err, data) => {
        if (err) {
            if (err.Jogo === "not_found") {
                res.status(404).send({
                    message: `Não foi encontrado a user com id = ${req.params.id}.`
                });
            } else {
                res.status(500).send({
                    message: `Foi gerado um erro a apagar a user com id = ${req.params.id}.`
                });
            }
        } else res.send({ message: 'A user foi eliminada com sucesso.' });
    });
};

// Receber todos as users da base de dados
exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Ocorreu um erro na obtenção da(s) user(s)...",
            });
        else res.send(data);
    });
};

exports.emailcheck = (req, res) => {
     const email = req.params.email;
    User.emailcheck(email,(err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Ocorreu um erro na obtenção da User...",
        });
      else res.send(data);
    });
  };
  

exports.getById = (req, res) => {
  const id = req.params.id; 
  User.getById(id,(err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Ocorreu um erro na obtenção da User...",
      });
    else res.send(data);
  });
};

exports.login = (req, res) => {
    const logUser = {
        email: req.body.email, // Dados recebidos no corpo da requisição
        pass: req.body.pass
    };

    console.log("Tentativa de login com email: " + logUser.email + " e senha: " + logUser.pass);
    User.login(logUser, (err, data) => {
        if (err) {
            console.error("Erro ao tentar fazer login:", err);
            res.status(500).send({
                message: err.message || "Ocorreu um erro ao tentar fazer o login."
            });
            return;
        } else if (!data) {
            console.log("Login falhou: email ou pass inválidos.");
            res.status(401).send({
                message: "Dados Inválidos."
            });
            return;
        } else {
            console.log("Login bem-sucedido:", data);
            res.send(data);
            return;
        }
    });
};
