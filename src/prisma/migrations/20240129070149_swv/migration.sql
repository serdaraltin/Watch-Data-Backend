-- DropForeignKey
ALTER TABLE "AppUser" DROP CONSTRAINT "AppUser_branchID_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_branchID_fkey";

-- DropForeignKey
ALTER TABLE "Settings" DROP CONSTRAINT "Settings_branchID_fkey";

-- AlterTable
ALTER TABLE "AppUser" ALTER COLUMN "branchID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notification" ALTER COLUMN "branchID" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Settings" ALTER COLUMN "branchID" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_branchID_fkey" FOREIGN KEY ("branchID") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_branchID_fkey" FOREIGN KEY ("branchID") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_branchID_fkey" FOREIGN KEY ("branchID") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;
