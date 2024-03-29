-- CreateEnum
CREATE TYPE "StudiesStatus" AS ENUM ('draft', 'finalized', 'cancelled', 'in_progress', 'complete');

-- CreateTable
CREATE TABLE "studies" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "status" "StudiesStatus" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "studies_pkey" PRIMARY KEY ("id")
);
