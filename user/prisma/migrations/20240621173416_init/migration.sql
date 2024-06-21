-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(100) NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "PK_Users" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IX_Users_Email" ON "users"("email");
