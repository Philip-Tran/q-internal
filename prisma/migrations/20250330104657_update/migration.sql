/*
  Warnings:

  - Added the required column `logType` to the `work_log` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "LogType" AS ENUM ('PAUSE', 'UPDATE', 'FINISH');

-- AlterTable
ALTER TABLE "work_log" ADD COLUMN     "logType" "LogType" NOT NULL;
