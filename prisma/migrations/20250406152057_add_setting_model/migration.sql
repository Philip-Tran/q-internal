-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT');

-- CreateTable
CREATE TABLE "Setting" (
    "id" SERIAL NOT NULL,
    "updateDay" "WeekDay" NOT NULL DEFAULT 'SUN',

    CONSTRAINT "Setting_pkey" PRIMARY KEY ("id")
);
