/*
  Warnings:

  - Added the required column `athlete_id` to the `responses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "responses" ADD COLUMN     "athlete_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
