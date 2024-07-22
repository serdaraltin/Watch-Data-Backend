/*
  Warnings:

  - You are about to drop the column `logIntime` on the `Login` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Login` table. All the data in the column will be lost.
  - You are about to drop the `AnalyzeData` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `email` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Login" DROP COLUMN "logIntime",
DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "loginTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "logoutTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "AnalyzeData";

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);
