/*
  Warnings:

  - Added the required column `name` to the `studies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studies" ADD COLUMN     "name" TEXT NOT NULL;
