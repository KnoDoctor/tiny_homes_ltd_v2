/*
  Warnings:

  - You are about to drop the column `name` on the `participants` table. All the data in the column will be lost.
  - Added the required column `date_created` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `participants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participants" DROP COLUMN "name",
ADD COLUMN     "date_created" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;
