-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-10-2025 a las 20:56:49
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
-- Estructura de tabla para la tabla `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `phone`, `address`, `latitude`, `longitude`, `created_at`, `updated_at`) VALUES
(1, 'Carlos Ramírez', 'carlos.ramirez@example.com', '987654321', 'Av. Grau 123, Lima', -12.04637400, -77.04279300, '2025-10-08 18:54:59', '2025-10-08 18:54:59'),
(2, 'María López', 'maria.lopez@example.com', '998877665', 'Jr. Ayacucho 456, Arequipa', -16.39889000, -71.53500000, '2025-10-08 18:54:59', '2025-10-08 18:54:59'),
(3, 'Juan Torres', 'juan.torres@example.com', '965874123', 'Calle Real 78, Cusco', -13.53195000, -71.96746000, '2025-10-08 18:54:59', '2025-10-08 18:54:59'),
(4, 'Lucía Paredes', 'lucia.paredes@example.com', '912345678', 'Mz B Lt 4, Piura', -5.19449000, -80.63282000, '2025-10-08 18:54:59', '2025-10-08 18:54:59'),
(5, 'Pedro Castillo', 'pedro.castillo@example.com', '976543210', 'Av. Los Incas 320, Trujillo', -8.11167000, -79.02883000, '2025-10-08 18:54:59', '2025-10-08 18:54:59');

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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `total` decimal(10,2) NOT NULL DEFAULT 0.00,
  `payment_method` varchar(100) DEFAULT 'Efectivo',
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sales`
--

INSERT INTO `sales` (`id`, `customer_id`, `total`, `payment_method`, `latitude`, `longitude`, `created_at`) VALUES
(1, 1, 45.75, 'Tarjeta', -12.04637400, -77.04279300, '2025-10-08 18:55:00'),
(2, 2, 18.40, 'Efectivo', -16.39889000, -71.53500000, '2025-10-08 18:55:00'),
(3, 3, 27.00, 'Yape', -13.53195000, -71.96746000, '2025-10-08 18:55:00'),
(4, 4, 63.90, 'Tarjeta', -5.19449000, -80.63282000, '2025-10-08 18:55:00'),
(5, 5, 14.50, 'Efectivo', -8.11167000, -79.02883000, '2025-10-08 18:55:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_items`
--

CREATE TABLE `sale_items` (
  `id` int(11) NOT NULL,
  `sale_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sale_items`
--

INSERT INTO `sale_items` (`id`, `sale_id`, `product_id`, `quantity`, `price`, `subtotal`) VALUES
(1, 1, 1, 3, 5.50, 16.50),
(2, 1, 4, 2, 8.90, 17.80),
(3, 1, 5, 1, 9.50, 9.50),
(4, 2, 2, 1, 12.75, 12.75),
(5, 2, 3, 1, 7.25, 7.25),
(6, 3, 1, 2, 5.50, 11.00),
(7, 3, 3, 2, 7.25, 14.50),
(8, 4, 2, 2, 12.75, 25.50),
(9, 4, 4, 3, 8.90, 26.70),
(10, 4, 5, 1, 9.50, 9.50),
(11, 5, 1, 1, 5.50, 5.50),
(12, 5, 4, 1, 8.90, 8.90);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stock_alerts`
--

CREATE TABLE `stock_alerts` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `stock_alerts`
--

INSERT INTO `stock_alerts` (`id`, `product_id`, `message`, `is_read`, `created_at`) VALUES
(1, 5, 'El producto Omeprazol está cerca de agotarse (stock: 75, mínimo: 15).', 0, '2025-10-08 18:55:00'),
(2, 2, 'Amoxicilina requiere revisión de stock y fecha de expiración próxima (2026-03-10).', 0, '2025-10-08 18:55:00'),
(3, 4, 'Loratadina alcanzó el límite de stock mínimo.', 1, '2025-10-08 18:55:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sales_customer` (`customer_id`);

--
-- Indices de la tabla `sale_items`
--
ALTER TABLE `sale_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_sale_items_sale` (`sale_id`),
  ADD KEY `fk_sale_items_product` (`product_id`);

--
-- Indices de la tabla `stock_alerts`
--
ALTER TABLE `stock_alerts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_stock_alerts_product` (`product_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `sale_items`
--
ALTER TABLE `sale_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `stock_alerts`
--
ALTER TABLE `stock_alerts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `fk_sales_customer` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Filtros para la tabla `sale_items`
--
ALTER TABLE `sale_items`
  ADD CONSTRAINT `fk_sale_items_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_sale_items_sale` FOREIGN KEY (`sale_id`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `stock_alerts`
--
ALTER TABLE `stock_alerts`
  ADD CONSTRAINT `fk_stock_alerts_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
