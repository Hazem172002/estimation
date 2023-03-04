/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Estimation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Estimation_userId_key` ON `Estimation`(`userId`);
