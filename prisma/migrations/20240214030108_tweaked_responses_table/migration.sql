/*
  Warnings:

  - You are about to drop the column `dateSent` on the `responses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "responses" DROP COLUMN "dateSent",
ADD COLUMN     "date_sent" TIMESTAMP(3);
