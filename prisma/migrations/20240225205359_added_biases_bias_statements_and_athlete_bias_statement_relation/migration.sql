/*
  Warnings:

  - Added the required column `bias_id` to the `studies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "studies" ADD COLUMN     "bias_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "biases" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "biases_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bias_statements" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "bias_id" UUID NOT NULL,
    "athlete_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bias_statements_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studies" ADD CONSTRAINT "studies_bias_id_fkey" FOREIGN KEY ("bias_id") REFERENCES "biases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bias_statements" ADD CONSTRAINT "bias_statements_bias_id_fkey" FOREIGN KEY ("bias_id") REFERENCES "biases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bias_statements" ADD CONSTRAINT "bias_statements_athlete_id_fkey" FOREIGN KEY ("athlete_id") REFERENCES "athletes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
