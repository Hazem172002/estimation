/*
  Warnings:

  - You are about to drop the column `front` on the `platforms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `platforms` DROP COLUMN `front`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `admin` BOOLEAN NOT NULL DEFAULT false;
