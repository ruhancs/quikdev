-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "image" DROP NOT NULL,
ALTER COLUMN "views" SET DEFAULT 0;
