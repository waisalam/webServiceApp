/*
  Warnings:

  - You are about to drop the `organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "organization";

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "industry" TEXT NOT NULL,
    "website" TEXT DEFAULT '',
    "location" TEXT DEFAULT '',
    "foundedYear" INTEGER DEFAULT 2025,
    "contactEmail" TEXT NOT NULL,
    "phoneNumber" TEXT DEFAULT '',
    "teamSize" INTEGER NOT NULL,
    "socialLinks" TEXT DEFAULT '',
    "figmaLink" TEXT DEFAULT '',
    "domainName" TEXT DEFAULT '',
    "needWebsite" BOOLEAN NOT NULL DEFAULT false,
    "goals" TEXT DEFAULT '',
    "mission" TEXT DEFAULT '',
    "specificFeatures" TEXT DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");
