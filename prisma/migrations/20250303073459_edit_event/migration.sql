/*
  Warnings:

  - You are about to drop the column `evenetName` on the `Event` table. All the data in the column will be lost.
  - Added the required column `eventName` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "evenetName",
ADD COLUMN     "eventName" TEXT NOT NULL;
