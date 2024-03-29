-- CreateTable
CREATE TABLE "respondents" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "respondents_pkey" PRIMARY KEY ("id")
);
