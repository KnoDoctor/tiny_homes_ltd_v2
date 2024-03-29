/*
  Warnings:

  - The primary key for the `respondents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `respondents` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "respondents" DROP CONSTRAINT "respondents_pkey",
DROP COLUMN "id",
ADD COLUMN     "respondent_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD CONSTRAINT "respondents_pkey" PRIMARY KEY ("respondent_id");

-- CreateTable
CREATE TABLE "responses" (
    "response_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "respondent_id" UUID NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "dateSent" DATE NOT NULL,

    CONSTRAINT "responses_pkey" PRIMARY KEY ("response_id")
);
