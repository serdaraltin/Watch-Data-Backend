/*
  Warnings:

  - You are about to drop the column `operationDetails` on the `Camera` table. All the data in the column will be lost.
  - Added the required column `adittional` to the `Camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user` to the `Camera` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Camera" DROP COLUMN "operationDetails",
ADD COLUMN     "adittional" JSONB NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "user" TEXT NOT NULL;
