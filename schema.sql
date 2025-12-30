-- Database Schema for Cliniqon Machine Test
-- Database: cliniqon_machine_test

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Seed data for table `users`
-- (Password: admin123)
--

INSERT INTO `users` (`username`, `password`, `full_name`, `role`, `avatar_url`) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Emma Taylor', 'UX/UI Designer', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `client` varchar(100) NOT NULL,
  `role` varchar(50) NOT NULL,
  `start_date` date NOT NULL,
  `status` enum('Ongoing','Completed','Pending','Delayed') DEFAULT 'Ongoing',
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Seed data for table `projects`
--

INSERT INTO `projects` (`name`, `client`, `role`, `start_date`, `status`, `price`) VALUES
('Mobile App Redesign', 'Emma Taylor', 'Lead', '2025-03-01', 'Completed', 12000.00),
('E-commerce Website', 'John Doe', 'Lead', '2025-03-15', 'Ongoing', 8500.00),
('Branding Project', 'Sarah Smith', 'Lead', '2025-03-10', 'Ongoing', 4500.00),
('Dashboard UI Kit', 'Alex Johnson', 'Lead', '2025-02-28', 'Completed', 6000.00),
('Portfolio Site', 'Michael Brown', 'Lead', '2025-01-20', 'Completed', 3000.00);

-- --------------------------------------------------------

--
-- Table structure for table `earnings`
--

CREATE TABLE IF NOT EXISTS `earnings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Seed data for table `earnings`
-- Enriched for 12 months visualization
--

INSERT INTO `earnings` (`date`, `amount`) VALUES
('2025-01-15', 2000.00),
('2025-02-10', 2500.00),
('2025-03-05', 1800.00),
('2025-04-12', 3200.00),
('2025-05-20', 2100.00),
('2025-06-15', 2300.00),
('2025-07-10', 2700.00),
('2025-08-05', 1900.00),
('2025-09-22', 2400.00),
('2025-10-18', 2100.00),
('2025-11-25', 2200.00),
('2025-12-30', 2200.00);

-- --------------------------------------------------------

--
-- Table structure for table `withdrawals`
--

CREATE TABLE IF NOT EXISTS `withdrawals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Seed data for table `withdrawals`
--

INSERT INTO `withdrawals` (`date`, `amount`) VALUES
('2025-03-25', 5000.00),
('2025-06-30', 2500.00),
('2025-09-30', 2500.00);

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE IF NOT EXISTS `schedules` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `time` time NOT NULL,
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `type` enum('meeting','task','course') DEFAULT 'task',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Seed data for table `schedules`
-- Aligned with SchedulePanel.jsx expectations
--

INSERT INTO `schedules` (`time`, `title`, `description`, `type`) VALUES
('08:00:00', 'Client Meeting', 'Discuss the project details with the client.', 'meeting'),
('11:00:00', 'Check List', 'Analyze more details about the project.', 'task'),
('14:00:00', 'Full Course', 'Learning about UX/UI Design in depth.', 'course');

COMMIT;
