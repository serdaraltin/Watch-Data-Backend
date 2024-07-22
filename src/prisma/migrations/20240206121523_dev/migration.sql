-- CreateTable
CREATE TABLE "AnalyzeData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "branchID" INTEGER NOT NULL,
    "processID" INTEGER NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "method" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "hourInfo" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AnalyzeData_pkey" PRIMARY KEY ("id")
);
