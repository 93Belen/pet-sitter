/*
  Warnings:

  - You are about to drop the column `day` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Availability` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Availability` table. All the data in the column will be lost.
  - Added the required column `date` to the `Availability` table without a default value. This is not possible if the table is not empty.
  - Made the column `status` on table `Availability` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Availability` DROP COLUMN `day`,
    DROP COLUMN `month`,
    DROP COLUMN `year`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL;
