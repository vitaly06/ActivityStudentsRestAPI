-- CreateTable
CREATE TABLE "GroupeJournal" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,

    CONSTRAINT "GroupeJournal_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GroupeJournal" ADD CONSTRAINT "GroupeJournal_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
