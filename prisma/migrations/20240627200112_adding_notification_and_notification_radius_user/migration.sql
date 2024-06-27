-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "notificationRadius" INTEGER,
ADD COLUMN     "notify" BOOLEAN NOT NULL DEFAULT false;
