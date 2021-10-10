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


-- play_with_db.interest definition

CREATE TABLE `interest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `interest_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.region definition

CREATE TABLE `region` (
  `id` int NOT NULL AUTO_INCREMENT,
  `region_code` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `expire_date` datetime DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  PRIMARY KEY (`id`)
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


-- play_with_db.member_bookmark_region definition

CREATE TABLE `member_bookmark_region` (
  `member_id` int NOT NULL,
  `region_id` int NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  UNIQUE KEY `member_id` (`member_id`,`region_id`),
  KEY `region_id` (`region_id`),
  CONSTRAINT `member_bookmark_region_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`),
  CONSTRAINT `member_bookmark_region_ibfk_2` FOREIGN KEY (`region_id`) REFERENCES `region` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.member_child definition

CREATE TABLE `member_child` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  `nick_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`,`member_id`),
  KEY `member_id` (`member_id`),
  CONSTRAINT `member_child_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- play_with_db.child_interest definition

CREATE TABLE `child_interest` (
  `child_id` int NOT NULL,
  `interest_id` int NOT NULL,
  `creation_date` datetime NOT NULL,
  `created_by` int NOT NULL,
  `last_update_date` datetime NOT NULL,
  `last_updated_by` int NOT NULL,
  UNIQUE KEY `child_id` (`child_id`,`interest_id`),
  KEY `interest_id` (`interest_id`),
  CONSTRAINT `child_interest_ibfk_1` FOREIGN KEY (`child_id`) REFERENCES `member_child` (`id`),
  CONSTRAINT `child_interest_ibfk_2` FOREIGN KEY (`interest_id`) REFERENCES `interest` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;