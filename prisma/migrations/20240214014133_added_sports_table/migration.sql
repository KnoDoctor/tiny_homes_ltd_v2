/*
  Warnings:

  - The primary key for the `responses` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `response_id` on the `responses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "responses" DROP CONSTRAINT "responses_pkey",
DROP COLUMN "response_id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD CONSTRAINT "responses_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "sports" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sports_pkey" PRIMARY KEY ("id")
);
