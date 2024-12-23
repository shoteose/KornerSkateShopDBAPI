-- Estrutura das tabelas e inserção de dados iniciais

-- Tabela `categoria`
CREATE TABLE `categoria` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `descricao` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `categoria` (`descricao`) VALUES
('Tshirt'),
('Casaco'),
('Hoodie'),
('Calças'),
('Trucks'),
('Tábuas'),
('Rodas'),
('Rolamentos');

-- Tabela `cor`
CREATE TABLE `cor` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `descricao` VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `cor` (`descricao`) VALUES
('Vermelho'),
('Azul'),
('Preto'),
('Branco'),
('Verde');

-- Tabela `fotos`
CREATE TABLE `fotos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome_arquivo` VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- Tabela `genero`
CREATE TABLE `genero` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `descricao` VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `genero` (`descricao`) VALUES
('Masculino'),
('Feminino'),
('Unisexo');

-- Tabela `marca`
CREATE TABLE `marca` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `marca` (`nome`) VALUES
('Antihero'),
('Creature'),
('Santa Cruz');

-- Tabela `media`
CREATE TABLE `media` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `titulo` VARCHAR(100) NOT NULL,
  `descricao` TEXT,
  `url` VARCHAR(255)
) ENGINE=InnoDB;

INSERT INTO `media` (`titulo`, `descricao`, `url`) VALUES
('Evento End of Summer', 'Evento da korner no inicio de setembro, para finalizar o verão', 'www.youtube.com/video-exemplo');

-- Tabela `peca`
CREATE TABLE `peca` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` VARCHAR(150),
  `imagemTextura` BLOB NOT NULL,
  `tridimensional` TINYINT(1) NOT NULL,
  `id_cor` INT,
  `id_marca` INT,
  `id_categoria` INT,
  `id_genero` INT,
  `preco` INT NOT NULL DEFAULT 0,
  `taxa_iva` FLOAT NOT NULL DEFAULT 23,
  `taxa_desconto` FLOAT NOT NULL DEFAULT 0,
  FOREIGN KEY (`id_cor`) REFERENCES `cor` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO `peca` (`nome`, `descricao`, `imagemTextura`, `tridimensional`, `id_cor`, `id_marca`, `id_categoria`, `id_genero`,`preco`, `taxa_iva`, `taxa_desconto`) VALUES
('Roda Classic', 'Roda de skate de alta performance', '', 0, 1, 3, 7, 3, 44, 23, 10),
('T-shirt Logo Antihero', 'T-shirt com o logo da marca Antihero', '', 0, 2, 1, 1, 1,35, 23, 5),
('T-shirt 1', 'T-shirt com o logo 1', '', 0, 2, 1, 1, 1,35, 23, 5),
('T-shirt 2', 'T-shirt com o logo 2', '', 0, 2, 1, 1, 1,35, 23, 5),
('Hoodie Creature', 'Hoodie confortável da marca Creature', '', 0, 3, 2, 3, 3, 23,80 ,15);

-- Tabela `pecas_fotos`
CREATE TABLE `pecas_fotos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `id_peca` INT NOT NULL,
  `id_foto` INT NOT NULL,
  FOREIGN KEY (`id_peca`) REFERENCES `peca` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_foto`) REFERENCES `fotos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Tabela `tamanho`
CREATE TABLE `tamanho` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `descricao` VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `tamanho` (`descricao`) VALUES
('S'),
('M'),
('L'),
('XL'),
('XXL');

-- Tabela `stock`
CREATE TABLE `stock` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `id_peca` INT NOT NULL,
  `id_tamanho` INT NOT NULL,
  `quantidade` INT NOT NULL,
  FOREIGN KEY (`id_peca`) REFERENCES `peca` (`id`) ON DELETE CASCADE,
  FOREIGN KEY (`id_tamanho`) REFERENCES `tamanho` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO `stock` (`id_peca`, `id_tamanho`, `quantidade`) VALUES
(1, 1, 50),
(2, 2, 30),
(3, 3, 20);


-- Tabela `tipo_user`
CREATE TABLE `tipo_user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `descricao` VARCHAR(50) NOT NULL
) ENGINE=InnoDB;

INSERT INTO `tipo_user` (`descricao`) VALUES
('Administrador'),
('Utilizador');

-- Tabela `user`
CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(100) NOT NULL,
  `pass` VARCHAR(255) NOT NULL,
  `id_tipoUser` INT NOT NULL,
  FOREIGN KEY (`id_tipoUser`) REFERENCES `tipo_user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

INSERT INTO `user` (`email`, `pass`, `id_tipoUser`) VALUES
('admin@admin.admin', 'adimin', 1);
