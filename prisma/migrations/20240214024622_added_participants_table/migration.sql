/*
  Warnings:

  - You are about to drop the column `respondent_id` on the `responses` table. All the data in the column will be lost.
  - You are about to drop the `respondents` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `participant_id` to the `responses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "responses" DROP COLUMN "respondent_id",
ADD COLUMN     "participant_id" UUID NOT NULL,
ALTER COLUMN "dateSent" DROP NOT NULL;

-- DropTable
DROP TABLE "respondents";

-- CreateTable
CREATE TABLE "participants" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,

    CONSTRAINT "participants_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "responses" ADD CONSTRAINT "responses_participant_id_fkey" FOREIGN KEY ("participant_id") REFERENCES "participants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
