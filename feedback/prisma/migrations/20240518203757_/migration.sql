/*
  Warnings:

  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CountryOfProduction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenreOfMovie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Person` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Profession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sex` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Status` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CountryOfProduction" DROP CONSTRAINT "CountryOfProduction_countryId_fkey";

-- DropForeignKey
ALTER TABLE "CountryOfProduction" DROP CONSTRAINT "CountryOfProduction_movieId_fkey";

-- DropForeignKey
ALTER TABLE "GenreOfMovie" DROP CONSTRAINT "GenreOfMovie_genreId_fkey";

-- DropForeignKey
ALTER TABLE "GenreOfMovie" DROP CONSTRAINT "GenreOfMovie_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_statusId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_typeId_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_personId_fkey";

-- DropForeignKey
ALTER TABLE "Participant" DROP CONSTRAINT "Participant_professionId_fkey";

-- DropForeignKey
ALTER TABLE "Person" DROP CONSTRAINT "Person_sexId_fkey";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "CountryOfProduction";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "GenreOfMovie";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "Participant";

-- DropTable
DROP TABLE "Person";

-- DropTable
DROP TABLE "Profession";

-- DropTable
DROP TABLE "Sex";

-- DropTable
DROP TABLE "Status";

-- DropTable
DROP TABLE "Type";

-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "numberOfEpisodes" INTEGER NOT NULL,
    "authotId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "authotId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "header" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "authotId" INTEGER NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
