/*
  Warnings:

  - Added the required column `study_id` to the `participants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "participants" ADD COLUMN     "study_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "participants" ADD CONSTRAINT "participants_study_id_fkey" FOREIGN KEY ("study_id") REFERENCES "studies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
