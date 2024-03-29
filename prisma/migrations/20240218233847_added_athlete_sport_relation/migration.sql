/*
  Warnings:

  - Added the required column `sport_id` to the `athletes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "athletes" ADD COLUMN     "sport_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "athletes" ADD CONSTRAINT "athletes_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
