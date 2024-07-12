-- CreateTable
CREATE TABLE "UserCityGroup" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cityGroupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCityGroup_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserCityGroup_userId_cityGroupId_key" ON "UserCityGroup"("userId", "cityGroupId");

-- AddForeignKey
ALTER TABLE "UserCityGroup" ADD CONSTRAINT "UserCityGroup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCityGroup" ADD CONSTRAINT "UserCityGroup_cityGroupId_fkey" FOREIGN KEY ("cityGroupId") REFERENCES "CityGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
