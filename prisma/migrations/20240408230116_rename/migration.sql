/*
  Warnings:

  - You are about to drop the column `image` on the `posts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "posts" DROP COLUMN "image",
ADD COLUMN     "image_url" TEXT;
