CREATE TABLE `register_clicks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`clickedAt` timestamp NOT NULL DEFAULT (now()),
	`device` varchar(32) NOT NULL DEFAULT 'unknown',
	`platform` varchar(64),
	`source` varchar(128),
	`userAgent` text,
	`referrer` varchar(512),
	CONSTRAINT `register_clicks_id` PRIMARY KEY(`id`)
);
