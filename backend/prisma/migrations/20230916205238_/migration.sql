/*
  Warnings:

  - The primary key for the `exercises` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `exercises` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "exercises" DROP CONSTRAINT "exercises_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "exercises_pkey" PRIMARY KEY ("id");
