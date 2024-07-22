/*
  Warnings:

  - You are about to drop the column `companyId` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `Company` table. All the data in the column will be lost.
  - Added the required column `companyID` to the `Branch` table without a default value. This is not possible if the table is not empty.
  - Made the column `industry` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `website` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone_number` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Company` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Branch" DROP CONSTRAINT "Branch_companyId_fkey";

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "companyId",
ADD COLUMN     "companyID" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "updateAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "industry" SET NOT NULL,
ALTER COLUMN "industry" SET DATA TYPE TEXT,
ALTER COLUMN "website" SET NOT NULL,
ALTER COLUMN "phone_number" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Branch" ADD CONSTRAINT "Branch_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
