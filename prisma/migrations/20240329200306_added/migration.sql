/*
  Warnings:

  - You are about to drop the column `author_name` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the column `bio` on the `users` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "comments" DROP COLUMN "author_name",
ADD COLUMN     "user_id" UUID NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "bio",
ADD COLUMN     "biography" TEXT;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
