/*
  Warnings:

  - You are about to drop the column `adittional` on the `Camera` table. All the data in the column will be lost.
  - Added the required column `aditional` to the `Camera` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Camera" DROP COLUMN "adittional",
ADD COLUMN     "aditional" JSONB NOT NULL;
