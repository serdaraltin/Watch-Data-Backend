/*
  Warnings:

  - You are about to drop the column `branchID` on the `AppUser` table. All the data in the column will be lost.
  - You are about to drop the column `companyID` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `branchID` on the `Camera` table. All the data in the column will be lost.
  - You are about to drop the column `branchID` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `processID` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Notification` table. All the data in the column will be lost.
  - You are about to drop the column `cameraID` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `cameraID` on the `UserCameraAccess` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `UserCameraAccess` table. All the data in the column will be lost.
  - Added the required column `company_id` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branch_id` to the `Camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Notification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `camera_id` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `camera_id` to the `UserCameraAccess` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserCameraAccess` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AppUser" DROP CONSTRAINT "AppUser_branchID_fkey";

-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_companyID_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_branchID_fkey";

-- DropForeignKey
ALTER TABLE "Notification" DROP CONSTRAINT "Notification_userID_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_cameraID_fkey";

-- DropForeignKey
ALTER TABLE "UserCameraAccess" DROP CONSTRAINT "UserCameraAccess_cameraID_fkey";

-- DropForeignKey
ALTER TABLE "UserCameraAccess" DROP CONSTRAINT "UserCameraAccess_userID_fkey";

-- AlterTable
ALTER TABLE "AppUser" DROP COLUMN "branchID",
ADD COLUMN     "branch_id" INTEGER;

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "companyID",
ADD COLUMN     "company_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Camera" DROP COLUMN "branchID",
ADD COLUMN     "branch_id" INTEGER NOT NULL,
ADD COLUMN     "path" TEXT;

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "branchID",
DROP COLUMN "processID",
DROP COLUMN "userID",
ADD COLUMN     "branch_id" INTEGER,
ADD COLUMN     "process_id" INTEGER,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "cameraID",
ADD COLUMN     "camera_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UserCameraAccess" DROP COLUMN "cameraID",
DROP COLUMN "userID",
ADD COLUMN     "camera_id" INTEGER NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "AppUser" ADD CONSTRAINT "AppUser_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCameraAccess" ADD CONSTRAINT "UserCameraAccess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCameraAccess" ADD CONSTRAINT "UserCameraAccess_camera_id_fkey" FOREIGN KEY ("camera_id") REFERENCES "Camera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Person" ADD CONSTRAINT "Person_camera_id_fkey" FOREIGN KEY ("camera_id") REFERENCES "Camera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "AppUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "Branch"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_process_id_fkey" FOREIGN KEY ("process_id") REFERENCES "Process"("id") ON DELETE SET NULL ON UPDATE CASCADE;
