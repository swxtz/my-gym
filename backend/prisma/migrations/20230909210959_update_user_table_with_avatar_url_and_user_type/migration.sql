-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('user', 'admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "avatar_url" TEXT,
ADD COLUMN     "user_type" "UserType" NOT NULL DEFAULT 'user';
