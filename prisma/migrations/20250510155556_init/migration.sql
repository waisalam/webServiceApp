-- CreateTable
CREATE TABLE "organization" (
    "id" INTEGER NOT NULL,
    "orgName" TEXT NOT NULL,
    "orgDesc" TEXT NOT NULL,
    "image1" TEXT,
    "image2" TEXT,
    "figmaFile" TEXT,
    "figmaLink" TEXT,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_orgName_key" ON "organization"("orgName");

-- CreateIndex
CREATE UNIQUE INDEX "organization_orgDesc_key" ON "organization"("orgDesc");
