-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 19-Dez-2019 às 16:06
-- Versão do servidor: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_purchase`
--

CREATE TABLE IF NOT EXISTS `tb_purchase` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_code` int(11) NOT NULL,
  `purchase_value` double NOT NULL,
  `purchase_date` date NOT NULL,
  `purchase_cpf` varchar(15) NOT NULL,
  `purchase_status` int(11) NOT NULL,
  `purchase_percent_aplied` int(11) DEFAULT NULL,
  `purchase_val_cashback_until_buy` int(11) DEFAULT NULL,
  `purchase_discount_cashback` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=19 ;

--
-- Extraindo dados da tabela `tb_purchase`
--

INSERT INTO `tb_purchase` (`id`, `purchase_code`, `purchase_value`, `purchase_date`, `purchase_cpf`, `purchase_status`, `purchase_percent_aplied`, `purchase_val_cashback_until_buy`, `purchase_discount_cashback`) VALUES
(11, 41234, 89787, '2019-12-12', '123.566.985-66', 1, 0, 0, 0),
(13, 41234, 34324, '2019-12-12', '222.222.222-23', 1, 0, 0, 0),
(14, 41234, 5464, '2019-12-12', '222.222.222-22', 1, 0, 0, 0),
(15, 41234, 222, '2019-12-12', '222.222.222-21', 1, 0, 0, 0),
(16, 2147483647, 2222, '2012-12-12', '222.222.222-22', 1, 20, 3235, 647),
(17, 2222, 33333.02, '2012-12-13', '333.333.333-33', 1, 20, 1860, 372),
(18, 4444444, 44444, '2012-12-14', '444.444.444-44', 1, 20, 3857, 771.4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_reseller`
--

CREATE TABLE IF NOT EXISTS `tb_reseller` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `reseller_complete_name` varchar(200) NOT NULL,
  `reseller_cpf` varchar(15) NOT NULL,
  `reseller_email` varchar(150) NOT NULL,
  `reseller_passwd` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Extraindo dados da tabela `tb_reseller`
--

INSERT INTO `tb_reseller` (`id`, `reseller_complete_name`, `reseller_cpf`, `reseller_email`, `reseller_passwd`) VALUES
(1, 'Marcelo Contador', '02606171993', 'marceloboa@brq.com', '123456'),
(7, 'Maykel', '04992271901', 'maykelesser@gmail.com', '123'),
(8, 'Marcela Contador', '01012655903', 'marcela_contador@hotmail.com', '123'),
(9, 'Cirino das Neve', '123.456.798-78', 'cirino@brq.com', '123'),
(10, 'mar', '111.111.111-11', 'mar@mar.com', '123'),
(11, '555679', '111.111.111-11', 'mar', '123'),
(12, '555', '222.222.222-22', 'mar', '123'),
(13, 'Marcelo Jones', '123.456.789-11', 'marcelorosa1978@gmail.com', '123');

-- --------------------------------------------------------

--
-- Estrutura da tabela `tb_status`
--

CREATE TABLE IF NOT EXISTS `tb_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status_name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Extraindo dados da tabela `tb_status`
--

INSERT INTO `tb_status` (`id`, `status_name`) VALUES
(1, 'Em validação'),
(2, 'Aprovado'),
(3, 'Em Andamento'),
(4, 'Separado'),
(5, 'Embalado'),
(6, 'Em Despacho'),
(7, 'Enviado'),
(8, 'Recebido pelo Cliente'),
(9, 'Encerrado'),
(10, 'Reaberto'),
(11, 'Cancelado'),
(12, 'Em Devolução'),
(13, 'Reprovado');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
