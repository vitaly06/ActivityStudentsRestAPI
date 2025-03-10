/*
  Warnings:

  - A unique constraint covering the columns `[studentId,eventId]` on the table `StudentEvent` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentEvent_studentId_eventId_key" ON "StudentEvent"("studentId", "eventId");
