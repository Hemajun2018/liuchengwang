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

 Date: 17/03/2025 00:08:29
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of deliverables
-- ----------------------------
BEGIN;
INSERT INTO `deliverables` (`id`, `node_id`, `description`, `start_date`, `expected_end_date`, `duration_days`, `status`, `created_at`, `updated_at`) VALUES (1, 1, 'aaa', NULL, NULL, NULL, 'in_progress', '2025-03-16 23:10:20.719072', '2025-03-16 23:10:20.719072');
INSERT INTO `deliverables` (`id`, `node_id`, `description`, `start_date`, `expected_end_date`, `duration_days`, `status`, `created_at`, `updated_at`) VALUES (2, 1, 'bbb', NULL, NULL, NULL, 'in_progress', '2025-03-16 23:10:30.869029', '2025-03-16 23:10:30.869029');
INSERT INTO `deliverables` (`id`, `node_id`, `description`, `start_date`, `expected_end_date`, `duration_days`, `status`, `created_at`, `updated_at`) VALUES (3, 2, 'c21111', NULL, NULL, NULL, 'delayed', '2025-03-16 23:11:52.581720', '2025-03-16 23:11:52.581720');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
