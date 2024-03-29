/*
  Warnings:

  - You are about to drop the column `first_name` on the `participants` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `participants` table. All the data in the column will be lost.
  - Added the required column `name` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participants" DROP COLUMN "first_name",
DROP COLUMN "last_name",
ADD COLUMN     "name" TEXT NOT NULL;
