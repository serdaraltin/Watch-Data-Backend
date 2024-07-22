/*
  Warnings:

  - You are about to drop the column `streaming_url` on the `Camera` table. All the data in the column will be lost.
  - You are about to drop the `CameraOperaation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `channel` to the `Camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `Camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operationDetails` to the `Camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `port` to the `Camera` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Camera` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CameraOperaation" DROP CONSTRAINT "CameraOperaation_cameraIDInt_fkey";

-- AlterTable
ALTER TABLE "Camera" DROP COLUMN "streaming_url",
ADD COLUMN     "channel" INTEGER NOT NULL,
ADD COLUMN     "host" TEXT,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "operationDetails" JSONB NOT NULL,
ADD COLUMN     "port" INTEGER NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- DropTable
DROP TABLE "CameraOperaation";
