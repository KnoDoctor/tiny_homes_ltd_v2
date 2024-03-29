/*
  Warnings:

  - Added the required column `sport_id` to the `studies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studies" ADD COLUMN     "sport_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "studies" ADD CONSTRAINT "studies_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
