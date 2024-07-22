-- AlterTable
ALTER TABLE "Login" ALTER COLUMN "sessionIsExpired" DROP NOT NULL,
ALTER COLUMN "sessionIsExpired" SET DATA TYPE TEXT;
