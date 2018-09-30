-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 24 2018 г., 19:10
-- Версия сервера: 5.7.21
-- Версия PHP: 5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `air_ticket_bd`
--

-- --------------------------------------------------------

--
-- Структура таблицы `airport`
--

DROP TABLE IF EXISTS `airport`;
CREATE TABLE IF NOT EXISTS `airport` (
  `id_airport` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  PRIMARY KEY (`id_airport`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `booking`
--

DROP TABLE IF EXISTS `booking`;
CREATE TABLE IF NOT EXISTS `booking` (
  `id_booking` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `id_user` int(11) UNSIGNED NOT NULL,
  `number_card` varchar(11) NOT NULL,
  `status` varchar(10) NOT NULL,
  PRIMARY KEY (`id_booking`),
  KEY `id_user` (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `class`
--

DROP TABLE IF EXISTS `class`;
CREATE TABLE IF NOT EXISTS `class` (
  `id_clase` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id_clase`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `company`
--

DROP TABLE IF EXISTS `company`;
CREATE TABLE IF NOT EXISTS `company` (
  `id_company` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `rating` float UNSIGNED NOT NULL,
  PRIMARY KEY (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `flight`
--

DROP TABLE IF EXISTS `flight`;
CREATE TABLE IF NOT EXISTS `flight` (
  `id_flight` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_plane` int(11) UNSIGNED NOT NULL,
  `id_airport` int(11) UNSIGNED NOT NULL,
  `point_of_departure` varchar(255) NOT NULL,
  `point_of_destination` varchar(255) NOT NULL,
  `time_of_departure` date NOT NULL,
  `time_of_destination` int(11) NOT NULL,
  PRIMARY KEY (`id_flight`),
  KEY `id_airport` (`id_airport`),
  KEY `id_plane` (`id_plane`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `plane`
--

DROP TABLE IF EXISTS `plane`;
CREATE TABLE IF NOT EXISTS `plane` (
  `id_plane` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `id_company` int(11) UNSIGNED NOT NULL,
  PRIMARY KEY (`id_plane`),
  KEY `id_company` (`id_company`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `ticket`
--

DROP TABLE IF EXISTS `ticket`;
CREATE TABLE IF NOT EXISTS `ticket` (
  `id_ticket` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_flight` int(11) UNSIGNED NOT NULL,
  `id_class` int(11) UNSIGNED NOT NULL,
  `price` float UNSIGNED NOT NULL,
  `decription` text NOT NULL,
  PRIMARY KEY (`id_ticket`),
  KEY `id_class` (`id_class`),
  KEY `id_flight` (`id_flight`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `ticket_in_booking`
--

DROP TABLE IF EXISTS `ticket_in_booking`;
CREATE TABLE IF NOT EXISTS `ticket_in_booking` (
  `id_ticket_in_booking` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_ticket` int(11) UNSIGNED NOT NULL,
  `id_booking` int(11) UNSIGNED NOT NULL,
  `price` float UNSIGNED NOT NULL,
  `first_name_of_user` varchar(255) NOT NULL,
  `last_name_of_user` varchar(255) NOT NULL,
  `sex` varchar(10) NOT NULL,
  `date_of_birth` date NOT NULL,
  PRIMARY KEY (`id_ticket_in_booking`),
  KEY `id_booking` (`id_booking`),
  KEY `id_ticket` (`id_ticket`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_ name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `status` varchar(10) NOT NULL,
  `date_of_birth` date NOT NULL,
  `adress` varchar(255) NOT NULL,
  `sex` varchar(10) NOT NULL,
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`);

--
-- Ограничения внешнего ключа таблицы `flight`
--
ALTER TABLE `flight`
  ADD CONSTRAINT `flight_ibfk_1` FOREIGN KEY (`id_airport`) REFERENCES `airport` (`id_airport`),
  ADD CONSTRAINT `flight_ibfk_2` FOREIGN KEY (`id_plane`) REFERENCES `plane` (`id_plane`);

--
-- Ограничения внешнего ключа таблицы `plane`
--
ALTER TABLE `plane`
  ADD CONSTRAINT `plane_ibfk_1` FOREIGN KEY (`id_company`) REFERENCES `company` (`id_company`);

--
-- Ограничения внешнего ключа таблицы `ticket`
--
ALTER TABLE `ticket`
  ADD CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`id_class`) REFERENCES `class` (`id_clase`),
  ADD CONSTRAINT `ticket_ibfk_2` FOREIGN KEY (`id_flight`) REFERENCES `flight` (`id_flight`);

--
-- Ограничения внешнего ключа таблицы `ticket_in_booking`
--
ALTER TABLE `ticket_in_booking`
  ADD CONSTRAINT `ticket_in_booking_ibfk_1` FOREIGN KEY (`id_booking`) REFERENCES `booking` (`id_booking`),
  ADD CONSTRAINT `ticket_in_booking_ibfk_2` FOREIGN KEY (`id_ticket`) REFERENCES `ticket` (`id_ticket`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
