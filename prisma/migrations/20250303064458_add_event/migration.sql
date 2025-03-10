/*
  Warnings:

  - You are about to drop the `GroupeJournal` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "GroupeJournal" DROP CONSTRAINT "GroupeJournal_studentId_fkey";

-- DropTable
DROP TABLE "GroupeJournal";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "evenetName" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentEvent" (
    "id" SERIAL NOT NULL,
    "studentId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "point" INTEGER NOT NULL,

    CONSTRAINT "StudentEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StudentEvent" ADD CONSTRAINT "StudentEvent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEvent" ADD CONSTRAINT "StudentEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
