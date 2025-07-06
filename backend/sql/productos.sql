-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 06, 2025 at 02:41 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tienda`
--

-- --------------------------------------------------------

--
-- Table structure for table `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `precio` int(11) NOT NULL,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `categoria` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `activo` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `img`, `categoria`, `activo`) VALUES
(1, 'Auriculares Bluetooth redmi', 15000, '/assets/img/images.png', 'accesorio', 0),
(2, 'Cargador Rápido USB-C', 7000, '/assets/img/cargador-de-220v-a-usb-samsung-cable-15w-type-c-ep-t1510xbsgar-negro.png', 'accesorio', 1),
(3, 'Mouse Inalámbrico', 9500, '/assets/img/1000x1000-MOUSE030.png', 'accesorio', 0),
(4, 'Teclado Mecánico RGB', 28000, '/assets/img/1019-producto-teclado-hyperx-origins-60-aqua-6-5382.png', 'accesorio', 1),
(5, 'Soporte para Celular', 3000, '/assets/img/download.png', 'accesorio', 0),
(6, 'Cable HDMI 2m', 2500, '/assets/img/images (1).png', 'accesorio', 1),
(7, 'Adaptador USB-C a Jack 3.5mm', 4000, '/assets/img/adaptador-jack-3-5-30836ae57ea39f15c417037914723286-1024-1024.png', 'accesorio', 0),
(8, 'Funda para Notebook 15\'', 8000, '/assets/img/afni-0156-ca59a6e1ff4a3274aa17089661198024-1024-1024.png', 'accesorio', 1),
(9, 'Alfombrilla Gamer HyperX', 3200, '/assets/img/1_d76ba593-88fa-44eb-89f9-00e381c4a0b3.png', 'accesorio', 0),
(10, 'Cargador Inalámbrico', 10000, '/assets/img/D_NQ_NP_992731-MLA77926800197_072024-O.png', 'accesorio', 1),
(11, 'Placa de video RTX 3060', 430000, '/assets/img/600.png', 'componente', 0),
(12, 'Procesador Ryzen 5 5600X', 190000, '/assets/img/000000000041306882104413068.png', 'componente', 1),
(13, 'Memoria RAM 16GB DDR4', 70000, '/assets/img/40390_4.png', 'componente', 0),
(14, 'Disco SSD 1TB', 95000, '/assets/img/36061_1.png', 'componente', 1),
(15, 'Motherboard B550M', 120000, '/assets/img/download (1).png', 'componente', 0),
(16, 'Fuente 650W 80 Plus bronze', 85000, '/assets/img/FUENTE-GAMER-GIGABYTE-650W-80-PLUS-BRONZE.png', 'componente', 1),
(17, 'Cooler CPU RGB', 30000, '/assets/img/1.png', 'componente', 0),
(18, 'Gabinete ATX con RGB', 60000, '/assets/img/download (2).png', 'componente', 1),
(19, 'Placa de red WiFi PCIe', 20000, '/assets/img/download (3).png', 'componente', 0),
(20, 'Disco HDD 2TB', 75000, '/assets/img/download (4).png', 'componente', 1),
(21, 'Samsung Galaxy S23', 950000, '/assets/img/download (5).png', 'celular', 0),
(22, 'iPhone 14', 1250000, '/assets/img/download (6).png', 'celular', 1),
(23, 'Motorola Edge 40', 650000, '/assets/img/download (7).png', 'celular', 0),
(24, 'Xiaomi Redmi Note 12', 420000, '/assets/img/download (8).png', 'celular', 1),
(25, 'Realme C55', 330000, '/assets/img/download (9).png', 'celular', 0),
(26, 'Samsung Galaxy A34', 410000, '/assets/img/download (10).png', 'celular', 1),
(27, 'iPhone SE 2022', 890000, '/assets/img/download (11).png', 'celular', 0),
(28, 'Motorola G73', 370000, '/assets/img/download (12).png', 'celular', 1),
(29, 'Samsung Galaxy Z Flip', 1450000, '/assets/img/download (13).png', 'celular', 0),
(30, 'Xiaomi Poco X5 Pro', 510000, '/assets/img/download (14).png', 'celular', 1),
(31, 'Smart TV Samsung 55\' 4K', 750000, '/assets/img/download (15).png', 'televisor', 0),
(32, 'LG OLED 65\' 4K', 1100000, '/assets/img/download (16).png', 'televisor', 1),
(33, 'Noblex 43\' Full HD', 380000, '/assets/img/download (17).png', 'televisor', 0),
(34, 'Philips 50\' 4K Ambilight', 570000, '/assets/img/download (18).png', 'televisor', 1),
(35, 'Hisense 55\' ULED', 690000, '/assets/img/download (19).png', 'televisor', 0),
(36, 'TCL 65\' 4K Google TV', 800000, '/assets/img/download (20).png', 'televisor', 1),
(37, 'BGH 32\' HD', 280000, '/assets/img/BGH-Android-TV-HD_32--1-.png', 'televisor', 0),
(38, 'Samsung Neo QLED 8K', 2400000, '/assets/img/download (21).png', 'televisor', 1),
(39, 'LG NanoCell 55\'', 730000, '/assets/img/download (22).png', 'televisor', 0),
(40, 'TCL 43\' Roku TV', 360000, '/assets/img/download (23).png', 'televisor', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
