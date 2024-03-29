/*
  Warnings:

  - You are about to drop the column `sport_id` on the `participants` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "participants" DROP CONSTRAINT "participants_sport_id_fkey";

-- AlterTable
ALTER TABLE "participants" DROP COLUMN "sport_id";
