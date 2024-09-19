-- AlterTable
ALTER TABLE `sms` ADD COLUMN `receiver_name` VARCHAR(255) NOT NULL DEFAULT '',
    ADD COLUMN `receiver_number` VARCHAR(255) NOT NULL DEFAULT '',
    MODIFY `sender_number` VARCHAR(255) NOT NULL DEFAULT '',
    MODIFY `sender_name` VARCHAR(255) NOT NULL DEFAULT '';
