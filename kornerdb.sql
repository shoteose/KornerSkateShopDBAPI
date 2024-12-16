-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 16-Dez-2024 às 16:05
-- Versão do servidor: 10.4.32-MariaDB
-- versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `kornerdb`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`id`, `descricao`) VALUES
(1, 'Tshirt'),
(2, 'Casaco'),
(3, 'Hoodie'),
(4, 'Calças'),
(5, 'Trucks'),
(6, 'Tábuas'),
(7, 'Rodas'),
(8, 'Rolamentos');

-- --------------------------------------------------------

--
-- Estrutura da tabela `cor`
--

CREATE TABLE `cor` (
  `id` int(11) NOT NULL,
  `descricao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `cor`
--

INSERT INTO `cor` (`id`, `descricao`) VALUES
(1, 'Vermelho'),
(2, 'Azul'),
(3, 'Preto'),
(4, 'Branco'),
(5, 'Verde');

-- --------------------------------------------------------

--
-- Estrutura da tabela `genero`
--

CREATE TABLE `genero` (
  `id` int(11) NOT NULL,
  `descricao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `genero`
--

INSERT INTO `genero` (`id`, `descricao`) VALUES
(1, 'Masculino'),
(2, 'Feminino'),
(3, 'Unisexo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `marca`
--

CREATE TABLE `marca` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `marca`
--

INSERT INTO `marca` (`id`, `nome`) VALUES
(1, 'Antihero'),
(2, 'Creature'),
(3, 'Santa Cruz');

-- --------------------------------------------------------

--
-- Estrutura da tabela `media`
--

CREATE TABLE `media` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) NOT NULL,
  `descricao` text DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `media`
--

INSERT INTO `media` (`id`, `titulo`, `descricao`, `url`) VALUES
(1, 'Evento End of Summer', 'Evento da korner no inicio de setembro, para finalizar o verao', 'www.youtube.com/video-exemplo');

-- --------------------------------------------------------

--
-- Estrutura da tabela `peca`
--

CREATE TABLE `peca` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `descricao` varchar(150) DEFAULT NULL,
  `id_cor` int(11) DEFAULT NULL,
  `id_marca` int(11) DEFAULT NULL,
  `id_categoria` int(11) DEFAULT NULL,
  `id_genero` int(11) DEFAULT NULL,
  `taxa_iva` float NOT NULL DEFAULT 23,
  `taxa_desconto` float NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `peca`
--

INSERT INTO `peca` (`id`, `nome`, `descricao`, `id_cor`, `id_marca`, `id_categoria`, `id_genero`, `taxa_iva`, `taxa_desconto`) VALUES
(1, 'Roda Classic', 'Roda de skate de alta performance', 1, 3, 7, 3, 23, 10),
(2, 'T-shirt Logo Antihero', 'T-shirt com o logo da marca Antihero', 2, 1, 1, 1, 23, 5),
(3, 'Hoodie Creature', 'Hoodie confortável da marca Creature', 3, 2, 3, 3, 23, 15);

-- --------------------------------------------------------

--
-- Estrutura da tabela `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `id_peca` int(11) NOT NULL,
  `id_tamanho` int(11) NOT NULL,
  `quantidade` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `stock`
--

INSERT INTO `stock` (`id`, `id_peca`, `id_tamanho`, `quantidade`) VALUES
(1, 1, 1, 50),
(2, 2, 2, 30),
(3, 3, 3, 20);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tamanho`
--

CREATE TABLE `tamanho` (
  `id` int(11) NOT NULL,
  `descricao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tamanho`
--

INSERT INTO `tamanho` (`id`, `descricao`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'XL'),
(5, 'XXL');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tipo_user`
--

CREATE TABLE `tipo_user` (
  `id` int(11) NOT NULL,
  `descricao` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `tipo_user`
--

INSERT INTO `tipo_user` (`id`, `descricao`) VALUES
(1, 'Administrador'),
(2, 'Utilizador');

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `apelido` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `id_tipoUser` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `nome`, `apelido`, `email`, `pass`, `id_tipoUser`) VALUES
(1, 'admin', 'admin', 'admin@admin.admin', 'adimin', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `cor`
--
ALTER TABLE `cor`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `genero`
--
ALTER TABLE `genero`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `marca`
--
ALTER TABLE `marca`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `peca`
--
ALTER TABLE `peca`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cor` (`id_cor`),
  ADD KEY `id_marca` (`id_marca`),
  ADD KEY `id_categoria` (`id_categoria`),
  ADD KEY `id_genero` (`id_genero`);

--
-- Índices para tabela `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_peca` (`id_peca`),
  ADD KEY `id_tamanho` (`id_tamanho`);

--
-- Índices para tabela `tamanho`
--
ALTER TABLE `tamanho`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `tipo_user`
--
ALTER TABLE `tipo_user`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_tipoUser` (`id_tipoUser`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `cor`
--
ALTER TABLE `cor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `genero`
--
ALTER TABLE `genero`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `marca`
--
ALTER TABLE `marca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `media`
--
ALTER TABLE `media`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `peca`
--
ALTER TABLE `peca`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `tamanho`
--
ALTER TABLE `tamanho`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `tipo_user`
--
ALTER TABLE `tipo_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `peca`
--
ALTER TABLE `peca`
  ADD CONSTRAINT `peca_ibfk_1` FOREIGN KEY (`id_cor`) REFERENCES `cor` (`id`),
  ADD CONSTRAINT `peca_ibfk_2` FOREIGN KEY (`id_marca`) REFERENCES `marca` (`id`),
  ADD CONSTRAINT `peca_ibfk_3` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`),
  ADD CONSTRAINT `peca_ibfk_4` FOREIGN KEY (`id_genero`) REFERENCES `genero` (`id`);

--
-- Limitadores para a tabela `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `stock_ibfk_1` FOREIGN KEY (`id_peca`) REFERENCES `peca` (`id`),
  ADD CONSTRAINT `stock_ibfk_2` FOREIGN KEY (`id_tamanho`) REFERENCES `tamanho` (`id`);

--
-- Limitadores para a tabela `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`id_tipoUser`) REFERENCES `tipo_user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
