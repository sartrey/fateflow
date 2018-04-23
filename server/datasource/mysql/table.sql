CREATE TABLE `timeaxis_event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL,
  `expect` int(11) NOT NULL,
  `elapse` int(11) NOT NULL,
  `title` varchar(512) NOT NULL DEFAULT '',
  `content` text,
  `sprint` varchar(512) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `timeaxis_chain` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last` int(11) NOT NULL,
  `next` int(11) NOT NULL,
  `level` tinyint(11) NOT NULL,
  `reason` text,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `deleted_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;