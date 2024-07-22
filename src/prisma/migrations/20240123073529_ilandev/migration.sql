-- CreateTable
CREATE TABLE "Settings" (
    "id" SERIAL NOT NULL,
    "branchID" INTEGER NOT NULL,
    "settingsKind" TEXT NOT NULL,
    "settingsDescription" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_branchID_fkey" FOREIGN KEY ("branchID") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
