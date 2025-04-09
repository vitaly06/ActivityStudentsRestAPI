-- DropForeignKey
ALTER TABLE "EventRating" DROP CONSTRAINT "EventRating_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventRating" DROP CONSTRAINT "EventRating_userId_fkey";

-- DropForeignKey
ALTER TABLE "Groupe" DROP CONSTRAINT "Groupe_departmentId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_groupeId_fkey";

-- DropForeignKey
ALTER TABLE "StudentEvent" DROP CONSTRAINT "StudentEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "StudentEvent" DROP CONSTRAINT "StudentEvent_studentId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_roleId_fkey";

-- AddForeignKey
ALTER TABLE "Groupe" ADD CONSTRAINT "Groupe_departmentId_fkey" FOREIGN KEY ("departmentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_groupeId_fkey" FOREIGN KEY ("groupeId") REFERENCES "Groupe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEvent" ADD CONSTRAINT "StudentEvent_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentEvent" ADD CONSTRAINT "StudentEvent_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRating" ADD CONSTRAINT "EventRating_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRating" ADD CONSTRAINT "EventRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
