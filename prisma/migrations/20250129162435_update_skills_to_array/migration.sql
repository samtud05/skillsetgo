/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Sprint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "experienceLevelArray" AS ENUM ('Mid', 'Senior', 'Junior');

-- CreateTable
CREATE TABLE "Employee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "skills" TEXT[],
    "experienceLevel" TEXT NOT NULL,
    "workload" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sprint_name_key" ON "Sprint"("name");
