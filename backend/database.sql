-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 01, 2026 at 03:53 AM
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
-- Database: `grabmakan`
--

-- --------------------------------------------------------

--
-- Table structure for table `detail_pembayaran`
--

CREATE TABLE `detail_pembayaran` (
  `id_detail_pembayaran` int(11) NOT NULL,
  `id_pembayaran` int(11) NOT NULL,
  `provider` varchar(100) DEFAULT NULL,
  `nomor_rekening` varchar(50) DEFAULT NULL,
  `nama_akun` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_pembayaran`
--

INSERT INTO `detail_pembayaran` (`id_detail_pembayaran`, `id_pembayaran`, `provider`, `nomor_rekening`, `nama_akun`) VALUES
(1, 1, 'GoPay', '08123456789', 'Yusuf'),
(2, 2, 'OVO', '081111111111', 'Budi'),
(3, 3, 'Dana', '082222222222', 'Siti'),
(4, 6, 'GoPay', '081111111111', 'Budi Santoso'),
(5, 7, 'OVO', '082222222222', 'Siti Aminah'),
(6, 8, 'Dana', '083333333333', 'Andi Wijaya'),
(7, 9, 'Tunai', '-', 'Cash'),
(8, 10, 'GoPay', '081111111111', 'Budi Santoso'),
(9, 11, 'OVO', '082222222222', 'Siti Aminah'),
(10, 12, 'ShopeePay', '083333333333', 'Andi Wijaya'),
(11, 13, 'Dana', '084444444444', 'Rina Putri'),
(12, 14, 'GoPay', '081111111111', 'Budi Santoso'),
(13, 15, 'Tunai', '-', 'Cash');

-- --------------------------------------------------------

--
-- Table structure for table `detail_pesanan`
--

CREATE TABLE `detail_pesanan` (
  `id_detail` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_menu` int(11) NOT NULL,
  `jumlah` int(11) NOT NULL DEFAULT 1,
  `harga_satuan` decimal(10,2) NOT NULL COMMENT 'Harga saat pesanan dibuat (snapshot)',
  `subtotal` decimal(12,2) NOT NULL COMMENT 'jumlah × harga_satuan',
  `catatan_item` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `detail_pesanan`
--

INSERT INTO `detail_pesanan` (`id_detail`, `id_pesanan`, `id_menu`, `jumlah`, `harga_satuan`, `subtotal`, `catatan_item`) VALUES
(1, 1, 1, 2, 12500.00, 25000.00, 'Extra sambal'),
(2, 2, 1, 2, 25000.00, 50000.00, NULL),
(3, 3, 2, 1, 18000.00, 18000.00, NULL),
(4, 3, 3, 1, 25000.00, 25000.00, NULL),
(5, 4, 4, 1, 30000.00, 30000.00, NULL),
(6, 5, 6, 1, 22000.00, 22000.00, NULL),
(7, 6, 9, 1, 20000.00, 20000.00, NULL),
(8, 7, 1, 2, 25000.00, 50000.00, NULL),
(9, 8, 1, 2, 25000.00, 50000.00, 'Level 3'),
(10, 9, 1, 1, 25000.00, 25000.00, 'Tanpa kol'),
(11, 10, 2, 1, 18000.00, 18000.00, NULL),
(12, 10, 3, 1, 25000.00, 25000.00, NULL),
(13, 11, 3, 1, 25000.00, 25000.00, 'Kuah dipisah'),
(14, 12, 4, 2, 30000.00, 60000.00, NULL),
(15, 13, 4, 1, 30000.00, 30000.00, 'Tambahan sambal'),
(16, 14, 6, 1, 22000.00, 22000.00, NULL),
(17, 15, 7, 1, 28000.00, 28000.00, 'Seafood lengkap'),
(18, 16, 9, 1, 20000.00, 20000.00, 'Level 2'),
(19, 17, 8, 1, 17000.00, 17000.00, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `kurir`
--

CREATE TABLE `kurir` (
  `id_kurir` int(11) NOT NULL,
  `nama_kurir` varchar(100) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `kendaraan` varchar(50) NOT NULL COMMENT 'Motor/Mobil + plat nomor',
  `rating_avg` decimal(3,2) NOT NULL DEFAULT 0.00,
  `is_aktif` tinyint(1) NOT NULL DEFAULT 1,
  `is_online` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kurir`
--

INSERT INTO `kurir` (`id_kurir`, `nama_kurir`, `no_hp`, `kendaraan`, `rating_avg`, `is_aktif`, `is_online`) VALUES
(1, 'Joko', '085111111111', 'Honda Beat L1234AB', 4.90, 1, 1),
(2, 'Rizky', '085222222222', 'Yamaha Nmax L5678CD', 4.85, 1, 1),
(3, 'Doni', '085333333333', 'Honda Vario L9876EF', 4.78, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `id_menu` int(11) NOT NULL,
  `id_restoran` int(11) NOT NULL,
  `nama_menu` varchar(150) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `harga` decimal(10,2) NOT NULL,
  `kategori_menu` varchar(80) DEFAULT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT 1,
  `foto_menu` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`id_menu`, `id_restoran`, `nama_menu`, `deskripsi`, `harga`, `kategori_menu`, `is_available`, `foto_menu`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ayam Geprek Level 5', 'Ayam geprek pedas', 25000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200', '2026-05-28 17:39:39', '2026-06-01 01:41:10'),
(2, 2, 'Bakso Urat', 'Bakso urat jumbo', 18000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200', '2026-05-30 19:06:02', '2026-06-01 01:41:10'),
(3, 2, 'Bakso Beranak', 'Bakso isi bakso kecil', 25000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200', '2026-05-30 19:06:02', '2026-06-01 01:41:10'),
(4, 3, 'Sate Ayam 10 Tusuk', 'Sate ayam madura', 30000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=1200', '2026-05-30 19:06:02', '2026-06-01 01:41:10'),
(5, 3, 'Lontong', 'Lontong tambahan', 5000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200', '2026-05-30 19:06:02', '2026-06-01 01:41:10'),
(6, 4, 'Nasi Goreng Spesial', 'Dengan telur dan ayam', 22000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200', '2026-05-30 19:06:02', '2026-06-01 01:52:51'),
(7, 4, 'Nasi Goreng Seafood', 'Udang dan cumi', 28000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=1200', '2026-05-30 19:06:02', '2026-06-01 01:52:51'),
(8, 5, 'Mie Pedas Level 3', 'Pedas sedang', 17000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200', '2026-05-30 19:06:02', '2026-06-01 01:52:51'),
(9, 5, 'Mie Pedas Level 5', 'Super pedas', 20000.00, 'Makanan', 1, 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?q=80&w=1200', '2026-05-30 19:06:02', '2026-06-01 01:52:51');

-- --------------------------------------------------------

--
-- Table structure for table `metode_pembayaran`
--

CREATE TABLE `metode_pembayaran` (
  `id_metode` int(11) NOT NULL,
  `nama_metode` varchar(80) NOT NULL,
  `tipe` enum('ewallet','transfer_bank','kartu_kredit','tunai') NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `metode_pembayaran`
--

INSERT INTO `metode_pembayaran` (`id_metode`, `nama_metode`, `tipe`, `is_active`) VALUES
(1, 'GoPay', 'ewallet', 1),
(2, 'OVO', 'ewallet', 1),
(3, 'ShopeePay', 'ewallet', 1),
(4, 'Dana', 'ewallet', 1),
(5, 'Transfer BCA', 'transfer_bank', 1),
(6, 'Transfer Mandiri', 'transfer_bank', 1),
(7, 'Kartu Kredit Visa', 'kartu_kredit', 1),
(8, 'Tunai (COD)', 'tunai', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id_pelanggan` int(11) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `no_hp` varchar(15) NOT NULL,
  `alamat` text NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` enum('admin','user') DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id_pelanggan`, `nama`, `email`, `no_hp`, `alamat`, `password_hash`, `created_at`, `updated_at`, `role`) VALUES
(1, 'Admin', 'admin@grabmakan.com', '08123456789', 'Surabaya', '$2b$10$NluBYz3f.VjTaXj3uGYFa.YNaxV6sFX2QsOGCUh6HMG9wzv2F6d3a', '2026-05-28 17:14:17', '2026-05-30 19:06:44', 'admin'),
(2, 'Budi Santoso', 'budi@gmail.com', '081111111111', 'Jl. Raya Darmo Permai III No. 12, Dukuh Pakis, Surabaya, Jawa Timur 60226', '$2b$10$dummy', '2026-05-30 19:06:02', '2026-06-01 01:41:10', 'user'),
(3, 'Siti Aminah', 'siti@gmail.com', '082222222222', 'Jl. Soekarno Hatta No. 88, Lowokwaru, Kota Malang, Jawa Timur 65141', '$2b$10$dummy', '2026-05-30 19:06:02', '2026-06-01 01:41:10', 'user'),
(4, 'Andi Wijaya', 'andi@gmail.com', '083333333333', 'Perumahan Citra Garden Blok B2 No. 7, Waru, Sidoarjo, Jawa Timur 61256', '$2b$10$dummy', '2026-05-30 19:06:02', '2026-06-01 01:41:10', 'user'),
(5, 'Rina Putri', 'rina@gmail.com', '084444444444', 'Jl. Veteran No. 45, Kebomas, Gresik, Jawa Timur 61124', '$2b$10$dummy', '2026-05-30 19:06:02', '2026-06-01 01:41:10', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `pembayaran`
--

CREATE TABLE `pembayaran` (
  `id_pembayaran` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_metode` int(11) NOT NULL,
  `jumlah_bayar` decimal(12,2) NOT NULL,
  `status_pembayaran` enum('menunggu','sukses','gagal','dikembalikan') NOT NULL DEFAULT 'menunggu',
  `waktu_bayar` datetime DEFAULT NULL,
  `referensi_transaksi` varchar(100) DEFAULT NULL COMMENT 'Kode dari payment gateway',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pembayaran`
--

INSERT INTO `pembayaran` (`id_pembayaran`, `id_pesanan`, `id_metode`, `jumlah_bayar`, `status_pembayaran`, `waktu_bayar`, `referensi_transaksi`, `created_at`) VALUES
(1, 1, 1, 45000.00, 'menunggu', NULL, NULL, '2026-05-30 19:06:02'),
(2, 3, 2, 53000.00, 'sukses', NULL, NULL, '2026-05-30 19:06:02'),
(3, 4, 4, 45000.00, 'sukses', NULL, NULL, '2026-05-30 19:06:02'),
(4, 5, 8, 32000.00, 'menunggu', NULL, NULL, '2026-05-30 19:06:02'),
(5, 6, 1, 30000.00, 'menunggu', NULL, NULL, '2026-05-30 19:06:02'),
(6, 8, 1, 60000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-001', '2026-06-01 01:52:51'),
(7, 9, 2, 35000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-002', '2026-06-01 01:52:51'),
(8, 10, 4, 53000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-003', '2026-06-01 01:52:51'),
(9, 11, 8, 35000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-004', '2026-06-01 01:52:51'),
(10, 12, 1, 72000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-005', '2026-06-01 01:52:51'),
(11, 13, 2, 45000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-006', '2026-06-01 01:52:51'),
(12, 14, 3, 32000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-007', '2026-06-01 01:52:51'),
(13, 15, 4, 38000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-008', '2026-06-01 01:52:51'),
(14, 16, 1, 30000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-009', '2026-06-01 01:52:51'),
(15, 17, 8, 27000.00, 'sukses', '2026-06-01 08:52:51', 'TRX-20260601-010', '2026-06-01 01:52:51');

-- --------------------------------------------------------

--
-- Table structure for table `pengiriman`
--

CREATE TABLE `pengiriman` (
  `id_pengiriman` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_kurir` int(11) DEFAULT NULL,
  `status_pengiriman` enum('menunggu_kurir','dijemput','dalam_perjalanan','terkirim') NOT NULL DEFAULT 'menunggu_kurir',
  `alamat_tujuan` text NOT NULL,
  `waktu_pickup` datetime DEFAULT NULL,
  `waktu_terkirim` datetime DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pengiriman`
--

INSERT INTO `pengiriman` (`id_pengiriman`, `id_pesanan`, `id_kurir`, `status_pengiriman`, `alamat_tujuan`, `waktu_pickup`, `waktu_terkirim`, `latitude`, `longitude`) VALUES
(1, 3, 1, 'terkirim', 'Jl. Raya Darmo Permai III No. 12, Dukuh Pakis, Surabaya', NULL, NULL, -7.28814500, 112.73439800),
(2, 4, 2, 'dalam_perjalanan', 'Jl. Soekarno Hatta No. 88, Lowokwaru, Kota Malang', NULL, NULL, -7.94671600, 112.61543300),
(3, 5, 1, 'dijemput', 'Perumahan Citra Garden Blok B2 No. 7, Waru, Sidoarjo', NULL, NULL, -7.37953300, 112.72411500),
(4, 8, 1, 'terkirim', 'Jl. Raya Darmo Permai III No. 12, Dukuh Pakis, Surabaya', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.28814500, 112.73439800),
(5, 9, 2, 'terkirim', 'Jl. Soekarno Hatta No. 88, Lowokwaru, Malang', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.94671600, 112.61543300),
(6, 10, 3, 'terkirim', 'Perumahan Citra Garden Blok B2 No. 7, Waru, Sidoarjo', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.37953300, 112.72411500),
(7, 11, 1, 'terkirim', 'Jl. Veteran No. 45, Kebomas, Gresik', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.15680000, 112.65500000),
(8, 12, 2, 'terkirim', 'Jl. Raya Darmo Permai III No. 12, Dukuh Pakis, Surabaya', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.28814500, 112.73439800),
(9, 13, 3, 'terkirim', 'Jl. Soekarno Hatta No. 88, Lowokwaru, Malang', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.94671600, 112.61543300),
(10, 14, 1, 'terkirim', 'Perumahan Citra Garden Blok B2 No. 7, Waru, Sidoarjo', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.37953300, 112.72411500),
(11, 15, 2, 'terkirim', 'Jl. Veteran No. 45, Kebomas, Gresik', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.15680000, 112.65500000),
(12, 16, 3, 'terkirim', 'Jl. Raya Darmo Permai III No. 12, Dukuh Pakis, Surabaya', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.28814500, 112.73439800),
(13, 17, 1, 'terkirim', 'Jl. Soekarno Hatta No. 88, Lowokwaru, Malang', '2026-06-01 08:52:51', '2026-06-01 08:52:51', -7.94671600, 112.61543300);

-- --------------------------------------------------------

--
-- Table structure for table `pesanan`
--

CREATE TABLE `pesanan` (
  `id_pesanan` int(11) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `id_restoran` int(11) NOT NULL,
  `status_pesanan` enum('menunggu_konfirmasi','dikonfirmasi','diproses','dikirim','terkirim','dibatalkan') NOT NULL DEFAULT 'menunggu_konfirmasi',
  `total_harga` decimal(12,2) NOT NULL DEFAULT 0.00,
  `biaya_kirim` decimal(10,2) NOT NULL DEFAULT 0.00,
  `catatan` text DEFAULT NULL,
  `waktu_pesan` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pesanan`
--

INSERT INTO `pesanan` (`id_pesanan`, `id_pelanggan`, `id_restoran`, `status_pesanan`, `total_harga`, `biaya_kirim`, `catatan`, `waktu_pesan`, `updated_at`) VALUES
(1, 1, 1, 'menunggu_konfirmasi', 35000.00, 10000.00, 'Jangan pedas', '2026-05-29 00:43:39', '2026-05-28 17:50:29'),
(2, 1, 1, 'menunggu_konfirmasi', 50000.00, 10000.00, 'Jangan pedas', '2026-05-29 00:46:48', '2026-05-28 17:50:34'),
(3, 2, 2, 'terkirim', 43000.00, 10000.00, NULL, '2026-05-31 02:06:02', '2026-05-30 19:06:02'),
(4, 3, 3, 'dikirim', 35000.00, 10000.00, 'Sambal banyak', '2026-05-31 02:06:02', '2026-05-30 19:06:02'),
(5, 4, 4, 'diproses', 22000.00, 10000.00, NULL, '2026-05-31 02:06:02', '2026-05-30 19:06:02'),
(6, 5, 5, 'menunggu_konfirmasi', 20000.00, 10000.00, NULL, '2026-05-31 02:06:02', '2026-05-30 19:06:02'),
(7, 1, 1, 'menunggu_konfirmasi', 50000.00, 15000.00, 'test order', '2026-05-31 23:57:41', '2026-05-31 16:57:41'),
(8, 2, 1, 'terkirim', 50000.00, 10000.00, 'Sambal dipisah', '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(9, 3, 1, 'terkirim', 25000.00, 10000.00, 'Level pedas 2', '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(10, 4, 2, 'terkirim', 43000.00, 10000.00, 'Bakso panas ya', '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(11, 5, 2, 'terkirim', 25000.00, 10000.00, NULL, '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(12, 2, 3, 'terkirim', 60000.00, 12000.00, 'Bumbu kacang banyak', '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(13, 3, 3, 'terkirim', 35000.00, 10000.00, NULL, '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(14, 4, 4, 'terkirim', 22000.00, 10000.00, 'Telur setengah matang', '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(15, 5, 4, 'terkirim', 28000.00, 10000.00, NULL, '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(16, 2, 5, 'terkirim', 20000.00, 10000.00, 'Pedas sedang', '2026-06-01 08:48:44', '2026-06-01 01:48:44'),
(17, 3, 5, 'terkirim', 17000.00, 10000.00, NULL, '2026-06-01 08:48:44', '2026-06-01 01:48:44');

-- --------------------------------------------------------

--
-- Table structure for table `restoran`
--

CREATE TABLE `restoran` (
  `id_restoran` int(11) NOT NULL,
  `nama_restoran` varchar(150) NOT NULL,
  `alamat` text NOT NULL,
  `kategori` varchar(80) NOT NULL,
  `jam_operasional` varchar(50) NOT NULL COMMENT 'Contoh: 08:00-22:00',
  `rating_avg` decimal(3,2) NOT NULL DEFAULT 0.00,
  `is_aktif` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `foto_restoran` varchar(255) DEFAULT NULL,
  `status_buka` tinyint(1) DEFAULT 1,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `jumlah_ulasan` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restoran`
--

INSERT INTO `restoran` (`id_restoran`, `nama_restoran`, `alamat`, `kategori`, `jam_operasional`, `rating_avg`, `is_aktif`, `created_at`, `foto_restoran`, `status_buka`, `updated_at`, `jumlah_ulasan`) VALUES
(1, 'Ayam Geprek Nusantara', 'Surabaya', 'Indonesia', '08:00-22:00', 4.50, 1, '2026-05-28 17:32:02', 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200', NULL, '2026-06-01 01:49:36', 2),
(2, 'Bakso Mantap', 'Surabaya', 'Sehat', '08:00-22:00', 4.67, 1, '2026-05-30 19:06:02', 'https://images.unsplash.com/photo-1529042410759-befb1204b468?q=80&w=1200', 1, '2026-06-01 01:49:36', 3),
(3, 'Sate Madura Pak Kumis', 'Surabaya', 'Indonesia', '09:00-23:00', 5.00, 1, '2026-05-30 19:06:02', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200', 1, '2026-06-01 01:49:36', 2),
(4, 'Nasi Goreng Legend', 'Sidoarjo', 'Sehat', '17:00-00:00', 4.50, 1, '2026-05-30 19:06:02', 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200', 1, '2026-06-01 01:49:36', 2),
(5, 'Mie Pedas Juara', 'Malang', 'Indonesia', '10:00-21:00', 4.50, 1, '2026-05-30 19:06:02', 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1200', 1, '2026-06-01 01:49:36', 2);

-- --------------------------------------------------------

--
-- Table structure for table `ulasan`
--

CREATE TABLE `ulasan` (
  `id_ulasan` int(11) NOT NULL,
  `id_pesanan` int(11) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `rating_restoran` tinyint(4) NOT NULL COMMENT '1–5',
  `rating_pengiriman` tinyint(4) NOT NULL COMMENT '1–5',
  `komentar` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ulasan`
--

INSERT INTO `ulasan` (`id_ulasan`, `id_pesanan`, `id_pelanggan`, `rating_restoran`, `rating_pengiriman`, `komentar`, `created_at`) VALUES
(1, 3, 2, 5, 5, 'Mantap sekali', '2026-05-30 19:06:02'),
(2, 8, 2, 5, 5, 'Ayam gepreknya enak banget dan masih hangat', '2026-06-01 01:48:44'),
(3, 9, 3, 4, 5, 'Pedasnya pas dan ayamnya crispy', '2026-06-01 01:48:44'),
(4, 10, 4, 5, 4, 'Bakso uratnya besar dan kuah gurih', '2026-06-01 01:48:44'),
(5, 11, 5, 4, 5, 'Bakso beranaknya mantap', '2026-06-01 01:48:44'),
(6, 12, 2, 5, 5, 'Sate ayam empuk dan bumbunya terasa', '2026-06-01 01:48:44'),
(7, 13, 3, 5, 4, 'Porsi pas dan sambal enak', '2026-06-01 01:48:44'),
(8, 14, 4, 4, 5, 'Nasi gorengnya gurih dan banyak topping', '2026-06-01 01:48:44'),
(9, 15, 5, 5, 5, 'Seafood fresh dan porsinya banyak', '2026-06-01 01:48:44'),
(10, 16, 2, 5, 5, 'Mie pedasnya nagih banget', '2026-06-01 01:48:44'),
(11, 17, 3, 4, 4, 'Rasa oke dan harga murah', '2026-06-01 01:48:44');

-- --------------------------------------------------------

--
-- Table structure for table `ulasan_menu`
--

CREATE TABLE `ulasan_menu` (
  `id_ulasan_menu` int(11) NOT NULL,
  `id_ulasan` int(11) NOT NULL,
  `id_detail` int(11) NOT NULL,
  `rating_makanan` tinyint(4) NOT NULL COMMENT '1–5',
  `komentar_makanan` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `ulasan_menu`
--

INSERT INTO `ulasan_menu` (`id_ulasan_menu`, `id_ulasan`, `id_detail`, `rating_makanan`, `komentar_makanan`) VALUES
(1, 1, 3, 5, 'Baksonya enak'),
(2, 2, 9, 5, 'Ayam juicy dan sambal mantap'),
(3, 3, 10, 4, 'Crispy dan gurih'),
(4, 4, 11, 5, 'Bakso uratnya besar'),
(5, 5, 13, 4, 'Isi bakso banyak'),
(6, 6, 14, 5, 'Bumbu sate meresap'),
(7, 7, 15, 5, 'Daging empuk'),
(8, 8, 16, 4, 'Nasi goreng wangi'),
(9, 9, 17, 5, 'Seafood fresh'),
(10, 10, 18, 5, 'Pedasnya pas'),
(11, 11, 19, 4, 'Mie kenyal');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `detail_pembayaran`
--
ALTER TABLE `detail_pembayaran`
  ADD PRIMARY KEY (`id_detail_pembayaran`),
  ADD KEY `id_pembayaran` (`id_pembayaran`);

--
-- Indexes for table `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  ADD PRIMARY KEY (`id_detail`),
  ADD KEY `idx_detail_pesanan` (`id_pesanan`),
  ADD KEY `idx_detail_menu` (`id_menu`);

--
-- Indexes for table `kurir`
--
ALTER TABLE `kurir`
  ADD PRIMARY KEY (`id_kurir`),
  ADD UNIQUE KEY `no_hp` (`no_hp`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`id_menu`),
  ADD KEY `idx_menu_restoran` (`id_restoran`);

--
-- Indexes for table `metode_pembayaran`
--
ALTER TABLE `metode_pembayaran`
  ADD PRIMARY KEY (`id_metode`),
  ADD UNIQUE KEY `nama_metode` (`nama_metode`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id_pelanggan`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `no_hp` (`no_hp`);

--
-- Indexes for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD PRIMARY KEY (`id_pembayaran`),
  ADD UNIQUE KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `fk_bayar_metode` (`id_metode`),
  ADD KEY `idx_pembayaran_status` (`status_pembayaran`);

--
-- Indexes for table `pengiriman`
--
ALTER TABLE `pengiriman`
  ADD PRIMARY KEY (`id_pengiriman`),
  ADD UNIQUE KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `idx_pengiriman_kurir` (`id_kurir`);

--
-- Indexes for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD PRIMARY KEY (`id_pesanan`),
  ADD KEY `idx_pesanan_pelanggan` (`id_pelanggan`),
  ADD KEY `idx_pesanan_restoran` (`id_restoran`),
  ADD KEY `idx_pesanan_status` (`status_pesanan`);

--
-- Indexes for table `restoran`
--
ALTER TABLE `restoran`
  ADD PRIMARY KEY (`id_restoran`);

--
-- Indexes for table `ulasan`
--
ALTER TABLE `ulasan`
  ADD PRIMARY KEY (`id_ulasan`),
  ADD UNIQUE KEY `id_pesanan` (`id_pesanan`),
  ADD KEY `idx_ulasan_pelanggan` (`id_pelanggan`);

--
-- Indexes for table `ulasan_menu`
--
ALTER TABLE `ulasan_menu`
  ADD PRIMARY KEY (`id_ulasan_menu`),
  ADD UNIQUE KEY `id_detail` (`id_detail`),
  ADD KEY `idx_ulasan_menu_ulasan` (`id_ulasan`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `detail_pembayaran`
--
ALTER TABLE `detail_pembayaran`
  MODIFY `id_detail_pembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `kurir`
--
ALTER TABLE `kurir`
  MODIFY `id_kurir` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `id_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `metode_pembayaran`
--
ALTER TABLE `metode_pembayaran`
  MODIFY `id_metode` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id_pelanggan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pembayaran`
--
ALTER TABLE `pembayaran`
  MODIFY `id_pembayaran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `pengiriman`
--
ALTER TABLE `pengiriman`
  MODIFY `id_pengiriman` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `pesanan`
--
ALTER TABLE `pesanan`
  MODIFY `id_pesanan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `restoran`
--
ALTER TABLE `restoran`
  MODIFY `id_restoran` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ulasan`
--
ALTER TABLE `ulasan`
  MODIFY `id_ulasan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `ulasan_menu`
--
ALTER TABLE `ulasan_menu`
  MODIFY `id_ulasan_menu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_pembayaran`
--
ALTER TABLE `detail_pembayaran`
  ADD CONSTRAINT `detail_pembayaran_ibfk_1` FOREIGN KEY (`id_pembayaran`) REFERENCES `pembayaran` (`id_pembayaran`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `detail_pesanan`
--
ALTER TABLE `detail_pesanan`
  ADD CONSTRAINT `fk_detail_menu` FOREIGN KEY (`id_menu`) REFERENCES `menu` (`id_menu`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_detail_pesanan` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `menu`
--
ALTER TABLE `menu`
  ADD CONSTRAINT `fk_menu_restoran` FOREIGN KEY (`id_restoran`) REFERENCES `restoran` (`id_restoran`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pembayaran`
--
ALTER TABLE `pembayaran`
  ADD CONSTRAINT `fk_bayar_metode` FOREIGN KEY (`id_metode`) REFERENCES `metode_pembayaran` (`id_metode`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bayar_pesanan` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pengiriman`
--
ALTER TABLE `pengiriman`
  ADD CONSTRAINT `fk_kirim_kurir` FOREIGN KEY (`id_kurir`) REFERENCES `kurir` (`id_kurir`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_kirim_pesanan` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pesanan`
--
ALTER TABLE `pesanan`
  ADD CONSTRAINT `fk_pesanan_pelanggan` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_pesanan_restoran` FOREIGN KEY (`id_restoran`) REFERENCES `restoran` (`id_restoran`) ON UPDATE CASCADE;

--
-- Constraints for table `ulasan`
--
ALTER TABLE `ulasan`
  ADD CONSTRAINT `fk_ulasan_pelanggan` FOREIGN KEY (`id_pelanggan`) REFERENCES `pelanggan` (`id_pelanggan`) ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ulasan_pesanan` FOREIGN KEY (`id_pesanan`) REFERENCES `pesanan` (`id_pesanan`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ulasan_menu`
--
ALTER TABLE `ulasan_menu`
  ADD CONSTRAINT `fk_ulasan_menu_detail` FOREIGN KEY (`id_detail`) REFERENCES `detail_pesanan` (`id_detail`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ulasan_menu_ulasan` FOREIGN KEY (`id_ulasan`) REFERENCES `ulasan` (`id_ulasan`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
