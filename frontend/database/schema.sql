-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2025 a las 00:48:37
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `inventory_system`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `active_ingredient` varchar(255) DEFAULT NULL,
  `dosage` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `min_stock` int(11) NOT NULL DEFAULT 10,
  `expiration_date` date DEFAULT NULL,
  `requires_prescription` tinyint(1) DEFAULT 0,
  `category` varchar(100) DEFAULT 'General',
  `manufacturer` varchar(255) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `active_ingredient`, `dosage`, `price`, `stock`, `min_stock`, `expiration_date`, `requires_prescription`, `category`, `manufacturer`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES
(1, 'Paracetamol', 'Analgésico y antipirético', 'Paracetamol', '500mg', 5.50, 150, 30, '2026-05-15', 0, 'Analgésicos', 'Laboratorios Pharma', 40.71280000, -74.00600000, '2025-10-06 22:34:21', '2025-10-06 22:34:21'),
(2, 'Amoxicilina', 'Antibiótico de amplio espectro', 'Amoxicilina', '500mg', 12.75, 80, 20, '2026-03-10', 1, 'Antibióticos', 'MediLab', 40.71280000, -74.00600000, '2025-10-06 22:34:21', '2025-10-06 22:34:21'),
(3, 'Ibuprofeno', 'Antiinflamatorio no esteroideo', 'Ibuprofeno', '400mg', 7.25, 120, 25, '2026-08-22', 0, 'Antiinflamatorios', 'Farmacéutica Global', 40.71280000, -74.00600000, '2025-10-06 22:34:21', '2025-10-06 22:34:21'),
(4, 'Loratadina', 'Antihistamínico', 'Loratadina', '10mg', 8.90, 95, 20, '2026-06-30', 0, 'Antialérgicos', 'Laboratorios Pharma', 40.71280000, -74.00600000, '2025-10-06 22:34:21', '2025-10-06 22:34:21'),
(5, 'Omeprazol', 'Inhibidor de la bomba de protones', 'Omeprazol', '20mg', 9.50, 75, 15, '2026-04-18', 0, 'Gastrointestinales', 'MediLab', 40.71280000, -74.00600000, '2025-10-06 22:34:21', '2025-10-06 22:34:21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
