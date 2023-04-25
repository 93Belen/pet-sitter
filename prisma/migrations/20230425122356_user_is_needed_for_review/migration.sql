/*
  Warnings:

  - Made the column `user` on table `Review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Review` MODIFY `user` VARCHAR(191) NOT NULL;
