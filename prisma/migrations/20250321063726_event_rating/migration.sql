-- CreateTable
CREATE TABLE "EventRating" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "point" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "EventRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EventRating" ADD CONSTRAINT "EventRating_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRating" ADD CONSTRAINT "EventRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
