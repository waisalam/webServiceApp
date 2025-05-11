/*
  Warnings:

  - You are about to drop the `hr` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "hr";

-- CreateTable
CREATE TABLE "Hr" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'HR',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hr_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hr_email_key" ON "Hr"("email");
