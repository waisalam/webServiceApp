/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `organization` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "figmaLink" DROP NOT NULL,
ALTER COLUMN "domainName" DROP NOT NULL,
ALTER COLUMN "foundedYear" DROP NOT NULL,
ALTER COLUMN "goals" DROP NOT NULL,
ALTER COLUMN "location" DROP NOT NULL,
ALTER COLUMN "mission" DROP NOT NULL,
ALTER COLUMN "phoneNumber" DROP NOT NULL,
ALTER COLUMN "socialLinks" DROP NOT NULL,
ALTER COLUMN "specificFeatures" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "organization_name_key" ON "organization"("name");
