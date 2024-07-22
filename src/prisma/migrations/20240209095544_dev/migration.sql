/*
  Warnings:

  - You are about to drop the column `updateAt` on the `Age` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `AppUser` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Camera` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `EnterExit` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Gender` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Incident` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Movement` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `SecurityLog` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `UserCameraAccess` table. All the data in the column will be lost.
  - You are about to drop the `MaIntenanceLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Process` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MaIntenanceLog" DROP CONSTRAINT "MaIntenanceLog_camera_id_fkey";

-- DropForeignKey
ALTER TABLE "Process" DROP CONSTRAINT "Process_cameraID_fkey";

-- AlterTable
ALTER TABLE "Age" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "AppUser" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Camera" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "EnterExit" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Gender" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Incident" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Movement" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Person" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "SecurityLog" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "UserCameraAccess" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "MaIntenanceLog";

-- DropTable
DROP TABLE "Process";

-- CreateTable
CREATE TABLE "MaintenanceLog" (
    "id" SERIAL NOT NULL,
    "camera_id" INTEGER NOT NULL,
    "action_description" TEXT,
    "log_time" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MaintenanceLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MaintenanceLog" ADD CONSTRAINT "MaintenanceLog_camera_id_fkey" FOREIGN KEY ("camera_id") REFERENCES "Camera"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
