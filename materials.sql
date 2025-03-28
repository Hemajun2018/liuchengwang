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

 Date: 15/03/2025 16:10:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of materials
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
