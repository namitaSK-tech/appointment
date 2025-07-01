-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2025 at 02:36 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_teacher_appointments`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `username`, `password`) VALUES
(1, 'Admin', 'Admin@416');

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `id` int(11) NOT NULL,
  `student_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `appointment_time` datetime DEFAULT NULL,
  `purpose` text DEFAULT NULL,
  `status` enum('pending','approved','cancelled') DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`id`, `student_id`, `teacher_id`, `appointment_time`, `purpose`, `status`) VALUES
(14, 1, 2, '2025-06-27 19:43:00', 'Guidance on campus interviews', 'approved'),
(15, 2, 2, '2025-06-28 19:45:00', 'Clarification about exam results', 'approved'),
(16, 1, 1, '2025-06-07 20:59:00', 'Admission process details', 'approved'),
(17, 1, 1, '2025-06-29 17:25:00', 'Scholarship application discussion', 'approved'),
(18, 1, 2, '2025-06-29 16:29:00', 'Health consultation', 'pending'),
(19, 1, 1, '2025-06-30 17:31:00', 'Document verification inquiry', 'approved'),
(20, 1, 1, '2025-06-30 17:53:00', 'Discussion about academic progress', 'approved'),
(21, 1, 1, '2025-06-29 18:10:00', 'Progress review meeting', 'approved'),
(22, 1, 1, '2025-06-30 18:16:00', 'Query regarding assignment submission', 'pending'),
(23, 1, 1, '2025-06-30 12:10:00', 'Feedback on recent test', 'pending'),
(24, 1, 1, '2025-06-30 13:29:00', 'General academic counseling', 'approved');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) DEFAULT NULL,
  `sender` enum('student','teacher') DEFAULT NULL,
  `content` text DEFAULT NULL,
  `sent_at` datetime DEFAULT current_timestamp(),
  `sender_id` int(11) DEFAULT NULL,
  `sender_role` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `appointment_id`, `sender`, `content`, `sent_at`, `sender_id`, `sender_role`) VALUES
(8, 15, 'student', 'Please clarify the assignment requirements.', '2025-06-27 20:57:55', NULL, NULL),
(9, 14, 'student', 'Can you provide more details about the project?', '2025-06-27 21:03:53', NULL, NULL),
(10, 14, 'student', 'Thank you for your feedback.', '2025-06-28 16:27:51', NULL, NULL),
(11, 14, 'student', 'I will submit the report by tomorrow.', '2025-06-28 16:37:46', NULL, NULL),
(12, 16, NULL, 'Meeting scheduled for next week.', '2025-06-28 18:08:55', 1, 'teacher'),
(13, 14, 'student', 'Looking forward to your response.', '2025-06-28 18:10:52', NULL, NULL),
(14, 14, 'student', 'Please review my submission.', '2025-06-28 18:17:17', NULL, NULL),
(15, 23, 'student', 'Can we reschedule our appointment?', '2025-06-28 19:23:39', 1, 'student');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `is_approved` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`id`, `name`, `email`, `password`, `is_approved`) VALUES
(1, 'Shivani', 'shivani@gmail.com', 'Shivani@416', 1),
(2, 'Manasi ', 'manasi@gmail.com', 'Manasi@416', 1),
(3, 'Advik Kamble', 'advik@gmail.com', 'Advik@416', 0);

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `subject` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`id`, `name`, `department`, `subject`, `email`, `password`) VALUES
(1, 'namita', 'CSE', 'C', 'namita@gmail.com', 'Namita@416'),
(2, 'Poorvi ', 'CSE', 'java', 'poorvi@gmail.com', 'Poorvi@416');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`id`),
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`id`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
