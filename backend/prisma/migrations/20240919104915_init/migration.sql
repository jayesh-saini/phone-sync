-- CreateTable
CREATE TABLE `sms` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sender_number` VARCHAR(255) NOT NULL,
    `sender_name` VARCHAR(255) NOT NULL,
    `message` VARCHAR(255) NOT NULL,
    `creation_ts` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
