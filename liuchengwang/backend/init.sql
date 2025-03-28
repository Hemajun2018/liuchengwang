-- 创建数据库
CREATE DATABASE IF NOT EXISTS liuchengwang;
USE liuchengwang;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- 删除现有表
DROP TABLE IF EXISTS `materials`;
DROP TABLE IF EXISTS `issues`;
DROP TABLE IF EXISTS `nodes`;
DROP TABLE IF EXISTS `projects`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `user`;

-- 创建user表
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` enum('admin','employee') NOT NULL DEFAULT 'employee',
  `real_name` varchar(50),
  `email` varchar(100),
  `phone` varchar(20),
  `avatar` varchar(255),
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 创建projects表
CREATE TABLE `projects` (
  `id` varchar(36) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `deliverables` text,
  `start_time` date,
  `end_time` date,
  `days_needed` int NOT NULL DEFAULT 0,
  `status` int NOT NULL DEFAULT 0,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_project_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 创建nodes表
CREATE TABLE `nodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `project_id` varchar(36) NOT NULL,
  `name` varchar(100) NOT NULL,
  `order` int NOT NULL,
  `status` enum('not_started','in_progress','completed','delayed') NOT NULL DEFAULT 'not_started',
  `expected_end_date` datetime DEFAULT NULL,
  `actual_end_date` datetime DEFAULT NULL,
  `is_prerequisite` tinyint NOT NULL DEFAULT '0',
  `is_result` tinyint NOT NULL DEFAULT '0',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_node_project` (`project_id`),
  CONSTRAINT `FK_node_project` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 创建issues表
CREATE TABLE `issues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `node_id` int NOT NULL,
  `content` text NOT NULL,
  `status` enum('pending','resolved') NOT NULL DEFAULT 'pending',
  `start_date` date DEFAULT NULL,
  `expected_end_date` date DEFAULT NULL,
  `duration_days` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_issue_node` (`node_id`),
  CONSTRAINT `FK_issue_node` FOREIGN KEY (`node_id`) REFERENCES `nodes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 创建materials表
CREATE TABLE `materials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `node_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `file_url` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `expected_end_date` date DEFAULT NULL,
  `duration_days` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_material_node` (`node_id`),
  CONSTRAINT `FK_material_node` FOREIGN KEY (`node_id`) REFERENCES `nodes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1; 