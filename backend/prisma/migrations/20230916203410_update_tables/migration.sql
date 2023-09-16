-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('chest', 'back', 'legs', 'shoulders', 'arms', 'abs', 'cardio');

-- AlterTable
ALTER TABLE "exercises" ADD COLUMN     "description" TEXT,
ADD COLUMN     "muscle_group" "MuscleGroup" NOT NULL DEFAULT 'cardio',
ADD COLUMN     "rest_time" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "workouts" ADD COLUMN     "description" TEXT;
