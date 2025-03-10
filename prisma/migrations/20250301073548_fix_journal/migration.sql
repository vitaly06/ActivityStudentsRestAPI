/*
  Warnings:

  - Added the required column `ball1` to the `GroupeJournal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ball2` to the `GroupeJournal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ball3` to the `GroupeJournal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ball4` to the `GroupeJournal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupeJournal" ADD COLUMN     "ball1" INTEGER NOT NULL,
ADD COLUMN     "ball2" INTEGER NOT NULL,
ADD COLUMN     "ball3" INTEGER NOT NULL,
ADD COLUMN     "ball4" INTEGER NOT NULL;
