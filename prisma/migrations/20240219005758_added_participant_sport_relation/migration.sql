/*
  Warnings:

  - Added the required column `sport_id` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "sport_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_sport_id_fkey" FOREIGN KEY ("sport_id") REFERENCES "sports"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
