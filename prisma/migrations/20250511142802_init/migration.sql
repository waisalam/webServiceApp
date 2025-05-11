/*
  Warnings:

  - The primary key for the `organization` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `figmaFile` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `image1` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `image2` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `orgDesc` on the `organization` table. All the data in the column will be lost.
  - You are about to drop the column `orgName` on the `organization` table. All the data in the column will be lost.
  - Added the required column `contactEmail` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `domainName` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foundedYear` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goals` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `industry` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mission` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `socialLinks` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `specificFeatures` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamSize` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `website` to the `organization` table without a default value. This is not possible if the table is not empty.
  - Made the column `figmaLink` on table `organization` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "organization_orgDesc_key";

-- DropIndex
DROP INDEX "organization_orgName_key";

-- AlterTable
ALTER TABLE "organization" DROP CONSTRAINT "organization_pkey",
DROP COLUMN "figmaFile",
DROP COLUMN "image1",
DROP COLUMN "image2",
DROP COLUMN "orgDesc",
DROP COLUMN "orgName",
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "domainName" TEXT NOT NULL,
ADD COLUMN     "foundedYear" INTEGER NOT NULL,
ADD COLUMN     "goals" TEXT NOT NULL,
ADD COLUMN     "industry" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "mission" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "needWebsite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ADD COLUMN     "socialLinks" TEXT NOT NULL,
ADD COLUMN     "specificFeatures" TEXT NOT NULL,
ADD COLUMN     "teamSize" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "website" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "figmaLink" SET NOT NULL,
ADD CONSTRAINT "organization_pkey" PRIMARY KEY ("id");
