/*
  Warnings:

  - You are about to drop the column `descriptio` on the `Post` table. All the data in the column will be lost.
  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `views` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "descriptio",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "views" INTEGER NOT NULL;
