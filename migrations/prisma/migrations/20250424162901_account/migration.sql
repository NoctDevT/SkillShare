/*
  Warnings:

  - Added the required column `accountStatus` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('VERIFIED', 'PENDING', 'NEW');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "accountStatus" "AccountStatus" NOT NULL;
