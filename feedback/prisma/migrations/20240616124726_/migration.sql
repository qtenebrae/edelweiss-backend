-- CreateTable
CREATE TABLE "History" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "score" INTEGER,
    "numberOfEpisodes" INTEGER NOT NULL DEFAULT 0,
    "modifiedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" TEXT NOT NULL,
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
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "movieId" INTEGER NOT NULL,
    "header" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "publicationDate" TIMESTAMP(3) NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Parameter" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Parameter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParameterEstimation" (
    "reviewId" INTEGER NOT NULL,
    "parametrId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,

    CONSTRAINT "ParameterEstimation_pkey" PRIMARY KEY ("reviewId","parametrId")
);

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterEstimation" ADD CONSTRAINT "ParameterEstimation_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "Review"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParameterEstimation" ADD CONSTRAINT "ParameterEstimation_parametrId_fkey" FOREIGN KEY ("parametrId") REFERENCES "Parameter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
