/*
  Warnings:

  - Changed the type of `status` on the `responses` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ResponsesStatus" AS ENUM ('in_progress', 'complete');

-- AlterTable
ALTER TABLE "responses" DROP COLUMN "status",
ADD COLUMN     "status" "ResponsesStatus" NOT NULL;
