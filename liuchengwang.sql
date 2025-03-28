/*
 Navicat Premium Dump SQL

 Source Server         : liuchengwang
 Source Server Type    : MySQL
 Source Server Version : 90200 (9.2.0)
 Source Host           : localhost:3306
 Source Schema         : liuchengwang

 Target Server Type    : MySQL
 Target Server Version : 90200 (9.2.0)
 File Encoding         : 65001

 Date: 17/03/2025 10:24:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for deliverables
-- ----------------------------
DROP TABLE IF EXISTS `deliverables`;
CREATE TABLE `deliverables` (
  `id` int NOT NULL AUTO_INCREMENT,
  `node_id` int NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date DEFAULT NULL,
  `expected_end_date` date DEFAULT NULL,
  `duration_days` int DEFAULT NULL,
  `status` enum('not_started','in_progress','completed','delayed') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'not_started',
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_5d7b950eb7c657c0492fb291767` (`node_id`),
  CONSTRAINT `FK_5d7b950eb7c657c0492fb291767` FOREIGN KEY (`node_id`) REFERENCES `nodes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of deliverables
-- ----------------------------
BEGIN;
INSERT INTO `deliverables` (`id`, `node_id`, `description`, `start_date`, `expected_end_date`, `duration_days`, `status`, `created_at`, `updated_at`) VALUES (3, 2, 'c21111', NULL, NULL, NULL, 'delayed', '2025-03-16 23:11:52.581720', '2025-03-16 23:11:52.581720');
INSERT INTO `deliverables` (`id`, `node_id`, `description`, `start_date`, `expected_end_date`, `duration_days`, `status`, `created_at`, `updated_at`) VALUES (4, 1, '交付内容1', '2025-03-01', '2025-03-18', 17, 'in_progress', '2025-03-17 00:10:25.657403', '2025-03-17 00:10:25.657403');
INSERT INTO `deliverables` (`id`, `node_id`, `description`, `start_date`, `expected_end_date`, `duration_days`, `status`, `created_at`, `updated_at`) VALUES (5, 1, '交付内容2', '2025-03-01', '2025-03-19', 18, 'completed', '2025-03-17 00:10:38.478271', '2025-03-17 00:10:38.478271');
COMMIT;

-- ----------------------------
-- Table structure for issues
-- ----------------------------
DROP TABLE IF EXISTS `issues`;
CREATE TABLE `issues` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date DEFAULT NULL,
  `expected_end_date` date DEFAULT NULL,
  `duration_days` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `nodeId` int DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_9aa9667f91384659db19513a811` (`nodeId`),
  CONSTRAINT `FK_9aa9667f91384659db19513a811` FOREIGN KEY (`nodeId`) REFERENCES `nodes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of issues
-- ----------------------------
BEGIN;
INSERT INTO `issues` (`id`, `content`, `start_date`, `expected_end_date`, `duration_days`, `created_at`, `updated_at`, `nodeId`, `status`) VALUES (1, 'q1', '2025-03-10', '2025-03-21', 11, '2025-03-16 23:10:42.984840', '2025-03-16 23:10:42.984840', 1, 'resolved');
INSERT INTO `issues` (`id`, `content`, `start_date`, `expected_end_date`, `duration_days`, `created_at`, `updated_at`, `nodeId`, `status`) VALUES (2, 'q2', '2025-03-05', '2025-03-21', 16, '2025-03-16 23:10:50.112008', '2025-03-16 23:10:50.112008', 1, 'resolved');
INSERT INTO `issues` (`id`, `content`, `start_date`, `expected_end_date`, `duration_days`, `created_at`, `updated_at`, `nodeId`, `status`) VALUES (3, '测试问题123456578', NULL, NULL, NULL, '2025-03-17 10:14:46.124801', '2025-03-17 10:14:46.124801', 1, 'pending');
COMMIT;

-- ----------------------------
-- Table structure for materials
-- ----------------------------
DROP TABLE IF EXISTS `materials`;
CREATE TABLE `materials` (
  `id` int NOT NULL AUTO_INCREMENT,
  `node_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `type` enum('document','image','video','audio','other') COLLATE utf8mb4_unicode_ci DEFAULT 'document',
  `fileSize` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `start_date` date DEFAULT NULL,
  `expected_end_date` date DEFAULT NULL,
  `duration_days` int DEFAULT NULL,
  `status` enum('not_started','in_progress','completed','delayed') COLLATE utf8mb4_unicode_ci DEFAULT 'not_started',
  PRIMARY KEY (`id`),
  KEY `FK_9c965e3f85f76bbffd21f87a44a` (`node_id`),
  CONSTRAINT `FK_9c965e3f85f76bbffd21f87a44a` FOREIGN KEY (`node_id`) REFERENCES `nodes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of materials
-- ----------------------------
BEGIN;
INSERT INTO `materials` (`id`, `node_id`, `name`, `description`, `url`, `type`, `fileSize`, `created_at`, `updated_at`, `start_date`, `expected_end_date`, `duration_days`, `status`) VALUES (1, 1, 'c1', 'bbbb，，，，', NULL, 'document', NULL, '2025-03-16 23:11:18.327649', '2025-03-16 23:11:18.327649', '2025-03-01', '2025-03-04', 3, 'in_progress');
INSERT INTO `materials` (`id`, `node_id`, `name`, `description`, `url`, `type`, `fileSize`, `created_at`, `updated_at`, `start_date`, `expected_end_date`, `duration_days`, `status`) VALUES (2, 1, 'c999', '发送到', NULL, 'document', NULL, '2025-03-16 23:11:32.026715', '2025-03-16 23:11:32.026715', '2025-03-11', '2025-03-20', 9, 'completed');
COMMIT;

-- ----------------------------
-- Table structure for nodes
-- ----------------------------
DROP TABLE IF EXISTS `nodes`;
CREATE TABLE `nodes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int NOT NULL,
  `is_prerequisite` tinyint NOT NULL DEFAULT '0',
  `is_result` tinyint NOT NULL DEFAULT '0',
  `project_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  KEY `FK_8c18b753688ef7a684395df856e` (`project_id`),
  CONSTRAINT `FK_8c18b753688ef7a684395df856e` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of nodes
-- ----------------------------
BEGIN;
INSERT INTO `nodes` (`id`, `name`, `order`, `is_prerequisite`, `is_result`, `project_id`, `created_at`, `updated_at`) VALUES (1, '测试节点1', 1, 0, 0, '57bfafe0-6dc8-41c8-9dbc-5c8d14ebd4c0', '2025-03-16 23:09:58.390980', '2025-03-17 09:50:56.000000');
INSERT INTO `nodes` (`id`, `name`, `order`, `is_prerequisite`, `is_result`, `project_id`, `created_at`, `updated_at`) VALUES (2, '节点2', 2, 0, 0, '57bfafe0-6dc8-41c8-9dbc-5c8d14ebd4c0', '2025-03-16 23:10:05.162440', '2025-03-16 23:10:05.162440');
COMMIT;

-- ----------------------------
-- Table structure for prerequisites
-- ----------------------------
DROP TABLE IF EXISTS `prerequisites`;
CREATE TABLE `prerequisites` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` date DEFAULT NULL,
  `expected_end_date` date DEFAULT NULL,
  `duration_days` int DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `project_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  PRIMARY KEY (`id`),
  KEY `FK_526fabfb01dd5f59d3b03d83d2c` (`project_id`),
  CONSTRAINT `FK_526fabfb01dd5f59d3b03d83d2c` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of prerequisites
-- ----------------------------
BEGIN;
INSERT INTO `prerequisites` (`id`, `content`, `start_date`, `expected_end_date`, `duration_days`, `created_at`, `updated_at`, `project_id`, `status`) VALUES (1, '测试1', '2025-03-01', '2025-03-19', 18, '2025-03-16 23:09:36.826684', '2025-03-16 23:09:36.826684', '57bfafe0-6dc8-41c8-9dbc-5c8d14ebd4c0', 'in_progress');
INSERT INTO `prerequisites` (`id`, `content`, `start_date`, `expected_end_date`, `duration_days`, `created_at`, `updated_at`, `project_id`, `status`) VALUES (2, '测试2', '2025-03-01', '2025-03-18', 17, '2025-03-16 23:09:47.432929', '2025-03-16 23:09:47.432929', '57bfafe0-6dc8-41c8-9dbc-5c8d14ebd4c0', 'delayed');
COMMIT;

-- ----------------------------
-- Table structure for projects
-- ----------------------------
DROP TABLE IF EXISTS `projects`;
CREATE TABLE `projects` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliverables` text COLLATE utf8mb4_unicode_ci,
  `days_needed` int NOT NULL DEFAULT '0',
  `status` int NOT NULL DEFAULT '0',
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_time` date DEFAULT NULL,
  `end_time` date DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `results` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_2187088ab5ef2a918473cb9900` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of projects
-- ----------------------------
BEGIN;
INSERT INTO `projects` (`id`, `password`, `deliverables`, `days_needed`, `status`, `name`, `start_time`, `end_time`, `created_at`, `updated_at`, `results`) VALUES ('57bfafe0-6dc8-41c8-9dbc-5c8d14ebd4c0', '$2b$10$PNdpL.xcwE44wjql619YduX4FfAjwcxJ4/HZlkD7.ZJsJZFmMti0i', NULL, 0, 0, '某工地项目', NULL, NULL, '2025-03-16 23:03:15.737592', '2025-03-17 00:20:53.000000', '[{\"description\": \"反反复复\"}, {\"description\": \"发发发\"}]');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('admin','employee') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'employee',
  `real_name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` (`id`, `username`, `password`, `role`, `real_name`, `email`, `phone`, `avatar`, `created_at`, `updated_at`) VALUES (1, 'admin', '$2b$10$KKTRkeUBaJPv9hixGXMMnuV3xe5m1aSPQCdk7eBgxfFu.k3kGCBL6', 'admin', '管理员', NULL, NULL, NULL, '2025-03-14 20:40:16.193891', '2025-03-14 20:52:02.918612');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
