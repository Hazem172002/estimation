/*
  Warnings:

  - You are about to drop the column `platformId` on the `foundations` table. All the data in the column will be lost.
  - You are about to drop the column `platformId` on the `functionalities` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `foundations` DROP COLUMN `platformId`;

-- AlterTable
ALTER TABLE `functionalities` DROP COLUMN `platformId`;
