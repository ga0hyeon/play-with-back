-- play_with_db.admin definition

CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `login_id` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.auth definition

CREATE TABLE `auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `auth_key` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `auth_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `expire_date` datetime DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.`member` definition

CREATE TABLE `member` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_auth_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `nick_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `auth_type` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `profile_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email_addr` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  `login_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `area_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sigungu_code` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `interests` varchar(1000) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.sessions definition

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.admin_auth definition

CREATE TABLE `admin_auth` (
  `admin_id` int NOT NULL,
  `auth_id` int NOT NULL,
  `expire_date` datetime DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  UNIQUE KEY `admin_id` (`admin_id`,`auth_id`),
  KEY `auth_id` (`auth_id`),
  CONSTRAINT `admin_auth_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`),
  CONSTRAINT `admin_auth_ibfk_2` FOREIGN KEY (`auth_id`) REFERENCES `auth` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.member_bookmark definition

CREATE TABLE `member_bookmark` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `desription` varchar(4000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  `contents_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `contents_type_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_id` (`contents_id`,`contents_type_id`,`member_id`),
  KEY `member_bookmark_region_ibfk_1` (`member_id`),
  CONSTRAINT `member_bookmark_region_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.member_review definition

CREATE TABLE `member_review` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `content_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content_type_id` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `score` float NOT NULL,
  `content` blob,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`member_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `member_review_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;