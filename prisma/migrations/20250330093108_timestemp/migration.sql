/*
  Warnings:

  - Added the required column `updatedAt` to the `key_result_progress_update` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `progress_update` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `reflex` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "key_result_progress_update" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "progress_update" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "reflex" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "work" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
