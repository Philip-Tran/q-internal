/*
  Warnings:

  - Made the column `resultUpdate` on table `key_result` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "key_result" ALTER COLUMN "resultUpdate" SET NOT NULL,
ALTER COLUMN "resultUpdate" SET DEFAULT 0;
