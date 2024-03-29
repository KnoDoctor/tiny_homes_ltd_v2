/*
  Warnings:

  - You are about to drop the column `date` on the `athletes` table. All the data in the column will be lost.
  - Added the required column `date_created` to the `athletes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "athletes" DROP COLUMN "date",
ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL;
